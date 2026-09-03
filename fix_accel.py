path = r'C:/Users/ASUS/desktop/rn/frontend/components/lab/physics-sim-acceleration.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("const [restitution, setAcceleration] = useState(0.8);", "const [restitution, setRestitution] = useState(0.8);")
content = content.replace('posRef.current.x += velRef', 'posRef.current.x += velRef.current.x * dt')
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('fixed acceleration')