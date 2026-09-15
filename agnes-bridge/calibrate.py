"""
Calibration helper for the Agnes AI Desktop Bridge.

Run it, then hover your mouse over the Agnes AI text input field.
It prints the live cursor position every ~2 seconds. When the cursor
is sitting exactly where you want the bridge to click, copy the
printed (x, y) and paste them into AGNES_INPUT_X / AGNES_INPUT_Y in app.py.

Usage:
    python calibrate.py

STOP:
    Press Ctrl+C when you've recorded your coordinates.
"""

import time
import pyautogui


def main():
    print("Hover your mouse over the Agnes AI input field...")
    print("(Press Ctrl+C to stop)\n")
    try:
        while True:
            pos = pyautogui.position()
            print(f"cursor -> x={pos.x}, y={pos.y}")
            time.sleep(2)
    except KeyboardInterrupt:
        print("\nDone.")


if __name__ == "__main__":
    main()
