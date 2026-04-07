import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, ExternalLink, GitFork, Tag } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  }),
}

export default function ProjectCard({ project, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative glass-card rounded-2xl overflow-hidden cursor-default"
      style={{
        boxShadow: hovered
          ? '0 0 40px rgba(176,38,255,0.15), 0 20px 60px rgba(0,0,0,0.5)'
          : '0 20px 40px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${project.accentColor || '#00f0ff'}, ${project.accentColor2 || '#b026ff'})`,
        }}
      />

      {/* Image / preview */}
      {project.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            {project.category && (
              <span className="section-label text-[10px] mb-1 block">{project.category}</span>
            )}
            <h3 className="font-display font-bold text-lg text-white group-hover:text-cyber-accent transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-3 ml-2 shrink-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="text-gray-500 hover:text-cyber-accent transition-colors">
                <GitFork className="w-4 h-4" />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                className="text-gray-500 hover:text-cyber-accent transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md"
              style={{
                background: 'rgba(0,240,255,0.06)',
                border: '1px solid rgba(0,240,255,0.15)',
                color: '#00c8d4',
              }}
            >
              <Tag className="w-2.5 h-2.5" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Corner decorative accent */}
      <div
        className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${project.accentColor || '#00f0ff'}, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}
