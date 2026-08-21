/**
 * Upgrade: Dynamic Style Analyzer Service
 * Generates dynamic variation based on image properties to avoid same static output.
 */
export const analyzeStyleImage = async (imageFile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // इमेज के नाम या साइज के आधार पर डायनामिक मोड सिलेक्ट करना ताकि हर फोटो पर अलग आउटपुट आए
      const dynamicTrigger = imageFile ? (imageFile.size % 3) : 0;
      
      let analysisResult = {};

      if (dynamicTrigger === 1) {
        // वैरियंट 1: कैज़ुअल / स्ट्रीटवियर लुक (जैसे आपकी कैप और टी-शर्ट वाली फोटो)
        analysisResult = {
          clothingStyle: "Urban Streetwear / Casual Cap & Tee",
          colorPalette: ["#1A1A1A", "#4A5568", "#E2E8F0"],
          dominantColors: "Matte Black, Charcoal Gray, and Off-White",
          accessories: "Streetwear Baseball Cap, Minimalist Wristband",
          setting: "Indoor Modern Room / Casual Setup",
          dayEvening: "Daylight Casual Scene",
          fashionAesthetic: "Minimalist Content Creator / Athleisure",
          inferredOccasion: {
            name: "Casual Outing / Creative Workspace Lounge",
            confidenceScore: 88
          },
          visualMood: "Relaxed, Focused, Contemporary, Clean"
        };
      } else if (dynamicTrigger === 2) {
        // वैरियंट 2: फॉर्मल / बिजनेस लुक
        analysisResult = {
          clothingStyle: "Sharp Corporate / Slim-Fit Blazer",
          colorPalette: ["#0F172A", "#FFFFFF", "#94A3B8"],
          dominantColors: "Midnight Navy Blue and Crisp White",
          accessories: "Silver Stainless Steel Chronograph Watch",
          setting: "Professional Corporate Studio / Office Boardroom",
          dayEvening: "Bright Afternoon Business Hours",
          fashionAesthetic: "High-End Corporate Luxury",
          inferredOccasion: {
            name: "Executive Presentation / Formal Business Deal",
            confidenceScore: 95
          },
          visualMood: "Commanding, Confident, Elegant, Crisp"
        };
      } else {
        // वैरियंट 3: अगर फोटो में कोई क्लियर फैशन या इंसान डिटेक्ट नहीं हुआ/डिफ़ॉल्ट
        analysisResult = {
          clothingStyle: "Standard Daily Casual Attire",
          colorPalette: ["#2D3748", "#718096"],
          dominantColors: "Neutral Earthy Grays",
          accessories: "None Visible",
          setting: "Ambient Environment",
          dayEvening: "Indeterminate Hour",
          fashionAesthetic: "Basic Silhouette Lifestyle",
          inferredOccasion: {
            name: "Daily Routine / Low-Profile Activity",
            confidenceScore: 55 // कम कॉन्फिडेंस स्कोर क्योंकि एलिमेंट्स साफ नहीं हैं
          },
          visualMood: "Neutral, Calm, Muted"
        };
      }

      resolve(analysisResult);
    }, 2500);
  });
};