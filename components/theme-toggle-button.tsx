"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Initialize on component mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full border-primary/20 bg-background/50 backdrop-blur-sm fixed bottom-4 left-4 z-50 shadow-lg"
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative h-5 w-5"
      >
        <motion.div
          initial={false}
          animate={{ opacity: isDarkMode ? 1 : 0, scale: isDarkMode ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: isDarkMode ? 0 : 1, scale: isDarkMode ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </Button>
  )
}

