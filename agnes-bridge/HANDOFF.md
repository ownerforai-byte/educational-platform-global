# Agnes AI Desktop Automation Bridge — Hand-Off Guide

Everything scriptable is already done:

- [x] `agnes-bridge/` directory created (renamed from `agnis-bridge`)
- [x] Dependencies installed: `flask pyautogui requests pillow`
- [x] `app.py` written (Agnes AI naming: `AGNES_INPUT_X/Y`), compiled, smoke-tested
- [x] `calibrate.py` helper for GUI calibration

The remaining steps need a human at the keyboard. Follow them in order.

---

## 1. Calibrate the input-field coordinates

Open the **Agnes AI** app (spelled A-G-N-E-S) with its text input visible, then in a terminal:

```
python agnes-bridge/calibrate.py
```

Hover the mouse over the Agnes AI input field and read the printed
`x=..., y=...`. Open `agnes-bridge/app.py` and set:

```python
AGNES_INPUT_X = <your x>
AGNES_INPUT_Y = <your y>
```

## 2. Start the local server

```
python agnes-bridge/app.py
```

It listens on `http://0.0.0.0:5000`. Quick check:

```
curl -i http://127.0.0.1:5000/health
```

## 3. Expose it to the cloud (n8n → this machine)

Pick **one**:

**A. ngrok**
```
ngrok http 5000
```
Copy the public URL, e.g. `https://abcd-1234.ngrok-free.app`.

**B. VS Code Port Forwarding** (ngrok is not installed on this machine)
Command Palette → `Forward Port` → forward `5000` → copy the generated HTTPS
tunnel URL.

> **SECURITY — read before going live.** The tunnel URL lets ANYONE reach it:
> it moves your mouse, types on your keyboard, and captures your full screen.
> The server is UNAUTHENTICATED unless you set an API key:
>
> ```
> set AGNES_BRIDGE_API_KEY=your-long-secret   & python agnes-bridge/app.py   (Windows)
> export AGNES_BRIDGE_API_KEY=... && python agnes-bridge/app.py             (bash)
> ```
>
> Then in n8n add the request header `X-API-Key: your-long-secret`.
> Treat the tunnel URL like a password; close the tunnel when done.

## 4. n8n workflow (3 nodes + retry loop)

Wire it as: `Start → [HTTP Request] → [AI Vision] → [If] → (next prompt / loop)`.

### Node 1 — HTTP Request
- Method: `POST`
- URL: `https://<FORWARDED_URL>/execute`
- Body: `{"prompt": "<CURRENT_PROMPT>"}`  (Content-Type: application/json)
- (If you enabled auth: add header `X-API-Key: <secret>`)
- Response is JSON: `status`, `prompt_sent`, `screenshot` (Base64 PNG).

### Node 2 — AI Vision
- Image input: convert `screenshot` from Base64 → binary (a base64-decode step).
- Prompt:
  > "Analyze the Agnes AI screen. Output exactly `STATUS: COMPLETE` if the task
  > has finished, otherwise `STATUS: INCOMPLETE`."

### Node 3 — If (decision gate)
- Condition: vision output contains `STATUS: COMPLETE`
  - **true**  → send Prompt 2, then Prompt 3 (repeat this block per prompt).
  - **false**  → loop back to Node 1 (re-trigger the current prompt).

### Retry logic (max 3)
Track attempts with a numeric variable (`attemptCount`, start 0), increment on
the **INCOMPLETE** branch:
- If `attemptCount < 3` → go back to Node 1.
- If `attemptCount == 3` → stop / mark the step as failed.

---

### n8n trigger message
Copy the ngrok HTTPS URL and send to the n8n assistant:

> "Please set up the workflow using Agnes AI (spelled A-G-N-E-S). The webhook
> endpoint URL is: [YOUR_NGROK_URL]/execute"

---

### Why the 10-second wait matters
`app.py` sleeps `SETTLE_SECONDS` (default 10) after pressing Enter so the
screenshot reflects Agnes AI's *result*, not the moment after submitting.
Override without editing code:

```
set AGNES_SETTLE_SECONDS=20   & python agnes-bridge/app.py     (Windows)
export AGNES_SETTLE_SECONDS=20 && python agnes-bridge/app.py   (bash)
```
