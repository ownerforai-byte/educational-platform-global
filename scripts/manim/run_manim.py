#!/usr/bin/env python3
"""
Run script for Manim 3D Math Animations
========================================
Usage:
    python run_manim.py              # Run full showcase
    python run_manim.py vectors       # Run specific scene
    python run_manim.py --preview    # Preview mode (no render)
"""

import subprocess
import sys
import os

def check_manim():
    """Check if manim is installed."""
    try:
        import manim
        return True
    except ImportError:
        print("❌ Manim not installed!")
        print("\nInstall with:")
        print("  pip install manim[opencv]")
        return False

def run_scene(scene_name="showcase", preview=False):
    """Run a specific scene."""
    if not check_manim():
        return False
    
    base_cmd = [
        "manim",
        "-ql",  # Low quality for fast preview
        "--progress_bar", "none",
        "--disable_caching",
        "manim_3d_math_animations.py",
        scene_name
    ]
    
    if preview:
        base_cmd.insert(1, "-p")  # Preview mode
    
    print(f"🎬 Running scene: {scene_name}")
    print(f"📁 Script: manim_3d_math_animations.py\n")
    
    try:
        result = subprocess.run(base_cmd, capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print("Errors:", result.stderr)
        return result.returncode == 0
    except FileNotFoundError:
        print("❌ Manim command not found. Install with: pip install manim[opencv]")
        return False

if __name__ == "__main__":
    args = sys.argv[1:]
    preview = "--preview" in args or "-p" in args
    
    if len(args) > 0 and args[0] not in ["--preview", "-p"]:
        scene = args[0]
    else:
        scene = "showcase"
    
    success = run_scene(scene, preview)
    sys.exit(0 if success else 1)
