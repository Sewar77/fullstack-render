import { ThemeProvider, useColorScheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import { appTheme } from "../Theme/theme";
import { ThemeModeContext } from "./ThemeModeContext";
import { useCallback } from "react";
import { useMemo } from "react";

function ThemeController({ children }) {
  const { mode, setMode, systemMode } = useColorScheme();
  const ready = mode !== undefined;
  const effictiveMode =
    mode === "system" ? (systemMode ?? "light") : (mode ?? "light");
  // default mode, light - system

  const isDark = effictiveMode === "dark";

  //toggle to mode
  const toggleMode = useCallback(() => {
    setMode(isDark ? "light" : "dark");
  }, [isDark, setMode]);

  const contextValue = useMemo(
    () => ({
      mode,
      effictiveMode,
      setMode,
      ready,
      isDark,
      toggleMode,
    }),
    [mode, effictiveMode, setMode, ready, isDark, toggleMode],
  );
  return (
    <ThemeModeContext.Provider value={contextValue}>
      {children}
    </ThemeModeContext.Provider>
  );
}
export default function ThemeModeProvider({ children }) {
  return (
    <ThemeProvider theme={appTheme} defaultMode="system">
      <CssBaseline enableColorScheme />
      <ThemeController>{children}</ThemeController>
    </ThemeProvider>
  );
}
