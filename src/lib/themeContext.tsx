"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type StyleMode = "craft" | "clay3d";

interface ThemeContextType {
  mode: StyleMode;
  setMode: (mode: StyleMode) => void;
  toggleMode: () => void;
  is3D: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "craft",
  setMode: () => {},
  toggleMode: () => {},
  is3D: false,
});

const STORAGE_KEY = "luvia_style_mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<StyleMode>("craft");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Check URL query param ?style=3d or ?style=craft
    const params = new URLSearchParams(window.location.search);
    const urlStyle = params.get("style");
    let initialMode: StyleMode = "craft";

    if (urlStyle === "3d" || urlStyle === "clay3d") {
      initialMode = "clay3d";
    } else if (urlStyle === "craft" || urlStyle === "eco") {
      initialMode = "craft";
    } else {
      // 2. Check localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "clay3d" || saved === "craft") {
        initialMode = saved;
      }
    }

    setModeState(initialMode);
    document.documentElement.setAttribute("data-style", initialMode);
    setMounted(true);
  }, []);

  const setMode = (newMode: StyleMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
    document.documentElement.setAttribute("data-style", newMode);
  };

  const toggleMode = () => {
    const nextMode = mode === "craft" ? "clay3d" : "craft";
    setMode(nextMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode, is3D: mode === "clay3d" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
