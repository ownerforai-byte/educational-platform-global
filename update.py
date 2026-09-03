content = open('C:/Users/ASUS/desktop/rn/frontend/app/(marketing)/page.tsx', 'r', encoding='utf-8').read()
old_import = 'import { BiologyShowcase } from "@/components/home/biology-showcase";'
new_import = 'import { BiologyShowcase } from "@/components/home/biology-showcase";\nimport { CellArchitectureShowcase } from "@/components/home/cell-architecture-showcase";'
content = content.replace(old_import, new_import)
content = content.replace('<BiologyShowcase />', '<BiologyShowcase />\n      <CellArchitectureShowcase />')
open('C:/Users/ASUS/desktop/rn/frontend/app/(marketing)/page.tsx', 'w', encoding='utf-8').write(content)
print('done')