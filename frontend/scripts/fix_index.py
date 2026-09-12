path = "C:/Users/ASUS/desktop/rn/frontend/app/(app)/lab/physics/page.tsx"
content = open(path, encoding="utf-8").read()
new_entries = '''  {
    "id": "ph-calc-bounce",
    "title": "Bouncing Ball",
    "description": "Elastic collisions, coefficient of restitution.",
    "type": "3d",
    "status": "new",
    "color": "#ef4444",
    "unit": "Unit: Collisions"
  },
  {
    "id": "ph-calc-acceleration",
    "title": "Ball Acceleration",
    "description": "Constant force, changing velocity.",
    "type": "3d",
    "status": "new",
    "color": "#f59e0b",
    "unit": "Unit: Kinematics"
  },
  {
    "id": "ph-calc-gravity",
    "title": "Ball Gravity",
    "description": "Free fall with external forces.",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Dynamics"
  },
  {
    "id": "ph-calc-threebody",
    "title": "Three-Body Problem",
    "description": "Chaotic gravitational dynamics.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Gravitation"
  },
  {
    "id": "ph-calc-pi-collisions",
    "title": "Pi Collisions",
    "description": "Counting pi from elastic collisions.",
    "type": "3d",
    "status": "new",
    "color": "#8b5cf6",
    "unit": "Unit: Math and Physics"
  },
  {
    "id": "ph-calc-double-pendulum",
    "title": "Double Pendulum",
    "description": "Chaotic motion of linked oscillators.",
    "type": "3d",
    "status": "new",
    "color": "#ec4899",
    "unit": "Unit: Oscillations"
  },
'''
marker = '  {
    "id": "ph-3d-magnetic"'
content = content.replace(marker, new_entries + marker)
open(path, "w", encoding="utf-8").write(content)
print("done")
