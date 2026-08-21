import { useEffect, useRef } from 'react'

export default function ParticleBackground({ density = 55, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let width, height, particles, rafId

    const isMobile = window.innerWidth < 640
    const count = isMobile ? Math.round(density * 0.4) : density

    function resize() {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }

    function makeParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: (Math.random() * 1.6 + 0.4) * window.devicePixelRatio,
        vy: (Math.random() * 0.18 + 0.05) * window.devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.08 * window.devicePixelRatio,
        alpha: Math.random() * 0.5 + 0.15
      }
    }

    function init() {
      resize()
      particles = Array.from({ length: count }, makeParticle)
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.y -= p.vy
        p.x += p.vx
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`
        ctx.fill()
      })
      rafId = requestAnimationFrame(draw)
    }

    init()
    if (!prefersReducedMotion) {
      draw()
    } else {
      draw()
      cancelAnimationFrame(rafId)
    }

    const handleResize = () => {
      cancelAnimationFrame(rafId)
      init()
      if (!prefersReducedMotion) draw()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [density])

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} aria-hidden="true" />
}