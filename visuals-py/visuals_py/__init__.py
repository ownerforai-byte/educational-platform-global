"""
visuals-py — Python visuals pipeline for the Educational Platform.

Generates 3D scenes, simulations and motion-graphics as JSON assets that the
Next.js frontend renders with three.js. Python is the *source of truth* for
the geometry/physics; the browser only plays it back.

Core dependency: numpy. Optional: matplotlib (static PNG export).
Run from the repo root:

    python visuals-py/run.py generate            # emit JSON + manifest
    python visuals-py/run.py list                # show available assets
    python visuals-py/run.py render ph-projectile # render one to PNG (needs matplotlib)
"""
__version__ = "0.1.0"
