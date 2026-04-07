import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Filter } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { PROJECTS } from '../data'

const CATS = ['All', 'Frontend / 3D', 'Full-Stack', 'SaaS / Dashboard', 'Frontend / Marketing', 'Business / Corporate', 'Full-Stack / Admin']

export default function Projects() {
  const [active, setActive] = useState('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <div className="page-enter min-h-screen pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="mb-14">
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-3"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="display-heading text-5xl md:text-6xl mb-4"
          >
            All <span className="neon-text-cyan">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-lg"
          >
            A curated showcase of projects spanning 3D web experiences, full-stack applications, and high-converting landing pages.
          </motion.p>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 flex-wrap mb-12"
        >
          <Filter className="w-4 h-4 text-gray-500 mr-1" />
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 ${
                active === cat
                  ? 'border-cyber-accent text-cyber-accent bg-cyber-accent/10'
                  : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600 font-mono">
            No projects in this category yet.
          </div>
        )}
      </div>
    </div>
  )
}
