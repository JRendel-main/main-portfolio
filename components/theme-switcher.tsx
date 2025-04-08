"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Moon, Palette, Sun, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

type Theme = "blue" | "purple" | "green" | "amber" | "rose"

export function ThemeSwitcher() {
  const { theme, isDarkMode, setTheme, toggleDarkMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { name: "blue", label: "Blue", color: "bg-blue-500" },
    { name: "purple", label: "Purple", color: "bg-purple-500" },
    { name: "green", label: "Green", color: "bg-green-500" },
    { name: "amber", label: "Amber", color: "bg-amber-500" },
    { name: "rose", label: "Rose", color: "bg-rose-500" },
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full group">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
          <motion.div
            animate={{
              scale: isOpen ? 0.8 : 1,
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <Palette className="h-5 w-5" />
              <motion.div
                className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${
                  themes.find((t) => t.name === theme)?.color
                }`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Theme Settings</span>
          <div className={`h-3 w-3 rounded-full ${themes.find((t) => t.name === theme)?.color}`} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2">
          <div className="mb-2 text-xs font-medium text-muted-foreground">Mode</div>
          <div className="flex gap-2">
            <Button
              variant={!isDarkMode ? "default" : "outline"}
              size="sm"
              className="w-full justify-start"
              onClick={() => (!isDarkMode ? null : toggleDarkMode())}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
              {!isDarkMode && <Check className="ml-auto h-4 w-4" />}
            </Button>
            <Button
              variant={isDarkMode ? "default" : "outline"}
              size="sm"
              className="w-full justify-start"
              onClick={() => (isDarkMode ? null : toggleDarkMode())}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
              {isDarkMode && <Check className="ml-auto h-4 w-4" />}
            </Button>
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <div className="mb-2 text-xs font-medium text-muted-foreground">Color</div>
          <div className="grid grid-cols-5 gap-2">
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
                <AnimatePresence>
                  {theme === themeOption.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute inset-0 flex items-center justify-center text-white"
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <div className="rounded-md bg-muted p-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium">Current Theme</div>
              <div className="text-xs font-medium capitalize">
                {theme} {isDarkMode ? "(Dark)" : "(Light)"}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              {themes.map((themeOption) => (
                <div
                  key={`preview-${themeOption.name}`}
                  className={`h-2 flex-1 rounded-full ${themeOption.color} ${
                    theme === themeOption.name ? "h-3" : "opacity-30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

