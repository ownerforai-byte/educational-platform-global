import json
import hashlib
import os
from collections import defaultdict

BASE = r"C:\Users\ASUS\Desktop\educational-platform-global\content\ravikishan"
MANIFEST_PATH = os.path.join(BASE, "manifest.json")

def normalize(text: str) -> str:
    return " ".join(text.lower().split())

def content_hash(record: dict) -> str:
    title = normalize(record.get("title", ""))
    notes = " ".join(normalize("\n".join(record.get("notes", []))))
    return hashlib.sha1(f"{title}|{notes}".encode("utf-8")).hexdigest()

def walk_files():
    items = []
    for root, _, files in os.walk(BASE):
        for f in files:
            if not f.endswith(".json"):
                continue
            path = os.path.join(root, f)
            rel = os.path.relpath(path, BASE)
            try:
                data = json.load(open(path, "r", encoding="utf-8"))
            except Exception as e:
                continue
            items.append({
                "path": rel,
                "data": data,
                "hash": content_hash(data),
            })
    return items

def classify(items):
    groups = defaultdict(list)
    for item in items:
        groups[item["hash"]].append(item)

    manifest = []
    for hash_val, group in groups.items():
        group.sort(key=lambda x: x["path"])
        canonical = group[0]
        canonical["dupType"] = 1
        manifest.append(canonical)
        for idx, item in enumerate(group[1:], start=2):
            item["dupType"] = idx if idx <= 3 else 3
            item["duplicateOf"] = canonical["path"]
            manifest.append(item)
    return manifest

def build_manifest():
    items = walk_files()
    manifest = classify(items)
    manifest.sort(key=lambda x: x["path"])
    json.dump(manifest, open(MANIFEST_PATH, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print(f"Manifest written: {len(manifest)} items -> {MANIFEST_PATH}")

if __name__ == "__main__":
    build_manifest()
