"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Palette } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

type Theme = "blue" | "purple" | "green" | "amber" | "rose"

export function ThemePreview() {
  const { theme, isDarkMode, setTheme, toggleDarkMode } = useTheme()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the preview after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Hide the preview after it's been shown
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const themes = [
    { name: "blue", label: "Blue", color: "bg-blue-500" },
    { name: "purple", label: "Purple", color: "bg-purple-500" },
    { name: "green", label: "Green", color: "bg-green-500" },
    { name: "amber", label: "Amber", color: "bg-amber-500" },
    { name: "rose", label: "Rose", color: "bg-rose-500" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-4 shadow-lg border border-border/50 bg-background/80 backdrop-blur-sm w-[280px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium">Try a different theme</h3>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsVisible(false)}>
                ×
              </Button>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-3">
              {themes.map((themeOption) => (
                <Button
                  key={themeOption.name}
                  variant="outline"
                  size="sm"
                  className={`p-0 h-8 w-8 rounded-full relative ${
                    theme === themeOption.name ? "ring-2 ring-ring ring-offset-2" : ""
                  }`}
                  onClick={() => setTheme(themeOption.name as Theme)}
                  title={themeOption.label}
                >
                  <div className={`h-full w-full rounded-full ${themeOption.color}`} />
                  {theme === themeOption.name && (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant={!isDarkMode ? "default" : "outline"}
                size="sm"
                className="w-full text-xs"
                onClick={() => (isDarkMode ? toggleDarkMode() : null)}
              >
                Light Mode
              </Button>
              <Button
                variant={isDarkMode ? "default" : "outline"}
                size="sm"
                className="w-full text-xs"
                onClick={() => (!isDarkMode ? toggleDarkMode() : null)}
              >
                Dark Mode
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              You can change themes anytime using the palette icon in the header.
            </p>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

