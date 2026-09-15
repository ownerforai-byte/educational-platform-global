"""
Agnes AI Desktop Automation Bridge
==================================
Local Flask endpoint that a cloud n8n workflow POSTs to in order to:
  1. Drive the local Agnes AI desktop app at screen level (type prompt + Enter).
  2. Wait for the action to settle, then grab a full-screen screenshot.
  3. Return the screenshot (Base64 PNG) to n8n so a vision node can verify
     whether the step is COMPLETE or INCOMPLETE.

SECURITY WARNING
----------------
This service, once exposed through a public tunnel (ngrok / VS Code port
forwarding), lets ANYONE with the public URL move your mouse, type on your
keyboard, and capture your entire screen. It is UNAUTHENTICATED by default.

Recommended hardening (uncomment/set the API key) before going public:
  - n8n sends header  X-API-Key:  <shared secret>
  - This endpoint 401s if the header is missing or wrong.
Treat the public URL like a credential. Do NOT run in production unattended.
"""

import base64
import os
import time
from io import BytesIO

import pyautogui
from flask import Flask, request, jsonify

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

# Optional shared-secret auth. If set in the environment, every /execute
# request must carry the header  X-API-Key: <the same value>.
API_KEY = os.environ.get("AGNES_BRIDGE_API_KEY", "")

app = Flask(__name__)

# Fails fast if the display / screen is unavailable rather than mid-request.
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.05


def capture_screen_base64() -> str:
    """Return a Base64-encoded PNG of the whole screen."""
    screenshot = pyautogui.screenshot()
    buffered = BytesIO()
    screenshot.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")


def check_auth():
    """Return True when no API key is configured, else verify the header."""
    if not API_KEY:
        return True
    supplied = request.headers.get("X-API-Key", "")
    return supplied == API_KEY


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

    if not prompt_text:
        return jsonify({"status": "error", "message": "No prompt provided"}), 400

    try:
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
    app.run(host="0.0.0.0", port=5000)
