/**
 * Smart Recommendation Engine for Perfumes (Google-Inspired Multi-Tier Fallback)
 */

export const HARD_FILTER_LABELS = {
  occasion: 'Occasion',
  weather: 'Weather',
  budget: 'Budget',
  gender: 'Gender'
};

export function rankPerfumes(perfumes, userCriteria, maxResults = 3) {
  if (!Array.isArray(perfumes) || perfumes.length === 0 || !userCriteria) {
    return { mode: 'strict', results: [] };
  }

  // Safe data parsing helpers
  const safeArray = (arr) => Array.isArray(arr) ? arr.map(v => String(v).toLowerCase().trim()) : [];
  const safeString = (val) => String(val || '').toLowerCase().trim();

  const criteria = {
    occasion: safeString(userCriteria.occasion),
    weather: safeString(userCriteria.weather),
    budget: safeString(userCriteria.budget),
    gender: safeString(userCriteria.gender),
    season: safeString(userCriteria.season),
    note: safeString(userCriteria.note),
  };

  // Helper to calculate preference score (Season + Note)
  const calculateStyleScore = (perfume) => {
    let score = 50; 
    const pSeasons = safeArray(perfume.seasons);
    const pNotes = safeArray(perfume.notes);

    if (pSeasons.includes(criteria.season)) score += 25;
    if (pNotes.includes(criteria.note)) score += 25;
    return score;
  };

  // --- TIER 1: STRICT MATCHING ---
  let strictMatches = perfumes.filter(perfume => {
    const pOccasions = safeArray(perfume.occasions);
    const pWeathers = safeArray(perfume.weathers);
    const pBudget = safeString(perfume.budget);
    const pGender = safeString(perfume.gender);

    return (
      pOccasions.includes(criteria.occasion) &&
      pWeathers.includes(criteria.weather) &&
      pBudget === criteria.budget &&
      (pGender === criteria.gender || pGender === 'unisex' || criteria.gender === 'unisex')
    );
  });

  if (strictMatches.length > 0) {
    const formattedStrict = strictMatches.map(p => ({
      ...p,
      score: calculateStyleScore(p),
      failedHardFilters: [],
      match: {
        occasion: true,
        weather: true,
        budget: true,
        gender: true,
        season: safeArray(p.seasons).includes(criteria.season),
        note: safeArray(p.notes).includes(criteria.note)
      }
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

    return { mode: 'strict', results: formattedStrict };
  }

  // --- TIER 2 & 3: DYNAMIC SCORING FALLBACK (HAMESHA RESULT DIKHAYEGA) ---
  // Agar perfect match nahi hai, toh har perfume ka match calculate karo
  let scoredFallbackList = perfumes.map(perfume => {
    const pOccasions = safeArray(perfume.occasions);
    const pWeathers = safeArray(perfume.weathers);
    const pBudget = safeString(perfume.budget);
    const pGender = safeString(perfume.gender);

    const matchState = {
      occasion: pOccasions.includes(criteria.occasion),
      weather: pWeathers.includes(criteria.weather),
      budget: pBudget === criteria.budget,
      gender: (pGender === criteria.gender || pGender === 'unisex' || criteria.gender === 'unisex')
    };

    const failedHardFilters = Object.keys(matchState).filter(key => !matchState[key]);
    const passedCount = Object.keys(matchState).length - failedHardFilters.length;

    // Calculate dynamic percentage based on passed criteria
    let closenessScore = (passedCount / 4) * 80; // Hard filters yield up to 80%

    const pSeasons = safeArray(perfume.seasons);
    const pNotes = safeArray(perfume.notes);
    const seasonMatch = pSeasons.includes(criteria.season);
    const noteMatch = pNotes.includes(criteria.note);

    if (seasonMatch) closenessScore += 10;
    if (noteMatch) closenessScore += 10;

    return {
      ...perfume,
      score: Math.min(Math.round(closenessScore), 95),
      failedHardFilters,
      passedCount, // Sorting matrix helper
      match: {
        ...matchState,
        season: seasonMatch,
        note: noteMatch
      }
    };
  });

  // Pehle unhe sort karo jinke sabse zyada strict criteria pass huye hain, fir highest score par sort karo
  const finalFallback = scoredFallbackList
    .sort((a, b) => {
      if (b.passedCount !== a.passedCount) {
        return b.passedCount - a.passedCount; // Highest matching filters come first
      }
      return b.score - a.score;
    })
    .slice(0, maxResults);

  return { mode: 'fallback', results: finalFallback };
}