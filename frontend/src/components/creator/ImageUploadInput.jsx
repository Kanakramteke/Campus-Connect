import React, { useState } from 'react'
import { Upload, X, Image as ImageIcon, RefreshCw, Check, Sparkles } from 'lucide-react'
import { uploadFile } from '../../api/apiClient'

const EVENT_PRESETS = [
  { name: 'Hackathon', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Cultural Fest', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Robotics', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Music Concert', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80' },
  { name: 'AI Workshop', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Dance Battle', url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Drama Stage', url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Art Exhibition', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80' }
]

export default function ImageUploadInput({ label = 'Banner Image', value, onChange, error, presets = EVENT_PRESETS }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showPresets, setShowPresets] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const res = await uploadFile(file)
        if (res && res.url) {
          onChange(res.url)
          return
        }
      } catch (err) {
        console.warn('Backend image upload fallback to local data URL')
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black text-[#374375] uppercase tracking-wider block">
          {label} <span className="text-[#895159]">*</span>
        </label>
        {presets && presets.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="text-[11px] font-extrabold text-[#895159] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>{showPresets ? 'Hide Presets' : 'Choose Preset Gallery'}</span>
          </button>
        )}
      </div>

      {/* Value Preview State */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#BABDE2] group bg-[#FFFCF5] shadow-xs">
          <img src={value} alt="Preview" className="w-full h-48 sm:h-56 object-cover" />
          <div className="absolute inset-0 bg-[#374375]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
            <label className="py-2 px-3.5 rounded-xl bg-[#FFFCF5] text-[#374375] font-extrabold text-xs hover:bg-[#BABDE2] transition-colors cursor-pointer flex items-center gap-1.5 shadow-md">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replace</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>

            <button
              type="button"
              onClick={() => onChange('')}
              className="py-2 px-3.5 rounded-xl bg-[#895159] text-[#FFFCF5] font-extrabold text-xs hover:bg-rose-700 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Zone */
        <div
          onDragOver={(e) => { e.preventDefault(); setIsHovered(true) }}
          onDragLeave={() => setIsHovered(false)}
          onDrop={(e) => {
            e.preventDefault()
            setIsHovered(false)
            const file = e.dataTransfer.files?.[0]
            if (file) {
              const reader = new FileReader()
              reader.onloadend = () => onChange(reader.result)
              reader.readAsDataURL(file)
            }
          }}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
            isHovered
              ? 'border-[#374375] bg-[#BABDE2]/25 scale-[1.01]'
              : error
              ? 'border-rose-400 bg-rose-50/50'
              : 'border-[#BABDE2] bg-[#FFFCF5] hover:border-[#374375] hover:bg-[#BABDE2]/15'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#374375] text-[#FFFCF5] flex items-center justify-center shadow-sm">
            <Upload className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-extrabold text-[#374375]">
              Click to upload or drag & drop image
            </p>
            <p className="text-[11px] text-[#374375]/70 font-semibold">
              PNG, JPG, WEBP or GIF (Max 5MB)
            </p>
          </div>

          <label className="py-2 px-4 rounded-xl bg-[#374375] hover:bg-[#895159] text-[#FFFCF5] font-extrabold text-xs transition-colors shadow-2xs cursor-pointer">
            <span>Browse File</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      )}

      {/* Preset Gallery Selector */}
      {showPresets && (
        <div className="p-3 bg-[#BABDE2]/20 rounded-2xl border border-[#BABDE2]/60 space-y-2">
          <span className="text-[11px] font-black text-[#374375] uppercase tracking-wider block">
            Quick Select Preset Cover:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { onChange(p.url); setShowPresets(false) }}
                className={`relative rounded-xl overflow-hidden h-16 border-2 transition-all cursor-pointer group ${
                  value === p.url ? 'border-[#374375] ring-2 ring-[#374375]/40' : 'border-transparent hover:border-[#BABDE2]'
                }`}
              >
                <img src={p.url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                  <span className="text-[10px] font-extrabold text-white truncate">{p.name}</span>
                </div>
                {value === p.url && (
                  <div className="absolute top-1 right-1 bg-[#374375] text-white rounded-full p-0.5 shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-xs font-bold text-rose-600">{error}</p>}
    </div>
  )
}
