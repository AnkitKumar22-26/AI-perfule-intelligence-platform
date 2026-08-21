import { describe, it, expect } from 'vitest'
import { PERFUMES } from '../data/perfumes.js'
import { CRITERIA_WEIGHTS, scorePerfume, computeConfidence, rankPerfumes } from './recommendationEngine.js'

describe('CRITERIA_WEIGHTS', () => {
  it('sums to exactly 100 so scores are true percentages', () => {
    const sum = Object.values(CRITERIA_WEIGHTS).reduce((a, b) => a + b, 0)
    expect(sum).toBe(100)
  })
})

describe('scorePerfume', () => {
  it('scores 100 when every criterion matches', () => {
    const perfume = PERFUMES.find((p) => p.name === 'Velvet Oud No. 12')
    const prefs = { occasion: 'evening', weather: 'cool', season: 'winter', budget: 'premium', note: 'oud', gender: 'male' }
    const result = scorePerfume(perfume, prefs)
    expect(result.score).toBe(100)
    expect(Object.values(result.match).every(Boolean)).toBe(true)
  })

  it('scores 0 when nothing matches', () => {
    const perfume = PERFUMES.find((p) => p.name === 'Citrus Bloom') // daily/work, hot/warm, budget, unisex/female
    const prefs = { occasion: 'party', weather: 'cold', season: 'winter', budget: 'premium', note: 'oud', gender: 'male' }
    const result = scorePerfume(perfume, prefs)
    expect(result.score).toBe(0)
  })

  it('never returns a score outside 0–100', () => {
    const prefs = { occasion: 'evening', weather: 'cool', season: 'winter', budget: 'premium', note: 'oud', gender: 'unisex' }
    PERFUMES.forEach((p) => {
      const { score } = scorePerfume(p, prefs)
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(100)
    })
  })
})

describe('computeConfidence', () => {
  it('is higher for a big lead over the runner-up than a near-tie, at equal score', () => {
    const bigLead = computeConfidence(80, 30)
    const nearTie = computeConfidence(80, 1)
    expect(bigLead).toBeGreaterThan(nearTie)
  })

  it('stays within the documented 35–97 band', () => {
    expect(computeConfidence(0, 0)).toBeGreaterThanOrEqual(35)
    expect(computeConfidence(100, 100)).toBeLessThanOrEqual(97)
  })
})

describe('rankPerfumes', () => {
  const prefs = { occasion: 'evening', weather: 'cool', season: 'winter', budget: 'premium', note: 'oud', gender: 'unisex' }

  it('returns exactly topN results', () => {
    const results = rankPerfumes(PERFUMES, prefs, 3)
    expect(results).toHaveLength(3)
  })

  it('returns results sorted by score descending', () => {
    const results = rankPerfumes(PERFUMES, prefs, 5)
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score)
    }
  })

  it('attaches a confidence and a written reason to every result', () => {
    const results = rankPerfumes(PERFUMES, prefs, 3)
    results.forEach((r) => {
      expect(typeof r.confidence).toBe('number')
      expect(typeof r.reason).toBe('string')
      expect(r.reason.length).toBeGreaterThan(0)
    })
  })
})
