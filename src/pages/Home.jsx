import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowDown, Zap, Code2, Globe, Cpu, ChevronRight, CheckCircle, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import CyberBackground from '../components/CyberBackground'
import ProjectCard from '../components/ProjectCard'
import { PROJECTS, SERVICES, PRICING } from '../data'

/* ─── Animated counter ── */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 50
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 30)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ─── Hero Section ── */
function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-28 overflow-hidden">
      <CyberBackground />

      {/* Mouse-parallax floating orb */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #b026ff 0%, transparent 70%)',
          left: `calc(60% + ${mousePos.x * 40}px)`,
          top: `calc(30% + ${mousePos.y * 40}px)`,
          transition: 'left 0.3s ease, top 0.3s ease',
        }}
      />

      <div className="relative z-10 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="section-label mb-6"
        >
          Full-Stack Developer & Creative Technologist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="display-heading text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
        >
          Hi, I'm{' '}
          <span
            className="inline-block neon-text-cyan"
            style={{ textShadow: '0 0 30px rgba(0,240,255,0.5)' }}
          >
            Aman
          </span>
          <br />
          <span className="text-gray-400 text-4xl md:text-5xl lg:text-6xl font-normal font-sans">
            I build things for the
          </span>
          <br />
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #00f0ff, #b026ff)' }}>
            digital realm.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10"
        >
          I design and build exceptional web experiences — from immersive 3D interfaces to high-conversion e-commerce stores. Let's create something extraordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/projects" className="cyber-btn inline-flex items-center gap-2">
            View My Work <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/contact" className="cyber-btn-purple inline-flex items-center gap-2">
            Hire Me <Zap className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap gap-10"
        >
          {[
            { label: 'Projects Delivered', value: 20, suffix: '+' },
            { label: 'Happy Clients',      value: 15, suffix: '+' },
            { label: 'Technologies Used',  value: 12, suffix: '+' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display font-bold text-4xl neon-text-cyan">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="font-mono text-xs text-gray-500">scroll</span>
        <ArrowDown className="w-4 h-4 text-cyber-accent" />
      </motion.div>
    </section>
  )
}

/* ─── Services Section ── */
function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const ICONS = { '🌐': Globe, '🛒': Zap, '⚡': Code2, '🎮': Cpu }

  return (
    <section ref={ref} className="py-32 px-6 md:px-16 lg:px-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-3"
          >
            What I do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="display-heading text-4xl md:text-5xl"
          >
            Services I <span className="neon-text-purple">Offer</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = ICONS[svc.icon] || Zap
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="glass-card rounded-2xl p-8 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.15)' }}>
                    <Icon className="w-5 h-5 text-cyber-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl group-hover:text-cyber-accent transition-colors">{svc.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{svc.description}</p>
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyber-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Featured Projects Section ── */
function FeaturedProjects() {
  const featured = PROJECTS.filter((p) => p.featured)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 px-6 md:px-16 lg:px-24 border-t border-white/5 relative grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label mb-3">
              selected work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="display-heading text-4xl md:text-5xl"
            >
              Featured <span className="neon-text-cyan">Projects</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link to="/projects" className="cyber-btn inline-flex items-center gap-2 text-xs py-2 px-5">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing Section ── */
function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label mb-3">
            Transparent pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="display-heading text-4xl md:text-5xl mb-4"
          >
            Investment <span className="neon-text-purple">&amp; Costs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-sm flex items-center justify-center gap-2"
          >
            <Info className="w-4 h-4 text-cyber-accent shrink-0" />
            Making &amp; Hosting costs are separate — hosting is paid by the client to the provider directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className={`relative glass-card rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
                plan.highlight ? 'neon-border-purple' : 'hover:neon-border-cyan'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber-purple text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-gray-500 text-xs mb-6 leading-relaxed">{plan.description}</p>

              {/* Making cost */}
              <div className="mb-3 pb-3 border-b border-white/5">
                <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Making Cost (One-time)</p>
                <p className="font-display font-bold text-3xl text-cyber-accent">{plan.makingCost}</p>
              </div>

              {/* Hosting cost */}
              <div className="mb-6">
                <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                  Hosting Cost <Info className="w-3 h-3" /> <span className="normal-case font-sans">(Paid by client)</span>
                </p>
                <p className="font-display font-bold text-2xl text-cyber-purple">
                  {plan.hostingCost}
                  <span className="text-sm text-gray-500 font-sans font-normal ml-1">{plan.hostingNote}</span>
                </p>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyber-accent shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`mt-8 block text-center py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-cyber-purple text-white hover:bg-cyber-purple-dim'
                    : 'border border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10'
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Home page ── */
export default function Home() {
  return (
    <div className="page-enter">
      <Hero />
      <Services />
      <FeaturedProjects />
      <Pricing />
    </div>
  )
}
