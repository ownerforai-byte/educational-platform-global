export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex flex-col md:flex-row h-auto max-w-7xl items-center justify-between px-4 md:px-6 py-6 gap-6">
        <div className="text-sm text-muted-foreground text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <span className="text-2xl">🌿</span>
            <span className="text-2xl">🌱</span>
            <span className="text-2xl">🌍</span>
            <span className="text-2xl">📚</span>
          </div>
          <p className="mb-3">
            Made with passion by <span className="font-semibold text-foreground">Ravikishan</span>. 
            All rights reserved.
          </p>
          <p className="mb-2">
            Empowering education through nature-inspired learning. 
            <span className="font-semibold">Connect with knowledge, grow with wisdom.</span>
          </p>
          <div className="text-xs space-y-1">
            <p>© 2026 Creator ~ Owner: Ravikishan</p>
            <p>Instagram: @___unxknown___player</p>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground text-center md:text-right">
          <div className="mb-3">
            <h4 className="font-semibold text-foreground flex items-center justify-center md:justify-end gap-2 mb-2">
              <span>📜</span> Educational Standards <span>🎓</span>
            </h4>
          </div>
          <div className="space-y-1">
            <p className="flex items-center justify-center md:justify-end gap-2">
              <span className="text-green-500">🌲</span>
              <strong>NEB:</strong> National Examination Board
            </p>
            <p className="text-xs text-muted-foreground/70">
              Curriculum-aligned content for Class 11 & 12 students
            </p>
            <p className="flex items-center justify-center md:justify-end gap-2 mt-2">
              <span className="text-blue-500">💧</span>
              <strong>CDC:</strong> Curriculum Development Centre
            </p>
            <p className="text-xs text-muted-foreground/70">
              Following official Nepal education guidelines
            </p>
          </div>
          <p className="mt-3 text-xs">
            <span className="flex items-center justify-center md:justify-end gap-1">
              <span>🌸</span> Nurturing minds, shaping futures <span>🌸</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
