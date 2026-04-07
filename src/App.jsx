import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FixedCarScene from './components/FixedCarScene'
import CustomCursor from './components/CustomCursor'

const Home     = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const About    = lazy(() => import('./pages/About'))
const Contact  = lazy(() => import('./pages/Contact'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-xs text-gray-500 tracking-widest uppercase">Loading</p>
      </div>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  return (
    <>
      <CustomCursor />
      <Navbar />
      {/* Fixed car scene on the right — visible on all pages */}
      <FixedCarScene />

      {/* Main content — shifted to leave room for car panel */}
      <main className="pr-0 lg:pr-[72px]">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"         element={<Home />}     />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about"    element={<About />}    />
              <Route path="/contact"  element={<Contact />}  />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
      </main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
