import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Code2, Briefcase, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const SOCIALS = [
  { icon: Code2,         href: '#',  label: 'GitHub'   },
  { icon: Briefcase,     href: '#',  label: 'LinkedIn' },
  { icon: MessageCircle, href: '#',  label: 'Twitter'  },
]

const SERVICES_LIST = [
  'Landing Page / Marketing Site',
  'E-Commerce Store',
  'Web Application / SaaS',
  '3D / Interactive Experience',
  'Other',
]

export default function Contact() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          service: form.service,
          budget: form.budget,
          message: form.message,
          subject: 'New Contact Form Submission from Cyberspace Portfolio',
        }),
      })
      const result = await response.json()
      if (result.success) {
        setSent(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page-enter min-h-screen pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label mb-3">
            {language === 'en' ? "Let's talk" : "Baat Cheet"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="display-heading text-5xl md:text-6xl mb-4"
          >
            {language === 'en' ? (
              <>Get In <span className="neon-text-cyan">Touch</span></>
            ) : (
              <>Milte <span className="neon-text-cyan">Hain</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-lg leading-relaxed"
          >
            {language === 'en'
              ? "Have a project in mind? Let's discuss how I can help. Fill in the form and I'll get back to you within 24 hours."
              : "Koi project hai dimaag me? Form bhar do, 24 ghante me reply aayega pakka."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            {[
              { icon: Mail,    label: 'Email',    value: 'amanjaisingh1111@gmail.com' },
              { icon: Phone,   label: 'WhatsApp', value: '9045122383' },
              { icon: MapPin,  label: 'Location', value: 'India (Remote Worldwide)' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.15)' }}
                >
                  <Icon className="w-4 h-4 text-cyber-accent" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-white text-sm">{value}</p>
                </div>
              </div>
            ))}

            {/* Social icons */}
            <div className="pt-6 border-t border-white/5">
              <p className="section-label mb-4">Find me online</p>
              <div className="flex gap-4">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label}
                    className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-cyber-accent transition-all duration-200 hover:shadow-neon-cyan">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-400">Available for freelance work</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-12 text-center neon-border-cyan"
              >
                <CheckCircle className="w-16 h-16 text-cyber-accent mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl mb-2">Message Sent!</h3>
                <p className="text-gray-400">I'll get back to you within 24 hours. Talk soon!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="section-label mb-2 block" htmlFor="name">
                      {language === 'en' ? 'Your Name' : 'Tumhara Naam'}
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder={language === 'en' ? "Aman Singh" : "Aman Singh"}
                      className="w-full bg-cyber-darker border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-cyber-accent/60 transition-colors"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="section-label mb-2 block" htmlFor="email">
                      {language === 'en' ? 'Email Address' : 'Email Pata'}
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-cyber-darker border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-cyber-accent/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="section-label mb-2 block" htmlFor="service">
                    {language === 'en' ? 'Service Needed' : 'Kya Banana Hai Kaunsa Service'}
                  </label>
                  <select
                    id="service" name="service"
                    value={form.service} onChange={handleChange}
                    className="w-full bg-cyber-darker border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-cyber-accent/60 transition-colors"
                  >
                    <option value="" disabled>
                      {language === 'en' ? 'Select a service...' : 'Ek service select karo...'}
                    </option>
                    {SERVICES_LIST.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="section-label mb-2 block" htmlFor="budget">
                    {language === 'en' ? 'Estimated Budget' : 'Kitna Kharcha Allowed Hai'}
                  </label>
                  <input
                    id="budget" name="budget" type="text"
                    value={form.budget} onChange={handleChange}
                    placeholder="e.g. $500 – $1000"
                    className="w-full bg-cyber-darker border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-cyber-accent/60 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="section-label mb-2 block" htmlFor="message">
                    {language === 'en' ? 'Tell me about your project' : 'Btao kya banana hai'}
                  </label>
                  <textarea
                    id="message" name="message" rows={5} required
                    value={form.message} onChange={handleChange}
                    placeholder={language === 'en' ? "Describe what you need..." : "Likh do jo bhi idea ho..."}
                    className="w-full bg-cyber-darker border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-cyber-accent/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full cyber-btn flex items-center justify-center gap-2 py-3"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
                      {language === 'en' ? 'Sending...' : 'Bhej raha hoon...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> {language === 'en' ? 'Send Message' : 'Message Bhejo'}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
