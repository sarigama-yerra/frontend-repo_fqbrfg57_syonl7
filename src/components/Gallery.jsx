import { useEffect, useState } from 'react'
import { ImageIcon } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const Gallery = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/generations`)
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-6">
          <ImageIcon className="w-5 h-5 text-gray-700"/>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Recent creations</h2>
        </div>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {items.length === 0 ? (
          <p className="text-gray-600">No generations yet. Create your first one above.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((it)=> (
              <div key={it.id} className="group border rounded-xl overflow-hidden bg-gray-50">
                <img src={it.image_url} alt={it.prompt} className="w-full h-64 object-cover" />
                <div className="p-3">
                  <p className="text-sm text-gray-700 line-clamp-2">{it.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
