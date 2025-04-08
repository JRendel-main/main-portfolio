"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Code,
  Globe,
  Server,
  Layers,
  Terminal,
  ArrowRight,
} from "lucide-react"
import { motion, useScroll, useInView, AnimatePresence, useSpring } from "framer-motion"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ColorPaletteShowcase } from "@/components/color-palette-showcase"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { ThemePreview } from "@/components/theme-preview"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorHovered, setCursorHovered] = useState(false)

  // Refs for sections
  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const experienceRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const fadeInStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Scroll animations
  const { scrollYProgress } = useScroll()
  const springScrollYProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40 })

  // Check if sections are in view
  const isHomeInView = useInView(homeRef, { amount: 0.5 })
  const isAboutInView = useInView(aboutRef, { amount: 0.5 })
  const isExperienceInView = useInView(experienceRef, { amount: 0.5 })
  const isSkillsInView = useInView(skillsRef, { amount: 0.5 })
  const isProjectsInView = useInView(projectsRef, { amount: 0.5 })
  const isContactInView = useInView(contactRef, { amount: 0.5 })

  useEffect(() => {
    // Update active section based on which section is in view
    if (isHomeInView) setActiveSection("home")
    else if (isAboutInView) setActiveSection("about")
    else if (isExperienceInView) setActiveSection("experience")
    else if (isSkillsInView) setActiveSection("skills")
    else if (isProjectsInView) setActiveSection("projects")
    else if (isContactInView) setActiveSection("contact")
  }, [isHomeInView, isAboutInView, isExperienceInView, isSkillsInView, isProjectsInView, isContactInView])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Custom cursor
  const cursorVariants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(var(--primary-rgb), 0.2)",
      mixBlendMode: "difference",
    },
    hovered: {
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(var(--primary-rgb), 0.3)",
      mixBlendMode: "difference",
    },
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-background/95">
      {/* Custom cursor */}

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: springScrollYProgress }}
      />

      {/* Decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-[40%] -right-[60%] h-[1000px] w-[1000px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-[40%] -left-[60%] h-[1000px] w-[1000px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className={`sticky top-0 z-40 w-full backdrop-blur-lg transition-all duration-300 ${
          scrollY > 50 ? "bg-background/80 shadow-md" : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="#home" className="flex items-center gap-2 font-bold">
            <motion.div
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="h-4 w-4" />
            </motion.div>
            <motion.span
              className="text-xl font-extrabold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Dev<span className="text-primary">Portfolio</span>
            </motion.span>
          </Link>
          <nav className="hidden md:flex gap-8">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" },
            ].map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <Link
                  href={`#${section.id}`}
                  className={`relative text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex items-center"
          >
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container flex h-16 items-center justify-between">
              <Link
                href="#home"
                className="flex items-center gap-2 font-bold"
                onClick={toggleMenu}
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Code className="h-4 w-4" />
                </div>
                <span className="text-xl font-extrabold tracking-tight">
                  Dev<span className="text-primary">Portfolio</span>
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
            </div>
            <motion.nav
              className="container mt-8 flex flex-col gap-4"
              variants={fadeInStagger}
              initial="hidden"
              animate="visible"
            >
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((section) => (
                <motion.div key={section.id} variants={itemFade}>
                  <Link
                    href={`#${section.id}`}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-4 text-lg font-medium hover:bg-muted/50"
                    onClick={toggleMenu}
                  >
                    {section.label}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          ref={homeRef}
          className="relative overflow-hidden py-20 md:py-32 lg:py-40"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-sm backdrop-blur-sm">
                    <motion.span
                      className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    Available for new projects
                  </div>
                </motion.div>
                <motion.div
                  className="space-y-4"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    <motion.span
                      className="block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      Hi, I'm
                    </motion.span>
                    <motion.span
                      className="relative mt-2 inline-block text-primary"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      John Rendel San Luis
                      <motion.span
                        className="absolute -bottom-2 left-0 h-1 w-0 bg-primary"
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 0.8,
                          delay: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    </motion.span>
                  </h1>
                  <motion.p
                    className="max-w-[600px] text-xl text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    A passionate{" "}
                    <span className="font-semibold text-foreground">PHP</span>{" "}
                    and{" "}
                    <span className="font-semibold text-foreground">
                      JavaScript
                    </span>{" "}
                    developer crafting exceptional digital experiences.
                  </motion.p>
                </motion.div>
                <motion.div
                  className="flex flex-col gap-4 sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <Link href="#contact">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden rounded-full px-8"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      <span className="relative z-10 flex items-center">
                        Let's Talk
                        <motion.span
                          initial={{ x: -4, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </span>
                      <span className="absolute inset-0 -z-10 bg-primary transition-transform duration-300 group-hover:translate-y-full"></span>
                      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-primary/80"></span>
                    </Button>
                  </Link>
                  <Link href="#projects">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full border-primary/20 px-8"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      View My Work
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  className="flex gap-4 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  {[
                    {
                      icon: <Github className="h-5 w-5" />,
                      href: "https://github.com",
                      label: "GitHub",
                    },
                    {
                      icon: <Linkedin className="h-5 w-5" />,
                      href: "https://linkedin.com",
                      label: "LinkedIn",
                    },
                    {
                      icon: <Mail className="h-5 w-5" />,
                      href: "mailto:contact@example.com",
                      label: "Email",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          {item.icon}
                          <span className="sr-only">{item.label}</span>
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <motion.div
                className="relative mx-auto aspect-square max-w-md lg:max-w-none"
                variants={scaleUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative h-full w-full rounded-3xl border border-border/50 bg-background/50 p-4 backdrop-blur-sm">
                  <motion.div
                    className="absolute -right-4 -top-4 h-24 w-24 rounded-xl bg-primary/10 backdrop-blur-sm"
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 h-24 w-24 rounded-xl bg-primary/10 backdrop-blur-sm"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      width={600}
                      height={600}
                      alt="Developer portrait"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Scroll Down</span>
              <div className="mt-2 h-10 w-6 rounded-full border border-border/50 p-1">
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  animate={{
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mb-12 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-sm backdrop-blur-sm">
                <span className="text-primary">01.</span>
                <span className="ml-2">About Me</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The Story So Far
              </h2>
              <motion.div
                className="mt-2 h-1 w-0 bg-primary"
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
              <motion.div
                className="relative mx-auto max-w-md"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl border border-primary/20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/50 bg-muted/30">
                  <Image
                    src="/placeholder.svg?height=600&width=450"
                    width={450}
                    height={600}
                    alt="Developer working"
                    className="h-full w-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-6 -right-6 rounded-lg border border-border/50 bg-background/80 p-4 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex flex-col items-center gap-1 text-center">
                    <motion.span
                      className="text-3xl font-bold text-primary"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      1
                    </motion.span>
                    <span className="text-sm text-muted-foreground">
                      Year of Experience
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              <div className="flex flex-col justify-center space-y-6">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold">
                    A Passionate Developer with a Purpose
                  </h3>
                  <p className="text-muted-foreground">
                    I'm a software & web developer with over 1 years of
                    experience building web applications. My journey began
                    during college when I discovered my passion for creating
                    digital solutions that solve real-world problems. I started
                    freelancing web projects, building and satisfiying clients.
                  </p>
                  <p className="text-muted-foreground">
                    I specialize in PHP and JavaScript, with expertise in
                    frameworks like CodeIgniter, CakePHP, Laravel NextJS, React
                    and Vue.js. My approach to development focuses on writing
                    clean, maintainable code and creating intuitive user
                    experiences.
                  </p>
                </motion.div>

                <motion.div
                  className="grid gap-4 sm:grid-cols-2"
                  variants={fadeInStagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.div
                    className="rounded-lg border border-border/50 bg-muted/30 p-4 backdrop-blur-sm"
                    variants={itemFade}
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 10px 30px -15px rgba(var(--primary-rgb), 0.15)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-bold">My Approach</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      I believe in writing clean, maintainable code and
                      following best practices. I'm passionate about creating
                      intuitive user experiences.
                    </p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg border border-border/50 bg-muted/30 p-4 backdrop-blur-sm"
                    variants={itemFade}
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 10px 30px -15px rgba(var(--primary-rgb), 0.15)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-bold">When I'm Not Coding</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      I enjoy gaming, creating side projects, and contributing
                      to open-source projects. I'm always learning new
                      technologies.
                    </p>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="grid gap-4 sm:grid-cols-2"
                  variants={fadeInStagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delayChildren: 0.2 }}
                >
                  {[
                    {
                      icon: <Terminal className="h-5 w-5 text-primary" />,
                      title: "Problem Solver",
                      desc: "Turning complex challenges into elegant solutions",
                    },
                    {
                      icon: <Layers className="h-5 w-5 text-primary" />,
                      title: "Full Stack Developer",
                      desc: "Comfortable with both frontend and backend",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="flex items-center gap-3"
                      variants={itemFade}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(var(--primary-rgb), 0.2)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ x: 5 }}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <Link href="#contact">
                    <Button
                      variant="outline"
                      className="mt-4 w-fit rounded-full border-primary/20 group"
                    >
                      Let's Connect
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          ease: "easeInOut",
                        }}
                      >
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </motion.span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          ref={experienceRef}
          className="py-20 md:py-32 bg-muted/10"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="mb-12 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-sm backdrop-blur-sm">
                <span className="text-primary">02.</span>
                <span className="ml-2">Experience</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Professional Journey
              </h2>
              <motion.div
                className="mt-2 h-1 w-0 bg-primary"
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="mt-4 max-w-[800px] text-muted-foreground">
                My career path and the companies I've had the privilege to work
                with over the years.
              </p>
            </motion.div>

            <ExperienceTimeline />
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={skillsRef}
          className="relative overflow-hidden py-20 md:py-32"
        >
          <div className="absolute inset-0 -z-10 bg-muted/30"></div>
          <div className="container px-4 md:px-6">
            <motion.div
              className="mb-12 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-border/40 bg-background/80 px-3 py-1 text-sm backdrop-blur-sm">
                <span className="text-primary">03.</span>
                <span className="ml-2">My Skills</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Technical Expertise
              </h2>
              <motion.div
                className="mt-2 h-1 w-0 bg-primary"
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="mt-4 max-w-[800px] text-muted-foreground">
                I've worked with a variety of technologies throughout my career.
                Here are some of my key skills:
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={fadeInStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {[
                {
                  title: "Frontend Development",
                  icon: <Code className="h-6 w-6 text-primary" />,
                  skills: [
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Vue.js",
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                    "SASS",
                  ],
                  description:
                    "I create responsive, accessible, and performant user interfaces with modern JavaScript frameworks.",
                  proficiencies: [
                    { name: "JavaScript", level: 95 },
                    { name: "React", level: 90 },
                    { name: "CSS/SASS", level: 85 },
                  ],
                },
                {
                  title: "Backend Development",
                  icon: <Server className="h-6 w-6 text-primary" />,
                  skills: [
                    "PHP",
                    "Laravel",
                    "CakePHP",
                    "Codeigniter",
                    "PostgreSQL",
                    "API Development",
                    "Node.js",
                    "Express",
                  ],
                  description:
                    "I build robust, scalable backend systems with clean architecture and comprehensive testing.",
                  proficiencies: [
                    { name: "PHP", level: 90 },
                    { name: "Laravel", level: 50 },
                    { name: "MySQL/PostgreSQL", level: 85 },
                  ],
                },
                {
                  title: "Database & Tools",
                  icon: <Globe className="h-6 w-6 text-primary" />,
                  skills: [
                    "Git",
                    "MySQL",
                    "PostgreSQL",
                    "MongoDB",
                    "VSCode",
                    "Agile",
                  ],
                  description:
                    "I implement efficient deployment pipelines and maintain infrastructure for reliable application hosting.",
                  proficiencies: [
                    { name: "Git/GitHub", level: 90 },
                    { name: "MySQL", level: 85 },
                    { name: "MongoDB", level: 50 },
                  ],
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  variants={itemFade}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 10px 30px -15px rgba(var(--primary-rgb), 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-300 h-full">
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-1">
                        <div className="flex items-center gap-3 rounded-t-lg bg-background/95 p-5">
                          <motion.div
                            className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {category.icon}
                          </motion.div>
                          <h3 className="text-xl font-bold">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="mb-6 flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <motion.div
                              key={skill}
                              whileHover={{ y: -2, scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge
                                variant="secondary"
                                className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>

                        <div className="mt-6 space-y-4">
                          {category.proficiencies.map((skill) => (
                            <div key={skill.name}>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-xs font-medium">
                                  {skill.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <motion.div
                                  className="h-full rounded-full bg-primary"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 1,
                                    delay: 0.2,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mb-12 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-sm backdrop-blur-sm">
                <span className="text-primary">04.</span>
                <span className="ml-2">My Work</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Projects
              </h2>
              <motion.div
                className="mt-2 h-1 w-0 bg-primary"
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="mt-4 max-w-[800px] text-muted-foreground">
                Here are some of the projects I've worked on. Each one presented
                unique challenges and opportunities for growth.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={fadeInStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delayChildren: 0.1, staggerChildren: 0.1 }}
            >
              {[
                {
                  title: "NEUST Peer Tutor Hub (Thesis)",
                  image: "/placeholder.svg?height=300&width=500",
                  skills: ["PHP", "jQuery", "Bootstrap", "PHPMailer", "MySQL"],
                  description:
                    "This peer tutor hub is designed for the students of Nueva Ecija University of Science and Technology. It features a clean, intuitive interface built with JQuery, PHP, and Bootstrap. The system includes features like peer tutor registration, scheduling, and grading.",
                },
                {
                  title: "Software Developer Portfolio",
                  image: "/placeholder.svg?height=300&width=500",
                  skills: ["NextJS", "Javascript", "Tailwind", "ShadcnUI"],
                  description: "Software Portfolio for visibility of Developer",
                },
                {
                  title: "Job Application Management System",
                  image: "/placeholder.svg?height=300&width=500",
                  skills: ["PHP", "JQuery", "Bootstrap", "MySQL"],
                  description:
                    "A simple job tracking application for applicants to manage and track the status of their applications",
                },
                {
                  title: "Bislig - Electronic Barangay Management System",
                  image: "/placeholder.svg?height=300&width=500",
                  skills: ["PHP", "CakePHP", "Tailwind", "AngularJS", "MySQL"],
                  description:
                    "Bislig's Electronic Barangay Management System digitizes local government operations, streamlining resident services, document processing, and community program management in a single unified platform. This system empowers barangay officials with real-time data access and reporting tools while providing residents with more efficient service delivery and transparent governance.",
                },
                {
                  title:
                    "Pierce Mega Corp. - Electronic Logistics Management System",
                  image: "/placeholder.svg?height=300&width=500",
                  skills: ["PHP", "CakePHP", "Bootstrap", "AngularJS", "MySQL"],
                  description:
                    "Pierce Mega Corp.'s Electronic Logistics Management System automates and optimizes the entire supply chain process, from inventory tracking to shipment routing and delivery confirmation. This integrated platform provides real-time visibility across logistics operations, enabling faster decision-making and improved operational efficiency.",
                },
                {
                  title:
                    "Jelexei Bakeshop's Electronic Human Resource Information System.",
                  image: "/placeholder.svg?height=300&width=500",
                  skills: ["PHP", "CakePHP", "Bootstrap", "AngularJS", "MySQL"],
                  description:
                    "Jelexei Bakeshop's Electronic Human Resource Information System streamlines employee management, scheduling, and payroll processes in a single digital platform. This custom solution eliminates paperwork while providing bakery managers with the tools they need to efficiently track staff, manage production schedules, and make data-driven decisions.",
                },
                {
                  title: "NEHS SHS | Student Information System",
                  image: "/placeholder.svg?height=300&width=500",
                  skills: ["PHP", "CakePHP", "Bootstrap", "AngularJS", "MySQL"],
                  description:
                    "Nueva Ecija High School's Student Information System centralizes student data management, academic tracking, and administrative processes for seamless educational operations. This comprehensive platform connects administrators, teachers, students, and parents through a unified digital environment that enhances communication and institutional efficiency.",
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={itemFade}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <Card className="group overflow-hidden border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                    <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          width={500}
                          height={300}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-300"
                        />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="flex gap-2">
                          <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="secondary"
                              size="sm"
                              className="rounded-full"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Demo
                            </Button>
                          </Link>
                          <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="secondary"
                              size="sm"
                              className="rounded-full"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                    <CardContent className="p-6">
                      <motion.div
                        className="mb-4 flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.skills.map((skill) => (
                          <motion.div
                            key={skill}
                            whileHover={{ y: -2, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge
                              variant="outline"
                              className="rounded-full border-primary/20 bg-primary/5 text-xs font-medium text-primary"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <Link href="#contact">
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-full px-8"
                >
                  <span className="relative z-10 flex items-center">
                    Start a Project Together
                    <motion.span
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 -z-10 bg-primary transition-transform duration-300 group-hover:translate-y-full"></span>
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-primary/80"></span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef}
          className="relative overflow-hidden py-20 md:py-32"
        >
          <div className="absolute inset-0 -z-10 bg-muted/30"></div>
          <div className="container px-4 md:px-6">
            <motion.div
              className="mb-12 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-sm backdrop-blur-sm">
                <span className="text-primary">05.</span>
                <span className="ml-2">Contact</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get In Touch
              </h2>
              <motion.div
                className="mt-2 h-1 w-0 bg-primary"
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="mt-4 max-w-[800px] text-muted-foreground">
                Have a project in mind or want to discuss potential
                opportunities? I'd love to hear from you!
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden border-border/50 bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">Let's Work Together</h3>
                    <p className="mt-2 text-muted-foreground">
                      I'm currently available for freelance work and full-time
                      opportunities. If you have a project that needs a skilled
                      PHP and JavaScript developer, let's discuss how I can
                      help.
                    </p>

                    <motion.div
                      className="mt-6 space-y-4"
                      variants={fadeInStagger}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delayChildren: 0.1, staggerChildren: 0.1 }}
                    >
                      {[
                        {
                          icon: <Mail className="h-5 w-5 text-primary" />,
                          title: "Email",
                          value: "sanluisjohnrendel@gmail.com",
                        },
                        {
                          icon: <Linkedin className="h-5 w-5 text-primary" />,
                          title: "LinkedIn",
                          value: "https://www.linkedin.com/in/jrendelsanluis/",
                        },
                        {
                          icon: <Github className="h-5 w-5 text-primary" />,
                          title: "GitHub",
                          value: "https://github.com/JRendel-main",
                        },
                      ].map((item) => (
                        <motion.div
                          key={item.title}
                          className="flex items-center gap-4"
                          variants={itemFade}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "rgba(var(--primary-rgb), 0.2)",
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.icon}
                          </motion.div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.value}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      className="mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <h4 className="font-bold">
                        I'm particularly interested in projects involving:
                      </h4>
                      <motion.ul
                        className="mt-2 space-y-2 text-muted-foreground"
                        variants={fadeInStagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{
                          delayChildren: 0.1,
                          staggerChildren: 0.1,
                        }}
                      >
                        {[
                          "Web Development",
                          "Company Landing Page",
                          "API development"
                        ].map((item) => (
                          <motion.li
                            key={item}
                            className="flex items-center gap-2"
                            variants={itemFade}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.div
                              className="h-1.5 w-1.5 rounded-full bg-primary"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3 }}
                            />
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </CardContent>
                </Card>

                <motion.div
                  className="relative overflow-hidden rounded-xl border border-border/50 bg-background/80 p-1 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 30px -15px rgba(var(--primary-rgb), 0.2)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
                  <div className="relative rounded-lg bg-background/80 p-6">
                    <h3 className="text-xl font-bold">Response Time</h3>
                    <p className="mt-2 text-muted-foreground">
                      I typically respond to all inquiries within 24 hours. For
                      urgent matters, please indicate so in your message.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden border-border/50 bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <form className="space-y-4">
                      <motion.div
                        className="grid gap-6 md:grid-cols-2"
                        variants={fadeInStagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{
                          delayChildren: 0.1,
                          staggerChildren: 0.1,
                        }}
                      >
                        <motion.div className="space-y-2" variants={itemFade}>
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your name"
                          />
                        </motion.div>
                        <motion.div className="space-y-2" variants={itemFade}>
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your email"
                          />
                        </motion.div>
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <input
                          id="subject"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Message subject"
                        />
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Your message"
                        ></textarea>
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <label htmlFor="budget" className="text-sm font-medium">
                          Project Budget (Optional)
                        </label>
                        <select
                          id="budget"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select budget range</option>
                        </select>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onMouseEnter={() => setCursorHovered(true)}
                        onMouseLeave={() => setCursorHovered(false)}
                      >
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full rounded-full"
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        className="border-t py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="#home" className="flex items-center gap-2 font-bold">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Code className="h-4 w-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Dev<span className="text-primary">Portfolio</span>
              </span>
            </Link>
          </motion.div>

          <motion.nav
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            variants={fadeInStagger}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.1, staggerChildren: 0.1 }}
          >
            {[
              "home",
              "about",
              "experience",
              "skills",
              "projects",
              "contact",
            ].map((section) => (
              <motion.div
                key={section}
                variants={itemFade}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <Link
                  href={`#${section}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            className="flex gap-4"
            variants={fadeInStagger}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}
          >
            {[
              {
                icon: <Github className="h-5 w-5" />,
                href: "https://github.com",
                label: "GitHub",
              },
              {
                icon: <Linkedin className="h-5 w-5" />,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: <Mail className="h-5 w-5" />,
                href: "mailto:contact@example.com",
                label: "Email",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={itemFade}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    {item.icon}
                    <span className="sr-only">{item.label}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            &copy; {new Date().getFullYear()} John Doe. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>

      {/* Fixed Theme Toggle Button */}
      <ThemeToggleButton />

      {/* Theme Preview Popup */}
      <ThemePreview />
    </div>
  );
}

