/**
 * Maps Dynamic Analysis outputs to Haute Perfumery with Visual Vectors & Contextual Mapping
 */
export const getPerfumeRecommendationsByStyle = (analysis) => {
  // Low confidence default match
  if (analysis.inferredOccasion.confidenceScore < 60) {
    return [
      {
        id: "perfume-neutral-1",
        name: "Bleu De Chanel (Eau de Parfum)",
        brand: "Chanel",
        imageEmoji: "🧪", 
        fragranceFamily: "Fresh Woody Citrus",
        notes: "Grapefruit, Mint, Cedarwood, Incense, Amber",
        confidenceScore: 70,
        longevity: "Moderate (6-7 Hours)",
        projection: "Subtle & Professional",
        bestSeason: "All Year Round",
        extractedInput: `Detected: ${analysis.clothingStyle} with subtle attributes.`,
        matchReason: `Since the vision recognition score is conservative (${analysis.inferredOccasion.confidenceScore}%), we selected an evergreen fragrance archetype. This structures seamlessly with minimalist visual silhouettes to deliver a universally reliable projection profile.`
      }
    ];
  }

  // Variant 1: Streetwear / Casual Look
  if (analysis.clothingStyle.includes("Urban Streetwear") || analysis.visualMood.includes("Relaxed")) {
    return [
      {
        id: "perfume-casual-1",
        name: "Creed Aventus",
        brand: "House of Creed",
        imageEmoji: "👑", 
        fragranceFamily: "Fruity Rich Woody",
        notes: "Pineapple, Birchwood, Musk, Blackcurrant, Bergamot",
        confidenceScore: 92,
        longevity: "Long Lasting (8-9 Hours)",
        projection: "Strong & Vibrant",
        bestSeason: "Summer / Spring Daywear",
        extractedInput: `Inputs: ${analysis.accessories} with ${analysis.dominantColors} tones.`,
        matchReason: `The extracted components detailing '${analysis.accessories}' set against a '${analysis.dominantColors}' foundation align perfectly with this formulation's iconic blackcurrant and birchwood notes, emphasizing a vibrant contemporary lifestyle.`
      },
      {
        id: "perfume-casual-2",
        name: "Dior Sauvage (Eau de Parfum)",
        brand: "Dior",
        imageEmoji: "🦅",
        fragranceFamily: "Raw Fresh Spicy",
        notes: "Calabrian Bergamot, Sichuan Pepper, Ambrosan, Vanilla Accord",
        confidenceScore: 88,
        longevity: "Long Lasting (8+ Hours)",
        projection: "Commanding Trail",
        bestSeason: "Any Season / Casual Evenings",
        extractedInput: `Inputs: ${analysis.setting} with a ${analysis.visualMood} expression.`,
        matchReason: `Complementing your observed '${analysis.visualMood}' energy matrix, the crisp juxtaposition of pepper and ambient ambroxan serves to amplify confidence across informal architectural environments.`
      }
    ];
  }

  // Variant 2: Formal / Suits Look
  return [
    {
      id: "perfume-formal-1",
      name: "Tom Ford - Oud Wood",
      brand: "Tom Ford",
      imageEmoji: "🪵",
      fragranceFamily: "Earthy Woody / Oud Luxury",
      notes: "Rare Oud, Sandalwood, Chinese Pepper, Rosewood, Vanilla",
      confidenceScore: 96,
      longevity: "Long Lasting (10 Hours)",
      projection: "Elite & Sophisticated",
      bestSeason: "Winter / Autumn Business Meetings",
      extractedInput: `Inputs: ${analysis.clothingStyle} anchored by ${analysis.accessories}.`,
      matchReason: `To balance your highly intentional '${analysis.clothingStyle}' structure, this precious formulation brings forward rare oud wood and exotic spices, adding an authoritative, high-tier layer of luxury to your profile.`
    }
  ];
};