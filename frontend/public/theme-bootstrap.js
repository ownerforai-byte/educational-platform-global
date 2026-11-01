(function () {
  try {
    var root = document.documentElement;
    var storedTheme = localStorage.getItem("neb-theme");
    var theme = storedTheme || "system";
    var themes = {
      light: 0,
      sepia: 0,
      system: window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0,
      dark: 1,
      cyberpunk: 1,
      emerald: 1,
      nord: 1,
      amber: 1,
      oled: 1,
      nebula: 1,
    };

    if (!(theme in themes)) theme = "system";
    var isDark = !!themes[theme];
    var connection = navigator.connection;
    var liteMode = localStorage.getItem("neb-lite-mode");
    if (liteMode === null) {
      liteMode = String(
        !!(
          connection &&
          (connection.saveData ||
            connection.effectiveType === "2g" ||
            connection.effectiveType === "slow-2g")
        ),
      );
    }

    root.classList.add(isDark ? "dark" : "light", theme);
    root.dataset.theme = theme;
    root.dataset.lite = liteMode;
    root.style.colorScheme = isDark ? "dark" : "light";
  } catch {
    // Theme bootstrapping is best-effort when browser storage is unavailable.
  }
})();
