#!/usr/bin/env python3
"""Convenience launcher: `python visuals-py/run.py <cmd> [args...]`."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from visuals_py.__main__ import main  # noqa: E402

if __name__ == "__main__":
    # argv[0] is run.py itself; pass everything after the script name.
    raise SystemExit(main(sys.argv[1:]))
