"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "blue" | "purple" | "green" | "amber" | "rose"

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: Theme
  isDarkMode: boolean
  setTheme: (theme: Theme) => void
  toggleDarkMode: () => void
}

const initialState: ThemeProviderState = {
  theme: "blue",
  isDarkMode: false,
  setTheme: () => null,
  toggleDarkMode: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("blue")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "blue"
    const savedMode = localStorage.getItem("darkMode") === "true"

    setThemeState(savedTheme)
    setIsDarkMode(savedMode)

    // Apply saved theme and mode
    applyTheme(savedTheme, savedMode)

    setMounted(true)
  }, [])

  const applyTheme = (theme: Theme, isDark: boolean) => {
    // Remove all theme classes
    document.documentElement.classList.remove("theme-blue", "theme-purple", "theme-green", "theme-amber", "theme-rose")

    // Add selected theme class
    if (theme !== "blue") {
      document.documentElement.classList.add(`theme-${theme}`)
    }

    // Toggle dark mode
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Log for debugging
    console.log(`Theme provider applied: ${theme}, Dark mode: ${isDark}`)
  }

  const setTheme = (theme: Theme) => {
    setThemeState(theme)
    localStorage.setItem("theme", theme)
    applyTheme(theme, isDarkMode)
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("darkMode", String(newMode))
    applyTheme(theme, newMode)
  }

  const value = {
    theme,
    isDarkMode,
    setTheme,
    toggleDarkMode,
  }

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}

