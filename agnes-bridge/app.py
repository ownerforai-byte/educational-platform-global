"""
Agnes AI Desktop Automation Bridge
==================================
Local Flask endpoint that a cloud n8n workflow POSTs to in order to:
  1. Drive the local Agnes AI desktop app at screen level (type prompt + Enter).
  2. Wait for the action to settle, then grab a full-screen screenshot.
  3. Return the screenshot (Base64 PNG) to n8n so a vision node can verify
     whether the step is COMPLETE or INCOMPLETE.

SECURITY (hardened 2026-09-25 after Devin/Qodo review)
------------------------------------------------------
This service can move your mouse, type on your keyboard, and capture your
entire screen. It is therefore FAIL-CLOSED:

  * AGNES_BRIDGE_API_KEY is REQUIRED. Without it the process refuses to
    start — the previous "unauthenticated by default" behavior let any caller
    of a forwarded port or tunnel control the desktop and read the screen.
  * The server binds to 127.0.0.1 by default. Expose it only through a tunnel
    (ngrok / VS Code port forwarding) with the API key set, and treat the
    public URL like a credential.
  * Prompts are length-capped (AGNES_MAX_PROMPT_CHARS, default 4000) and must
    be strings — no unbounded typing jobs.
  * Execution is serialized with a lock: overlapping requests previously
    interleaved clicks/typing and captured each other's screen state.

n8n sends header  X-API-Key:  <shared secret>. The endpoint 401s otherwise.
"""

import base64
import os
import threading
import time
from io import BytesIO

from flask import Flask, jsonify, request

try:
    import pyautogui
except Exception as _import_err:  # headless machines: import fails without a display
    pyautogui = None
    _IMPORT_ERROR = _import_err

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

# Coordinates of the Agnes AI text input field.
#
# >>> VERIFY THESE <<<  They were captured from the live cursor at
# calibrate-time; they are NOT guaranteed to be the Agnes AI input box.
# To confirm/replace: run `python agnes-bridge/calibrate.py`, hover your
# mouse exactly over the Agnes AI text input field, and update the two
# values below with the printed x / y.
AGNES_INPUT_X = 434
AGNES_INPUT_Y = 667

# How long to wait after pressing Enter before we snapshot the screen.
# Tune to the typical Agnes AI execution time. 10s is the safe default.
SETTLE_SECONDS = int(os.environ.get("AGNES_SETTLE_SECONDS", "10"))

# REQUIRED shared secret. Fail-closed: no key, no bridge (see docstring).
API_KEY = os.environ.get("AGNES_BRIDGE_API_KEY", "")

# Prompt length cap (characters). Oversized requests are rejected 400.
MAX_PROMPT_CHARS = int(os.environ.get("AGNES_MAX_PROMPT_CHARS", "4000"))

# Bind interface. Loopback by default; override only when tunneling WITH a key.
BIND_HOST = os.environ.get("AGNES_BRIDGE_HOST", "127.0.0.1")
BIND_PORT = int(os.environ.get("AGNES_BRIDGE_PORT", "5000"))

if not API_KEY:
    raise SystemExit(
        "AGNES_BRIDGE_API_KEY is not set.\n"
        "This bridge controls your desktop and captures the screen — it must\n"
        "never run unauthenticated. Set a shared secret and restart:\n"
        "    set AGNES_BRIDGE_API_KEY=<long random secret>   (Windows)\n"
        "    export AGNES_BRIDGE_API_KEY=<long random secret>  (macOS/Linux)\n"
        "Then send the same value as the X-API-Key header from n8n."
    )

app = Flask(__name__)

# Fails fast if the display / screen is unavailable rather than mid-request.
if pyautogui is not None:
    pyautogui.FAILSAFE = True
    pyautogui.PAUSE = 0.05

# Serializes /execute: one automation job at a time (overlapping jobs used to
# click/type while another waited and capture each other's screens).
EXECUTE_LOCK = threading.Lock()


def capture_screen_base64() -> str:
    """Return a Base64-encoded PNG of the whole screen."""
    screenshot = pyautogui.screenshot()
    buffered = BytesIO()
    screenshot.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")


def check_auth() -> bool:
    """Verify the X-API-Key header against the configured secret."""
    supplied = request.headers.get("X-API-Key", "")
    return bool(supplied) and supplied == API_KEY


@app.route("/health", methods=["GET"])
def health():
    """Lightweight liveness probe for n8n / the tunnel."""
    return jsonify({"status": "ok", "auth_enabled": bool(API_KEY)})


@app.route("/execute", methods=["POST"])
def execute_prompt():
    if not check_auth():
        return jsonify({"status": "error", "message": "Unauthorized"}), 401

    data = request.get_json(silent=True) or {}
    prompt_text = data.get("prompt", "")

    if not isinstance(prompt_text, str) or not prompt_text.strip():
        return jsonify({"status": "error", "message": "No prompt provided"}), 400

    if len(prompt_text) > MAX_PROMPT_CHARS:
        return jsonify(
            {
                "status": "error",
                "message": f"Prompt too long ({len(prompt_text)} chars; max {MAX_PROMPT_CHARS})",
            }
        ), 400

    if pyautogui is None:
        return jsonify(
            {"status": "error", "message": f"pyautogui unavailable: {_IMPORT_ERROR}"}
        ), 500

    try:
        with EXECUTE_LOCK:
            # Focus Agnes AI, type the prompt, submit.
            pyautogui.click(x=AGNES_INPUT_X, y=AGNES_INPUT_Y)
            time.sleep(0.5)
            # pyautogui.write only types ASCII; keep it simple & robust.
            pyautogui.write(prompt_text, interval=0.01)
            pyautogui.press("enter")

            # Let Agnes AI run, then snapshot the result.
            time.sleep(SETTLE_SECONDS)
            image_base64 = capture_screen_base64()

        return jsonify(
            {
                "status": "completed",
                "prompt_sent": prompt_text,
                "screenshot": image_base64,
            }
        )
    except pyautogui.FailSafeException:
        # User slammed the cursor into a corner to abort.
        return jsonify({"status": "error", "message": "Failsafe triggered"}), 500
    except Exception as exc:  # noqa: BLE001 - report any bridge failure cleanly
        return jsonify({"status": "error", "message": str(exc)}), 500


if __name__ == "__main__":
    app.run(host=BIND_HOST, port=BIND_PORT)
