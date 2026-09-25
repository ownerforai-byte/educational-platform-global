#!/usr/bin/env python3
"""Content Coverage Audit - compares syllabus topics against actual content files."""
import os
import re

def parse_syllabus():
    """Parse lib/syllabus.ts to extract all topics."""
    with open('lib/syllabus.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    entries = []

    current_class_slug = ''
    current_subject_slug = ''
    current_unit_slug = ''
    current_unit_title = ''
    in_topics = False
    topic_buffer = []

    i = 0
    while i < len(lines):
        line = lines[i]

        # Class level (4 spaces) - slug on one line, name on next
        if re.match(r'^    slug: "([^"]+)"', line):
            current_class_slug = re.match(r'^    slug: "([^"]+)"', line).group(1)
            # Look for name on next line
            if i + 1 < len(lines) and 'name:' in lines[i + 1]:
                pass
            i += 1
            continue

        # Subject level (8 spaces) - slug on one line, name on next
        if re.match(r'^        slug: "([^"]+)"', line):
            current_subject_slug = re.match(r'^        slug: "([^"]+)"', line).group(1)
            if i + 1 < len(lines) and 'name:' in lines[i + 1]:
                pass
            i += 1
            continue

        # Unit level (12 spaces)
        unit_match = re.match(r'^            id: "([^"]+)"', line)
        if unit_match:
            current_unit_slug = unit_match.group(1)
            # Look for title in next few lines
            for j in range(i + 1, min(i + 5, len(lines))):
                title_match = re.search(r'title: "([^"]+)"', lines[j])
                if title_match:
                    current_unit_title = title_match.group(1)
                    break
            i += 1
            continue

        # Topics array
        if 'topics: [' in line and current_unit_slug:
            in_topics = True
            topic_buffer = []
            i += 1
            continue

        # Collect topics (14 spaces)
        if in_topics:
            topic_match = re.match(r'^              "([^"]+)"', line)
            if topic_match:
                topic_buffer.append(topic_match.group(1))
            elif line.strip() in ['],', ']']:
                in_topics = False
                if topic_buffer and current_subject_slug:
                    entries.append({
                        'class_slug': current_class_slug,
                        'subject_slug': current_subject_slug,
                        'unit_slug': current_unit_slug,
                        'unit_title': current_unit_title,
                        'topics': topic_buffer.copy(),
                    })
                current_unit_slug = ''
                current_unit_title = ''
                topic_buffer = []
            i += 1
            continue

        i += 1

    return entries

def get_content_files(base_path):
    """Get all content files with their paths."""
    files = []

    def scan_dir(directory, rel_path=''):
        try:
            entries = os.listdir(directory)
            for entry in entries:
                full_path = os.path.join(directory, entry)
                new_rel = os.path.join(rel_path, entry) if rel_path else entry
                if os.path.isdir(full_path):
                    scan_dir(full_path, new_rel)
                elif entry.endswith('.json') and 'mindmap' not in entry:
                    slug = re.sub(r'^\d+-', '', entry).replace('.json', '')
                    parts = new_rel.split(os.sep)
                    files.append({
                        'subject': parts[0],
                        'unit': parts[1] if len(parts) > 1 else '',
                        'slug': slug,
                        'path': full_path,
                    })
        except Exception as e:
            pass

    scan_dir(base_path)
    return files

def normalize(s):
    """Normalize string for comparison."""
    return re.sub(r'[^a-z0-9]', '-', s.lower()).replace('-+', '-').strip('-')

def is_covered(topic, content_files):
    """Check if a topic is covered by any content file."""
    t = normalize(topic)
    for f in content_files:
        c = normalize(f['slug'])
        if t == c or c in t or t in c:
            return True
        if len(t) > 10 and t[:20] in c:
            return True
    return False

# Main
print("=" * 60)
print("CONTENT COVERAGE AUDIT")
print("=" * 60)

syllabus = parse_syllabus()
total_topics = sum(len(e['topics']) for e in syllabus)
print(f"\nSyllabus entries: {len(syllabus)}")
print(f"Total topics: {total_topics}")

# Get content files
content_path = 'public/data/syllabus-notes'
content_files = get_content_files(content_path)
print(f"Content files found: {len(content_files)}")

# Group by subject
subjects = {}
for entry in syllabus:
    subj = entry['subject_slug']
    if subj not in subjects:
        subjects[subj] = []
    subjects[subj].append(entry)

# Get content by subject
subject_files = {}
for f in content_files:
    subj = f['subject']
    if subj not in subject_files:
        subject_files[subj] = []
    subject_files[subj].append(f)

# Generate report
grand_total = 0
grand_covered = 0

print("\n" + "=" * 60)
print("SUBJECT BREAKDOWN")
print("=" * 60)

for subject in ['biology', 'chemistry', 'english', 'mathematics', 'nepali', 'physics']:
    entries = subjects.get(subject, [])
    files = subject_files.get(subject, [])

    total_topic_count = sum(len(e['topics']) for e in entries)
    covered_count = 0
    gaps = []

    for entry in entries:
        for topic in entry['topics']:
            if is_covered(topic, files):
                covered_count += 1
            else:
                gaps.append(f"{entry['unit_slug']}: {topic[:50]}...")

    coverage = (covered_count / total_topic_count * 100) if total_topic_count > 0 else 0
    grand_total += total_topic_count
    grand_covered += covered_count

    print(f"\n[{subject.upper()}]")
    print(f"  Content files: {len(files)}")
    print(f"  Coverage: {covered_count}/{total_topic_count} ({coverage:.1f}%)")
    if gaps:
        print(f"  Missing: {len(gaps)} topics")
        print(f"  Sample gaps:")
        for g in gaps[:3]:
            print(f"    - {g}")

print("\n" + "=" * 60)
print("OVERALL SUMMARY")
print("=" * 60)
total_coverage = (grand_covered / grand_total * 100) if grand_total > 0 else 0
print(f"TOTAL: {grand_covered}/{grand_total} topics covered ({total_coverage:.1f}%)")
print(f"Missing: {grand_total - grand_covered} topics")
print("=" * 60)
