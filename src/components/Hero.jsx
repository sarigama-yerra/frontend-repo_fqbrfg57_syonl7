import Spline from '@splinetool/react-spline'
import { Camera, Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-full px-4 py-2 shadow-sm mb-6">
          <Camera className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Creative AI Studio</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
          Turn words into stunning visuals
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl">
          A minimalist AI image generator for designers, marketers, and creators.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#generate" className="px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition">Start generating</a>
          <a href="#gallery" className="px-6 py-3 rounded-lg bg-white/80 backdrop-blur font-semibold border border-gray-200 hover:bg-white transition">View gallery</a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white" />
    </section>
  )
}

export default Hero
