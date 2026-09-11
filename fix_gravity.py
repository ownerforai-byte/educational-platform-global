path = r'C:/Users/ASUS/desktop/rn/frontend/components/lab/physics-sim-gravity.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("const [restitution, setGravity] = useState(0.8);", "const [restitution, setRestitution] = useState(0.8);")
content = content.replace('posRef.current.x += velRef.current.x\n', 'posRef.current.x += velRef.current.x * dt\n')
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('fixed gravity')