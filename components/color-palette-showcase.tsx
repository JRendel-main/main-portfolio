"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ColorPaletteShowcase() {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-bold">Primary Colors</h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary"></div>
              <span>Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/80"></div>
              <span>Primary (80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/50"></div>
              <span>Primary (50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20"></div>
              <span>Primary (20%)</span>
            </div>
          </div>
          <Button className="w-full">Primary Button</Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-bold">Background & Text</h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-background border"></div>
              <span>Background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-foreground"></div>
              <span>Foreground</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-muted"></div>
              <span>Muted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-muted-foreground"></div>
              <span>Muted Foreground</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Badge</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="secondary">Secondary</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-bold">UI Elements</h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-card border"></div>
              <span>Card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-border"></div>
              <span>Border</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-input"></div>
              <span>Input</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-ring"></div>
              <span>Ring</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Outline
            </Button>
            <Button variant="secondary" size="sm">
              Secondary
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-bold">Accent Colors</h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-accent"></div>
              <span>Accent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-accent-foreground"></div>
              <span>Accent Foreground</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-secondary"></div>
              <span>Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-destructive"></div>
              <span>Destructive</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

