import { motion } from 'framer-motion'
import { Terminal, Code2, Cpu, Mail, Globe, MessageSquare, ExternalLink } from 'lucide-react'
import CyberBackground from './components/CyberBackground'

function App() {
  return (
    <div className="relative min-h-screen bg-cyber-dark text-white selection:bg-cyber-accent selection:text-black">
      <CyberBackground />
      
      {/* Content Overlay */}
      <div className="relative z-10">
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
          <div className="text-2xl font-mono font-bold tracking-tighter">
            <span className="text-cyber-accent">&lt;</span>
            <span className="text-white">Aman</span>
            <span className="text-cyber-purple"> /&gt;</span>
          </div>
          <div className="hidden md:flex gap-8 font-mono text-sm">
            <a href="#about" className="hover:text-cyber-accent transition-colors">01. About</a>
            <a href="#projects" className="hover:text-cyber-accent transition-colors">02. Work</a>
            <a href="#contact" className="hover:text-cyber-accent transition-colors">03. Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-cyber-accent font-mono mb-4">Hi, my name is</p>
            <h1 className="text-5xl md:text-8xl font-bold mb-4 tracking-tight">
              Aman Jai Singh.
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-400 mb-8 max-w-3xl leading-tight">
              I build things for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-cyber-purple">digital realm</span>.
            </h2>
            <p className="text-gray-400 max-w-xl text-lg mb-10 leading-relaxed">
              I'm a full-stack developer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.
            </p>
            <a href="#projects" className="inline-block px-8 py-4 border border-cyber-accent text-cyber-accent font-mono hover:bg-cyber-accent/10 transition-colors rounded-sm uppercase tracking-wider text-sm">
              Check out my work
            </a>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 md:px-24 border-t border-white/5 bg-cyber-dark/80 backdrop-blur-md">
          <h3 className="text-3xl font-bold mb-16 flex items-center gap-4">
            <span className="text-cyber-accent font-mono text-xl">02.</span> 
            Some Things I've Built
            <div className="h-px bg-white/10 flex-1 ml-4" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                whileHover={{ y: -10 }}
                className="group relative bg-[#111118] border border-white/5 p-8 rounded-xl hover:border-cyber-purple/50 transition-all duration-300 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <Terminal className="w-10 h-10 text-cyber-accent" />
                  <div className="flex gap-4">
                    <a href="#" className="text-gray-400 hover:text-cyber-accent"><Globe className="w-5 h-5" /></a>
                    <a href="#" className="text-gray-400 hover:text-cyber-accent"><ExternalLink className="w-5 h-5" /></a>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-4 group-hover:text-cyber-accent transition-colors relative z-10">Cyberpunk E-Commerce</h4>
                <p className="text-gray-400 text-sm mb-6 relative z-10">
                  A modern web application built with React, Node.js, and Three.js featuring immersive 3D product product view.
                </p>
                <ul className="flex gap-4 text-xs font-mono text-cyber-purple disabled opacity-80 relative z-10">
                  <li>React</li>
                  <li>Three.js</li>
                  <li>Node</li>
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 flex flex-col items-center text-center border-t border-white/5 bg-cyber-dark/90">
          <p className="text-cyber-accent font-mono mb-4 text-sm">03. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a href="mailto:hello@example.com" className="px-8 py-4 border border-cyber-accent text-cyber-accent font-mono hover:bg-cyber-accent/10 transition-colors rounded-sm uppercase tracking-wider text-sm flex items-center gap-3">
            <Mail className="w-4 h-4" /> Say Hello
          </a>
        </section>
        
        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 font-mono text-sm border-t border-white/5">
          <p>Designed & Built by Aman Jai Singh</p>
        </footer>

      </div>
    </div>
  )
}

export default App
