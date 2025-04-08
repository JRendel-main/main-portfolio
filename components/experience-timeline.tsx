"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Briefcase, Calendar, ChevronRight } from "lucide-react"

interface TimelineItem {
  id: number
  role: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
}

const experiences: TimelineItem[] = [
  {
    id: 1,
    role: "Freelance Full Stack Developer",
    company: "Remote",
    location: "Remote",
    period: "Jan 2020 - Present",
    description: "Developing software solutions for clients needs",
    achievements: [
      "Developed over 10+ web systems, with over 90% satisfaction",
      "Create and developed 6 templates for client needs",
      "Built landing pages for over 2 small-sized company for their business needs.",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "React",
      "TypeScript",
      "Wordpress",
      "Javascript",
    ],
  },
  {
    id: 2,
    role: "Assistant Software & Web Developer",
    company: "My Creative Panda Inc.",
    location: "Tarlac City, Tarlac",
    period: "Sept 2024 - Feb 2025",
    description:
      "Developed and maintained custom web applications for local government and private companies",
    achievements: [
      "Lead development a logistics management system with 99% uptime and fast queries.",
      "Implement business solutions for client needs with 100% satisfaction rate.",
      "Mentored fellow developers and conducted code reviews to ensure quality standards",
      "Maintains and Develop Local Government Websites with 99.8% uptime with beatiful UI using Wordpress.",
    ],
    technologies: [
      "PHP",
      "CakePHP",
      "Tailwind",
      "MySQL",
      "Bootstrap",
      "AngularJS",
    ],
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "Techstacks IT Web Development Services",
    location: "Cabanatuan City, Nueva Ecija",
    period: "Jan 2024 - May 2024",
    description: "Completed Internship for University requeirment",
    achievements: [
      "Led a team of 4 to develop an invoice generation system, improving efficiency by 20%",
      "Developed 3 progressive web applications using Node.js and Next.js",
      "Conducted training sessions for 10 work immersion students on web development fundamentals",
    ],
    technologies: ["PHP", "JavaScript", "NextJS", "ReactJS", "Typescript", "NodeJS"],
  },
];

export function ExperienceTimeline() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      className="relative mt-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-ml-px" />

      {experiences.map((experience, index) => (
        <motion.div key={experience.id} className="relative mb-12 md:mb-20 last:mb-0" variants={fadeInUp}>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            {/* Timeline dot */}
            <div className="absolute left-0 top-5 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-1/2 md:-ml-2" />

            {/* Date - Left side on desktop, top on mobile */}
            <div className={`mb-4 md:mb-0 ${index % 2 === 0 ? "md:text-right md:pr-10" : "md:order-2 md:pl-10"}`}>
              <motion.div
                className="inline-flex items-center rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-sm backdrop-blur-sm"
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Calendar className="mr-2 h-3.5 w-3.5 text-primary" />
                {experience.period}
              </motion.div>

              <motion.div
                className="mt-3 hidden md:block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="text-lg font-bold">{experience.company}</h4>
                <p className="text-sm text-muted-foreground">{experience.location}</p>
              </motion.div>
            </div>

            {/* Content - Right side on desktop, bottom on mobile */}
            <div className={`pl-6 md:pl-0 ${index % 2 === 0 ? "md:order-2 md:pl-10" : "md:pr-10"}`}>
              <Card className="overflow-hidden border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                <div className="p-5">
                  <div className="mb-4 flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{experience.role}</h3>
                      <div className="md:hidden">
                        <p className="text-sm text-muted-foreground">
                          {experience.company}, {experience.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-muted-foreground">{experience.description}</p>

                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <ChevronRight className="mr-1 h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 * i }}
                        whileHover={{ y: -2, scale: 1.05 }}
                      >
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

