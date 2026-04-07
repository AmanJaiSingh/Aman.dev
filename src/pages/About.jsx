import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, MapPin, Coffee, Zap, Code2, Globe, Database, Layers, Server, Cpu } from 'lucide-react'

const SKILLS = [
  { label: 'React / Next.js',   pct: 95, color: '#00f0ff' },
  { label: 'Three.js / WebGL',  pct: 82, color: '#b026ff' },
  { label: 'Node.js / Express', pct: 88, color: '#00f0ff' },
  { label: 'TypeScript',        pct: 80, color: '#ffd700' },
  { label: 'TailwindCSS',       pct: 95, color: '#00f0ff' },
  { label: 'MongoDB / SQL',     pct: 78, color: '#ff003c' },
  { label: 'GSAP / Framer',     pct: 85, color: '#b026ff' },
  { label: 'AWS / Vercel',      pct: 72, color: '#ffd700' },
]

const TECH_ICONS = [Code2, Globe, Database, Layers, Server, Cpu, Zap]

const TIMELINE = [
  { year: '2024–Present', title: 'Freelance Full-Stack Developer', org: 'Self-employed / Upwork', desc: 'Building bespoke web applications and 3D experiences for international clients.' },
  { year: '2023',         title: 'Frontend Developer',             org: 'Contract Projects',     desc: 'Delivered multiple high-conversion landing pages and SaaS dashboards.' },
  { year: '2022',         title: 'Started Web Development',        org: 'Self-taught',           desc: 'Deep-dived into React, Three.js, and the modern JS ecosystem.' },
]

function SkillBar({ label, pct, color, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="font-mono text-sm text-gray-300">{label}</span>
        <span className="font-mono text-xs text-gray-500">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}88` }}
        />
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div className="page-enter min-h-screen pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={ref} className="mb-20">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label mb-3">
            Who I Am
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="display-heading text-5xl md:text-6xl mb-4"
          >
            About <span className="neon-text-purple">Me</span>
          </motion.h1>
        </div>

        {/* Bio + photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Bio */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <p className="text-gray-300 leading-relaxed mb-5 text-lg">
              Hey! I'm <span className="neon-text-cyan font-semibold">Aman Jai Singh</span>, a passionate Full-Stack Developer from India who builds exceptional digital experiences at the intersection of code and artistry.
            </p>
            <p className="text-gray-400 leading-relaxed mb-5">
              I specialise in crafting immersive web applications — from blazing-fast Next.js platforms and interactive 3D experiences with Three.js, to scalable back-end APIs. I care deeply about every pixel and every millisecond of performance.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              When I'm not building for clients, I'm experimenting with WebGL shaders, GSAP scroll choreography, or finding new ways to make the web feel alive.
            </p>

            <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-500 mb-8">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyber-accent" /> India</span>
              <span className="flex items-center gap-1"><Coffee className="w-3.5 h-3.5 text-cyber-purple" /> Coffee fuelled</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-cyber-accent" /> Open to work</span>
            </div>

            <a href="#" className="cyber-btn inline-flex items-center gap-2 text-xs">
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </motion.div>

          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-cyber-accent/20 animate-pulse-slow" />
              <div className="absolute -inset-4 rounded-full border border-cyber-purple/10" />
              <div
                className="w-full h-full rounded-full overflow-hidden neon-border-purple"
                style={{ background: 'linear-gradient(135deg, #0e0e1a 0%, #1a0533 100%)' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display font-black text-8xl text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #00f0ff, #b026ff)' }}>
                    AJ
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <div className="mb-24">
          <h2 className="display-heading text-3xl mb-10 neon-text-cyan">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.label} {...s} delay={i * 0.08} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="display-heading text-3xl mb-10 neon-text-purple">Journey</h2>
          <div className="relative pl-8 border-l border-white/10">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="mb-12 relative"
              >
                <div className="absolute -left-[2.15rem] w-3 h-3 rounded-full bg-cyber-accent"
                  style={{ boxShadow: '0 0 8px #00f0ff' }} />
                <p className="font-mono text-xs text-cyber-accent mb-1">{item.year}</p>
                <h3 className="font-display font-semibold text-lg mb-0.5">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-2 font-mono">{item.org}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
