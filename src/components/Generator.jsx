import { useState } from 'react'
import { Sparkles, ImageDown, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const Generator = () => {
  const [prompt, setPrompt] = useState('A modern camera on a marble desk, soft studio light')
  const [style, setStyle] = useState('minimal')
  const [size, setSize] = useState('square')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')

  const generate = async (e) => {
    e?.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style, size })
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      setImage(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="generate" className="relative py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Generate an image</h2>
            <p className="mt-2 text-gray-600">Describe your vision and choose a style. We handle the rest.</p>
            <form onSubmit={generate} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
                <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} rows={3} className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-black/50" placeholder="e.g., A cinematic portrait of a designer in a neon-lit studio" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
                  <select value={style} onChange={(e)=>setStyle(e.target.value)} className="w-full rounded-lg border-gray-300">
                    <option value="minimal">Minimal</option>
                    <option value="cinematic">Cinematic</option>
                    <option value="photo">Photorealistic</option>
                    <option value="vintage">Vintage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aspect</label>
                  <select value={size} onChange={(e)=>setSize(e.target.value)} className="w-full rounded-lg border-gray-300">
                    <option value="square">Square</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-900 disabled:opacity-60">
                {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4"/>}
                {loading ? 'Generating...' : 'Generate'}
              </button>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 min-h-[360px] flex items-center justify-center relative">
            {!image && <p className="text-gray-500">Your image will appear here.</p>}
            {image && (
              <div className="w-full">
                <img src={image.image_url} alt={image.prompt} className="w-full rounded-lg shadow" />
                <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                  <p className="truncate"><span className="font-medium">Prompt:</span> {image.prompt}</p>
                  <a href={image.image_url} download className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border hover:bg-gray-50"><ImageDown className="w-4 h-4"/>Download</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Generator
