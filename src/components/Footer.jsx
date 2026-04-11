import { Code2, Briefcase, Mail, MessageCircle, Zap } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const SOCIALS = [
  { icon: Code2, href: 'https://github.com/amanjaisingh', label: 'GitHub' },
  { icon: Briefcase, href: 'https://linkedin.com/in/aman-jai-singh', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Mail, href: 'mailto:amanjaisingh1111@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-cyber-darker/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyber-accent" />
            <span className="font-display font-bold tracking-widest text-sm">
              <span className="text-white">AMAN</span>
              <span className="text-cyber-accent">.</span>
              <span className="text-cyber-purple">DEV</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="flex gap-6 font-mono text-xs text-gray-500">
            {['/', '/projects', '/about', '/contact'].map((p, i) => (
              <NavLink key={p} to={p} end={p === '/'} className="hover:text-cyber-accent transition-colors">
                {['Home', 'Projects', 'About', 'Contact'][i]}
              </NavLink>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyber-accent transition-all duration-200 hover:drop-shadow-[0_0_8px_#00f0ff]"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="font-mono text-xs text-gray-600">
            Designed &amp; Built by{' '}
            <span className="text-cyber-accent">Aman Jai Singh</span>
            {' · '}
            <span className="text-cyber-purple">© {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
