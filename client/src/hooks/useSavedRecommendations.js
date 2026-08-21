import { useEffect, useState } from 'react'

const STORAGE_KEY = 'scentelligence:saved-recommendations'

function readStored() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    // Corrupted or blocked storage shouldn't crash the page — fall back to
    // an empty saved list rather than throwing.
    return []
  }
}

export function useSavedRecommendations() {
  const [saved, setSaved] = useState(readStored)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {
      // Storage can be full or disabled (private browsing) — saving becomes
      // a no-op rather than an unhandled exception.
    }
  }, [saved])

  const save = (perfume) => {
    setSaved((prev) =>
      prev.some((p) => p.name === perfume.name)
        ? prev
        : [...prev, { name: perfume.name, brand: perfume.brand, score: perfume.score, savedAt: Date.now() }]
    )
  }

  const remove = (name) => setSaved((prev) => prev.filter((p) => p.name !== name))
  const isSaved = (name) => saved.some((p) => p.name === name)

  return { saved, save, remove, isSaved }
}
