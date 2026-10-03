"""Command-line entry point for the visuals-py pipeline.

Usage (from repo root):
    python visuals-py/run.py generate [--only id1 id2] [--images] [--out DIR]
    python visuals-py/run.py list
    python visuals-py/run.py render <id>          # PNG/GIF (needs matplotlib)
    python visuals-py/run.py check               # validate emitted JSON parses
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from .assets import DEFAULT_OUT_DIR, write_manifest
from .registry import GENERATORS, generate_all, generate_one


def _resolve_out(out: str | None, kind: str) -> Path:
    if out:
        return Path(out)
    return DEFAULT_OUT_DIR


def cmd_generate(args) -> int:
    if args.only:
        assets = [generate_one(i) for i in args.only]
    else:
        assets = generate_all()
    out_dir = _resolve_out(args.out, "generate")
    from . import images
    renderer = images.make_images if args.images else None
    for a in assets:
        p = a.write(out_dir, make_images=args.images, image_renderer=renderer)
        print(f"  [ok] {a.kind:9s} {a.id:26s} -> {p.name}")
        if args.images and renderer is not None:
            img = images.make_images(a, out_dir)
            if img:
                print(f"         image: {img.name}")
    # The manifest always indexes the full registry so `--only` never
    # clobbers the hub listing; files on disk are the source of truth and
    # every registered asset was (re)generated above or in a prior run.
    manifest = write_manifest(out_dir, generate_all())
    print(f"\nWrote {len(assets)} assets + manifest -> {manifest.parent}")
    return 0


def cmd_list(_args) -> int:
    print(f"{'ID':26s} KIND      SUBJECT     UNIT")
    for aid in sorted(GENERATORS):
        a = GENERATORS[aid]()
        print(f"{aid:26s} {a.kind:9s} {a.subject:9s} {a.unit}")
    return 0


def cmd_render(args) -> int:
    from . import images
    if not images.available().get("matplotlib"):
        print("matplotlib not installed — run `pip install -r visuals-py/requirements.txt`", file=sys.stderr)
        return 1
    asset = generate_one(args.id)
    out_dir = _resolve_out(args.out, "render")
    out = images.make_images(asset, out_dir)
    print(f"rendered {asset.id} -> {out}")
    return 0


def cmd_check(_args) -> int:
    manifest = DEFAULT_OUT_DIR / "manifest.json"
    if not manifest.exists():
        print("No manifest found — run `generate` first.")
        return 1
    data = json.loads(manifest.read_text())
    bad = 0
    for entry in data["assets"]:
        p = DEFAULT_OUT_DIR / entry["file"]
        try:
            json.loads(p.read_text())
        except Exception as e:
            bad += 1
            print(f"  BROKEN {p.name}: {e}")
    print(f"manifest lists {data['count']} assets, {bad} broken")
    return 1 if bad else 0


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(prog="visuals-py")
    sub = parser.add_subparsers(dest="cmd", required=True)

    g = sub.add_parser("generate", help="emit JSON assets + manifest")
    g.add_argument("--only", nargs="*", help="only these asset ids")
    g.add_argument("--images", action="store_true", help="also export PNG/GIF (needs matplotlib)")
    g.add_argument("--out", help="output dir (default frontend/public/data/visuals/py)")
    g.set_defaults(fn=cmd_generate)

    sub.add_parser("list", help="list available assets").set_defaults(fn=cmd_list)

    r = sub.add_parser("render", help="render one asset to image")
    r.add_argument("id")
    r.add_argument("--out", help="output dir")
    r.set_defaults(fn=cmd_render)

    sub.add_parser("check", help="validate emitted JSON").set_defaults(fn=cmd_check)

    args = parser.parse_args(argv)
    return args.fn(args)


if __name__ == "__main__":
    raise SystemExit(main())
