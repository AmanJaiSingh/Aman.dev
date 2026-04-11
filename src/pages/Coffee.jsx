import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Coffee, ArrowLeft } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function CoffeeBreak() {
  const { language } = useLanguage()
  return (
    <div className="page-enter min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background glitch effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-purple blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-accent blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative z-10 glass-card p-12 rounded-3xl max-w-lg border border-cyber-accent/30"
        style={{ boxShadow: '0 0 40px rgba(0, 240, 255, 0.1)' }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <Coffee className="w-20 h-20 text-cyber-accent drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
        </motion.div>

        <h1 className="display-heading text-4xl mb-4 font-black">
          {language === 'en' ? (
            <>System <span className="neon-text-purple">Overload</span></>
          ) : (
            <>System <span className="neon-text-purple">Dhuaan Dhuaan</span></>
          )}
        </h1>
        
        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          {language === 'en' 
            ? "Whoa there! You've scrolled too deep into the digital realm and found my secret caffeine stash. ☕"
            : "Bhai, itna deep scroll karoge to internet khatam ho jayega. Ye meri secret tapri hai. ☕"}
        </p>

        <p className="text-gray-400 text-sm mb-8 italic">
          {language === 'en'
            ? "Take a deep breath, stretch, and grab a real coffee before heading back to the matrix."
            : "Chai peeyo, biscuit khao aur wapis matrix me jao."}
        </p>

        <Link to="/" className="cyber-btn inline-flex items-center gap-2 mx-auto">
          <ArrowLeft className="w-4 h-4" /> {language === 'en' ? 'Back to Reality' : 'Peeche Mudo'}
        </Link>
      </motion.div>
    </div>
  )
}
