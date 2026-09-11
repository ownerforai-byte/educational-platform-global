path = r'C:/Users/ASUS/desktop/rn/frontend/components/lab/physics-sim-gravity.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
old_line = "        <div className='rounded-md border border-border bg-muted/30 p-3 space-y-2'><Label>Gravity</Label><Input type='range' min={0} max={1} step={0.05} value={restitution} onChange={(e) => setGravity(parseFloat(e.target.value))} /><p className='text-xs text-muted-foreground'>{(restitution * 100).toFixed(0)}% energy</p></div>"
new_line = "        <div className='rounded-md border border-border bg-muted/30 p-3 space-y-2'><Label>Restitution</Label><Input type='range' min={0} max={1} step={0.05} value={restitution} onChange={(e) => setRestitution(parseFloat(e.target.value))} /><p className='text-xs text-muted-foreground'>{(restitution * 100).toFixed(0)}% energy</p></div>"
content = content.replace(old_line, new_line)
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('fixed')