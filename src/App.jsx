import Hero from './components/Hero'
import Generator from './components/Generator'
import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <Generator />
      <Gallery />
      <footer className="py-10 text-center text-sm text-gray-500">Built with love • Flames.Blue</footer>
    </div>
  )
}

export default App
