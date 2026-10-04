export const TRANSLATIONS = {
  en: {
    brand: {
      name: "MoneyGuard",
      tagline: "Pause. Verify. Understand.",
      companion: "Your AI Financial Safety Companion",
      hackathon: "SANGYAN Investor Resilience Hackathon 2026",
      disclaimer: "MoneyGuard provides educational financial safety guidance. It does not provide investment advice or recommendations."
    },
    nav: {
      dashboard: "Dashboard",
      check: "Check a Message",
      explain: "Explain Finance",
      pause: "Pause & Reflect",
      history: "History",
      safetyGuide: "Safety Guide",
      demoMode: "Demo Mode"
    },
    dashboard: {
      badge: "Investor Resilience System",
      heroTitle: "Protect your decisions before you protect your money.",
      heroSubtitle: "Check suspicious financial messages, understand confusing financial concepts without jargon, and take a 60-second pause before high-pressure choices.",
      ctaCheck: "Check Suspicious Message",
      ctaExplain: "Explore Financial Concepts",
      ctaPause: "Take a 60s Pause",
      modesTitle: "Three Pillars of Financial Resilience",
      modesSubtitle: "Built to protect Indian retail investors from predatory fraud, jargon barriers, and emotional impulse.",
      cardCheck: {
        title: "MoneyGuard Check",
        tag: "Digital Fraud Resilience",
        description: "Spot hidden red flags, guaranteed return traps, and predatory urgency before you click, pay, or trust.",
        btn: "Check a Message"
      },
      cardExplain: {
        title: "MoneyGuard Explain",
        tag: "Financial Literacy",
        description: "Understand NAV, IPO, SIP, and market jargon in simple language with relatable everyday analogies.",
        btn: "Ask MoneyGuard"
      },
      cardPause: {
        title: "MoneyGuard Pause",
        tag: "Behavioural Resilience",
        description: "Take a 60-second cooling-off checkpoint to detect FOMO, social pressure, and impulsive loss chasing.",
        btn: "Take a Pause"
      },
      statsTitle: "Protecting Everyday Investors",
      stats: {
        scamsDetected: "18+ Scam Signatures",
        languages: "English, Hindi, Marathi",
        coolingTime: "60-Second Reflection",
        transparency: "100% Deterministic Scoring"
      }
    },
    check: {
      title: "Check Before You Click",
      subtitle: "Something feel suspicious? Bring it to MoneyGuard for instant AI red flag analysis.",
      tabs: {
        paste: "Paste Message",
        screenshot: "Upload Screenshot",
        voice: "Voice Input"
      },
      placeholder: "Paste a suspicious message, WhatsApp forward, SMS, or Telegram tip here...\n\nExample:\n'Double your money in 5 days! Guaranteed 40% returns. Only 3 slots left. Invest now: http://example.com'",
      analyzeBtn: "Analyze with MoneyGuard",
      analyzing: "Analyzing content & calculating deterministic risk score...",
      voiceHelp: "Click the microphone and speak your message aloud.",
      screenshotHelp: "Upload a screenshot from WhatsApp, Telegram, Instagram, SMS, or Email.",
      extractedTextTitle: "Text detected from your image",
      extractedTextSubtitle: "Review and edit the extracted text if needed before running analysis:",
      quickTestBtn: "Load Demo Sample",
      resultTitle: "MoneyGuard Safety Analysis",
      scoreBreakdownBtn: "How was this score calculated?",
      redFlagsTitle: "Identified Warning Signs",
      safeStepsTitle: "Before You Act - Safe Next Steps",
      inputPrompt: "Analyze another message"
    },
    explain: {
      title: "Understand Finance Without the Jargon",
      subtitle: "Ask anything about stocks, mutual funds, or market concepts. Get a simple, jargon-free explanation.",
      inputPlaceholder: "What would you like to understand? (e.g. What is NAV? What is an IPO?)",
      askBtn: "Explain Concept",
      explaining: "Translating financial concept into simple terms...",
      popularTopics: "Popular Concepts to Explore",
      sections: {
        simple: "1. Simple Explanation",
        analogy: "2. Everyday Analogy",
        example: "3. Simple Real-World Example",
        whyMatters: "4. Why It Matters to You",
        misunderstanding: "5. Common Misunderstanding"
      },
      listenVoice: "Listen explanation"
    },
    pause: {
      title: "Pause Before You Act",
      subtitle: "Financial decisions become risky under emotional pressure. Take 60 seconds to reflect before committing money.",
      inputLabel: "What financial action are you about to take?",
      inputPlaceholder: "Example: 'Everyone in my Telegram group is making money on this stock. I'm going to put ₹1 lakh into it tomorrow.'",
      startBtn: "Start 60-Second Pause",
      signalsDetectedTitle: "Potential Behavioural Signals Detected",
      signalsNotice: "MoneyGuard identifies linguistic markers in your message without judging your capability.",
      checkpointTitle: "60-Second Guided Checkpoint",
      checkpointSubtitle: "Answer these 4 questions honestly to clarify your decision:",
      nextBtn: "Next Question",
      prevBtn: "Previous",
      finishBtn: "Complete Reflection",
      coolingOffTitle: "Reflection Summary & Cooling-Off",
      journalTitle: "My Decision Journal",
      journalPrompt: "Write down your primary reason for this decision so future you can review it:",
      journalSaveBtn: "Save to My Journal",
      journalSaved: "Saved to your local Decision Journal!"
    },
    history: {
      title: "Your MoneyGuard History",
      subtitle: "Review your past scam checks, educational queries, and cooling-off journal entries.",
      clearBtn: "Clear All History",
      filterAll: "All Activities",
      filterChecks: "Scam Checks",
      filterExplains: "Explanations",
      filterPauses: "Pause Reflections",
      emptyState: "No history entries yet. Try checking a message or asking an explanation!"
    },
    safetyGuide: {
      title: "MoneyGuard Safety Guide",
      subtitle: "10 Essential Habits for Safer Financial Decisions in India",
      habits: [
        {
          num: 1,
          title: "Be cautious of guaranteed high returns",
          desc: "All market investments involve risk. Any promise of 'guaranteed' 20%-50%+ returns is a universal red flag of fraud."
        },
        {
          num: 2,
          title: "Never act because someone says 'today only'",
          desc: "Artificial urgency is designed to bypass rational thinking. Genuine investment opportunities do not expire in 10 minutes."
        },
        {
          num: 3,
          title: "Never share OTPs, PINs, or passwords",
          desc: "No bank, SEBI official, or broker will ever ask for your OTP or login credentials under any circumstances."
        },
        {
          num: 4,
          title: "Verify entities independently on SEBI/RBI portals",
          desc: "Never trust a logo on a Telegram channel. Search the registration number on official regulator databases (sebi.gov.in)."
        },
        {
          num: 5,
          title: "Be careful with social media & influencer claims",
          desc: "Screenshots of luxury cars and massive trading profits are frequently fabricated or staged to sell worthless schemes."
        },
        {
          num: 6,
          title: "Don't invest simply because everyone else is",
          desc: "Herd mentality and FOMO are the leading causes of retail capital loss during speculative market tops."
        },
        {
          num: 7,
          title: "Understand a product before putting money in",
          desc: "If you cannot explain how the company makes money to a 10-year-old in simple words, do not invest."
        },
        {
          num: 8,
          title: "Never chase previous losses with bigger bets",
          desc: "Revenge trading to 'make back lost money' compounds errors. Accept the loss, pause, and stick to your baseline plan."
        },
        {
          num: 9,
          title: "Enforce a mandatory cooling-off period",
          desc: "Wait at least 24 hours before making any unplanned investment exceeding 5% of your liquid savings."
        },
        {
          num: 10,
          title: "Verify before you trust",
          desc: "Independent skepticism is your greatest financial superpower. Pause, verify the source, and understand the terms."
        }
      ],
      scamTypesTitle: "Common Fraud Archetypes in India",
      scamTypes: [
        {
          name: "Telegram / WhatsApp 'Jackpot' Groups",
          pattern: "Unregistered admins sharing fake 100% accuracy calls and demanding upfront VIP fees or profit-sharing."
        },
        {
          name: "Digital Arrest & Fake Regulatory Threats",
          pattern: "Callers pretending to be Police/CBI/SEBI claiming illegal courier packages or money laundering to extort money."
        },
        {
          name: "Work-From-Home / YouTube Like Scams",
          pattern: "Paying ₹50 per like, then asking victims to deposit ₹10,000 for 'cryptocurrency merchant accounts'."
        },
        {
          name: "Dabba / Unregulated Illegal Trading Apps",
          pattern: "Fake trading portals offering 100x leverage without routing trades through NSE/BSE exchanges."
        }
      ]
    }
  },

  hi: {
    brand: {
      name: "MoneyGuard",
      tagline: "रुकें। परखें। समझें।",
      companion: "आपका AI वित्तीय सुरक्षा साथी",
      hackathon: "SANGYAN Investor Resilience Hackathon 2026",
      disclaimer: "MoneyGuard केवल शैक्षिक वित्तीय सुरक्षा मार्गदर्शन प्रदान करता है। यह निवेश सलाह या सिफारिशें नहीं देता है।"
    },
    nav: {
      dashboard: "डैशबोर्ड",
      check: "संदेश की जांच",
      explain: "फाइनेंस समझें",
      pause: "रुकें और विचार करें",
      history: "इतिहास (History)",
      safetyGuide: "सुरक्षा गाइड",
      demoMode: "डेमो मोड"
    },
    dashboard: {
      badge: "निवेशक लचीलापन प्रणाली (Investor Resilience)",
      heroTitle: "अपने पैसे की सुरक्षा करने से पहले अपने फैसलों की सुरक्षा करें।",
      heroSubtitle: "संदिग्ध वित्तीय संदेशों की जांच करें, बिना कठिन शब्दों के वित्तीय नियमों को समझें, और दबाव में लिए जाने वाले निर्णयों से पहले 60 सेकंड का ब्रेक लें।",
      ctaCheck: "संदिग्ध संदेश जांचें",
      ctaExplain: "वित्तीय शब्द समझें",
      ctaPause: "60 सेकंड का विराम लें",
      modesTitle: "वित्तीय सुरक्षा के 3 मुख्य आधार",
      modesSubtitle: "भारतीय खुदरा निवेशकों को धोखाधड़ी, जटिल भाषा और भावनात्मक जल्दबाजी से बचाने के लिए निर्मित।",
      cardCheck: {
        title: "MoneyGuard Check",
        tag: "डिजिटल धोखाधड़ी से सुरक्षा",
        description: "पैसे भेजने या क्लिक करने से पहले छिपे हुए लाल झंडों (Red Flags) और भ्रामक वादों को पहचानें।",
        btn: "संदेश जांचें"
      },
      cardExplain: {
        title: "MoneyGuard Explain",
        tag: "वित्तीय साक्षरता",
        description: "NAV, IPO, SIP और बाजार की कठिन शब्दावली को आसान और दैनिक उदाहरणों के साथ समझें।",
        btn: "MoneyGuard से पूछें"
      },
      cardPause: {
        title: "MoneyGuard Pause",
        tag: "व्यवहारगत लचीलापन",
        description: "FOMO, दोस्तों के दबाव और नुकसान की भरपाई में जल्दबाजी से बचने के लिए 60 सेकंड का चेकपॉइंट लें।",
        btn: "विराम लें"
      },
      statsTitle: "आम निवेशकों की सुरक्षा",
      stats: {
        scamsDetected: "18+ स्कैम पैटर्न पहचान",
        languages: "अंग्रेजी, हिन्दी, मराठी",
        coolingTime: "60 सेकंड का विचार",
        transparency: "100% पारदर्शी स्कोर"
      }
    },
    check: {
      title: "क्लिक करने से पहले जांचें",
      subtitle: "कुछ संदिग्ध लग रहा है? तुरंत MoneyGuard पर लाएं और AI चेतावनी संकेतों की जांच करें।",
      tabs: {
        paste: "संदेश पेस्ट करें",
        screenshot: "स्क्रीनशॉट अपलोड करें",
        voice: "आवाज इनपुट (Voice)"
      },
      placeholder: "यहाँ कोई भी संदिग्ध निवेश संदेश, WhatsApp फॉरवर्ड या SMS पेस्ट करें...\n\nउदाहरण:\n'5 दिनों में पैसा डबल! 40% गारंटीड रिटर्न। केवल 3 सीटें बाकी। अभी निवेश करें: http://example.com'",
      analyzeBtn: "MoneyGuard से जांचें",
      analyzing: "संदेश का विश्लेषण और पारदर्शी रिस्क स्कोर की गणना हो रही है...",
      voiceHelp: "माइक बटन दबाएं और अपना संदेश बोलें।",
      screenshotHelp: "WhatsApp, Telegram, Instagram या SMS का स्क्रीनशॉट अपलोड करें।",
      extractedTextTitle: "छवि से निकाला गया टेक्स्ट",
      extractedTextSubtitle: "जांच शुरू करने से पहले यदि आवश्यक हो तो टेक्स्ट संपादित करें:",
      quickTestBtn: "डेमो नमूना लोड करें",
      resultTitle: "MoneyGuard सुरक्षा विश्लेषण",
      scoreBreakdownBtn: "यह स्कोर कैसे तय किया गया?",
      redFlagsTitle: "पाए गए चेतावनी के संकेत (Red Flags)",
      safeStepsTitle: "कदम उठाने से पहले - सुरक्षित उपाय",
      inputPrompt: "अन्य संदेश की जांच करें"
    },
    explain: {
      title: "कठिन शब्दों के बिना फाइनेंस समझें",
      subtitle: "शेयर, म्यूचुअल फंड या वित्तीय नियमों के बारे में कुछ भी पूछें। सरल भाषा में उत्तर पाएं।",
      inputPlaceholder: "आप क्या समझना चाहते हैं? (उदा. NAV क्या है? IPO क्या होता है?)",
      askBtn: "अवधारणा समझें",
      explaining: "सरल भाषा और दैनिक उदाहरणों में अनुवाद हो रहा है...",
      popularTopics: "लोकप्रिय विषय",
      sections: {
        simple: "1. सरल व्याख्या",
        analogy: "2. दैनिक जीवन का उदाहरण",
        example: "3. वास्तविक दुनिया का उदाहरण",
        whyMatters: "4. यह आपके लिए क्यों जरूरी है",
        misunderstanding: "5. आम गलतफहमियां"
      },
      listenVoice: "व्याख्या सुनें"
    },
    pause: {
      title: "कदम उठाने से पहले रुकें",
      subtitle: "दबाव और भावनाओं में लिए गए वित्तीय निर्णय जोखिम भरे हो सकते हैं। 60 सेकंड रुककर सोचें।",
      inputLabel: "आप क्या वित्तीय कदम उठाने वाले हैं?",
      inputPlaceholder: "उदाहरण: 'मेरे टेलीग्राम ग्रुप में सब पैसे कमा रहे हैं। मैं भी कल इसमें ₹1 लाख लगाने जा रहा हूँ।'",
      startBtn: "60-सेकंड का विराम शुरू करें",
      signalsDetectedTitle: "पहचाने गए भावनात्मक संकेत",
      signalsNotice: "MoneyGuard बिना आपको आंके केवल संदेश में मौजूद मनोवैज्ञानिक पैटर्न की पहचान करता है।",
      checkpointTitle: "60 सेकंड का निर्देशित चेकपॉइंट",
      checkpointSubtitle: "अपने निर्णय को स्पष्ट करने के लिए इन 4 प्रश्नों का उत्तर दें:",
      nextBtn: "अगला प्रश्न",
      prevBtn: "पिछला",
      finishBtn: "विचार पूरा करें",
      coolingOffTitle: "विचार सारांश और कूलिंग-ऑफ सुझाव",
      journalTitle: "मेरा निर्णय जर्नल (Decision Journal)",
      journalPrompt: "इस निर्णय का मुख्य कारण लिखें ताकि भविष्य में आप इसकी समीक्षा कर सकें:",
      journalSaveBtn: "जर्नल में सहेजें",
      journalSaved: "आपके जर्नल में सुरक्षित सहेज लिया गया!"
    },
    history: {
      title: "आपका MoneyGuard इतिहास",
      subtitle: "अपने पिछले स्कैम चेक, शैक्षिक प्रश्नों और जर्नल प्रविष्टियों की समीक्षा करें।",
      clearBtn: "सारा इतिहास साफ करें",
      filterAll: "सभी गतिविधियाँ",
      filterChecks: "स्कैम चेक्स",
      filterExplains: "व्याख्याएँ",
      filterPauses: "विचार सत्र",
      emptyState: "अभी कोई इतिहास नहीं है। संदेश जांचकर शुरुआत करें!"
    },
    safetyGuide: {
      title: "MoneyGuard सुरक्षा गाइड",
      subtitle: "सुरक्षित वित्तीय निर्णयों के लिए 10 जरूरी आदतें",
      habits: [
        { num: 1, title: "गारंटीड ऊंचे रिटर्न से सावधान रहें", desc: "बाजार में हर निवेश में जोखिम होता है। निश्चित बड़े मुनाफे का वादा धोखाधड़ी का सबसे बड़ा लक्षण है।" },
        { num: 2, title: "'केवल आज के लिए' वाले दबाव में न आएं", desc: "कृत्रिम तात्कालिकता सोचने का समय छीनने के लिए बनाई जाती है। वास्तविक अवसर 10 मिनट में खत्म नहीं होते।" },
        { num: 3, title: "कभी भी OTP, PIN या पासवर्ड साझा न करें", desc: "कोई भी बैंक या SEBI अधिकारी कभी भी आपका पासवर्ड या OTP नहीं मांगता।" },
        { num: 4, title: "SEBI / RBI की वेबसाइट पर स्वतंत्र पुष्टि करें", desc: "टेलीग्राम के लोगो पर भरोसा न करें, आधिकारिक पोर्टल पर रजिस्ट्रेशन नंबर जांचें।" },
        { num: 5, title: "सोशल मीडिया पर मुनाफे के स्क्रीनशॉट से बचें", desc: "महंगी गाड़ियों और फर्जी मुनाफे के स्क्रीनशॉट अक्सर नए लोगों को फंसाने के लिए बनाए जाते हैं।" },
        { num: 6, title: "केवल इसलिए निवेश न करें क्योंकि बाकी सब कर रहे हैं", desc: "भीड़ का पीछा करना और FOMO नुकसान का सबसे प्रमुख कारण होता है।" },
        { num: 7, title: "उत्पाद को समझे बिना पैसा न लगाएं", desc: "यदि आप 10 साल के बच्चे को सरल शब्दों में नहीं समझा सकते कि लाभ कैसे होगा, तो निवेश न करें।" },
        { num: 8, title: "नुकसान की भरपाई के लिए बड़ा दांव न लगाएं", desc: "गुस्से या घबराहट में किया गया निवेश नुकसान को और बढ़ा देता है। रुकें और योजना पर टिके रहें।" },
        { num: 9, title: "अनिवार्य कूलिंग-ऑफ समय लें", desc: "बड़ा निवेश करने से पहले कम से कम 24 घंटे का समय लेकर शांत मन से सोचें।" },
        { num: 10, title: "भरोसा करने से पहले जांचें", desc: "स्वतंत्र शंका ही आपकी सबसे बड़ी ताकत है। रुकें, पुष्टि करें और फिर निर्णय लें।" }
      ],
      scamTypesTitle: "भारत में प्रचलित वित्तीय धोखाधड़ी",
      scamTypes: [
        { name: "टेलीग्राम / व्हाट्सएप 'जैकपॉट' ग्रुप", pattern: "अवैध एडमिन 100% सटीकता का दावा करके VIP फीस या प्रॉफिट शेयर मांगते हैं।" },
        { name: "डिजिटल अरेस्ट और फर्जी पुलिस धमकी", pattern: "CBI/पुलिस के नाम पर फर्जी कॉल करके अवैध पार्सल या मनी लॉन्ड्रिंग का डर दिखाकर पैसे ऐंठना।" },
        { name: "यूट्यूब लाइक / वर्क फ्रॉम होम स्कैम", pattern: "शुरुआत में ₹50 प्रति लाइक देना, फिर क्रिप्टो मर्चेंट अकाउंट के नाम पर ₹10,000 जमा करवाना।" },
        { name: "डब्बा ट्रेडिंग / अवैध ऐप्स", pattern: "बिना NSE/BSE के सीधे अवैध रूप से 100 गुना लीवरेज देकर लोगों का पूरा पैसा डूबाना।" }
      ]
    }
  },

  mr: {
    brand: {
      name: "MoneyGuard",
      tagline: "थांबा. पडताळा. समजून घ्या.",
      companion: "तुमचा AI आर्थिक सुरक्षितता साथीदार",
      hackathon: "SANGYAN Investor Resilience Hackathon 2026",
      disclaimer: "MoneyGuard केवळ शैक्षणिक आर्थिक सुरक्षितता मार्गदर्शन प्रदान करते. हे गुंतवणुकीचा सल्ला किंवा शिफारसी देत नाही."
    },
    nav: {
      dashboard: "डॅशबोर्ड",
      check: "संदेश तपासा",
      explain: "आर्थिक संकल्पना",
      pause: "थांबा आणि विचार करा",
      history: "इतिहास (History)",
      safetyGuide: "सुरक्षा मार्गदर्शक",
      demoMode: "डेमो मोड"
    },
    dashboard: {
      badge: "गुंतवणूकदार लवचिकता प्रणाली (Investor Resilience)",
      heroTitle: "पैशांचे रक्षण करण्यापूर्वी स्वतःच्या निर्णयांचे रक्षण करा.",
      heroSubtitle: "संशयास्पद आर्थिक संदेश तपासा, क्लिष्ट शब्दांशिवाय संकल्पना समजून घ्या आणि दबावात निर्णय घेण्यापूर्वी ६० सेकंद शांतपणे थांबा.",
      ctaCheck: "संशयास्पद संदेश तपासा",
      ctaExplain: "संकल्पना समजून घ्या",
      ctaPause: "६० सेकंद शांत थांबा",
      modesTitle: "आर्थिक संरक्षणाचे ३ मुख्य आधार",
      modesSubtitle: "भारतीय किरकोळ गुंतवणूकदारांना फसवणूक, क्लिष्ट भाषा आणि भावनिक घाईपासून वाचवण्यासाठी विकसित.",
      cardCheck: {
        title: "MoneyGuard Check",
        tag: "डिजिटल फसवणुकीपासून संरक्षण",
        description: "पैसे पाठवण्यापूर्वी किंवा लिंकवर क्लिक करण्यापूर्वी लपलेले धोक्याचे संकेत (Red Flags) ओळखा.",
        btn: "संदेश तपासा"
      },
      cardExplain: {
        title: "MoneyGuard Explain",
        tag: "आर्थिक साक्षरता",
        description: "NAV, IPO, SIP आणि इतर क्लिष्ट आर्थिक संकल्पना दैनंदिन सोप्या उदाहरणांसह समजून घ्या.",
        btn: "MoneyGuard ला विचारा"
      },
      cardPause: {
        title: "MoneyGuard Pause",
        tag: "वर्तणूक लवचिकता",
        description: "FOMO, समूहाचा दबाव आणि नुकसानीच्या भरात घाईगडबडीने निर्णय घेण्यापूर्वी ६० सेकंद आत्मपरीक्षण करा.",
        btn: "विराम घ्या"
      },
      statsTitle: "सामान्य गुंतवणूकदारांचे रक्षण",
      stats: {
        scamsDetected: "१८+ फसवणूक नमुने",
        languages: "इंग्रजी, हिंदी, मराठी",
        coolingTime: "६० सेकंद विचार कालावधी",
        transparency: "१००% पारदर्शक स्कोअर"
      }
    },
    check: {
      title: "क्लिक करण्यापूर्वी तपासा",
      subtitle: "काही संशयास्पद वाटत आहे? तत्काळ MoneyGuard वर आणा आणि AI धोक्याचे संकेत तपासा.",
      tabs: {
        paste: "संदेश पेस्ट करा",
        screenshot: "स्क्रीनशॉट अपलोड करा",
        voice: "आवाज इनपुट (Voice)"
      },
      placeholder: "येथे संशयास्पद गुंतवणुकीचा संदेश, WhatsApp फॉरवर्ड किंवा SMS पेस्ट करा...\n\nउदाहरण:\n'५ दिवसांत पैसे दुप्पट! ४०% हमी परतावा. फक्त ३ जागा शिल्लक. आत्ताच गुंतवा: http://example.com'",
      analyzeBtn: "MoneyGuard द्वारे तपासा",
      analyzing: "संदेशाचे विश्लेषण आणि पारदर्शक रिस्क स्कोअर तयार केला जात आहे...",
      voiceHelp: "माईक बटन दाबा आणि आपला संदेश बोला.",
      screenshotHelp: "WhatsApp, Telegram, Instagram किंवा SMS चा स्क्रीनशॉट अपलोड करा.",
      extractedTextTitle: "प्रतिमेतून काढलेला मजकूर",
      extractedTextSubtitle: "विश्लेषण सुरू करण्यापूर्वी आवश्यक असल्यास मजकूर तपासा आणि संपादित करा:",
      quickTestBtn: "डेमो नमुना लोड करा",
      resultTitle: "MoneyGuard सुरक्षा विश्लेषण",
      scoreBreakdownBtn: "हा स्कोअर कसा ठरवला गेला?",
      redFlagsTitle: "आढळलेले धोक्याचे संकेत (Red Flags)",
      safeStepsTitle: "पुढील पाऊल उचलण्यापूर्वी - सुरक्षित उपाय",
      inputPrompt: "दुसरा संदेश तपासा"
    },
    explain: {
      title: "क्लिष्ट शब्दांशिवाय अर्थशास्त्र समजून घ्या",
      subtitle: "शेअर्स, म्युच्युअल फंड किंवा बाजार नियमांबद्दल काहीही विचारा. सोप्या भाषेत उत्तर मिळवा.",
      inputPlaceholder: "तुम्हाला काय समजून घ्यायचे आहे? (उदा. NAV म्हणजे काय? IPO म्हणजे काय?)",
      askBtn: "संकल्पना समजावून सांगा",
      explaining: "सोप्या भाषेत आणि दैनंदिन उदाहरणांमध्ये विश्लेषण तयार होत आहे...",
      popularTopics: "लोकप्रिय विषय",
      sections: {
        simple: "१. सोपे स्पष्टीकरण",
        analogy: "२. दैनंदिन जीवनातील साधर्म्य",
        example: "३. प्रत्यक्ष व्यवहारातील उदाहरण",
        whyMatters: "४. हे तुमच्यासाठी का महत्त्वाचे आहे",
        misunderstanding: "५. सर्वसामान्य गैरसमज"
      },
      listenVoice: "स्पष्टीकरण ऐका"
    },
    pause: {
      title: "कृती करण्यापूर्वी थांबा",
      subtitle: "दबाव किंवा भावनेच्या भरात घेतलेले आर्थिक निर्णय नुकसानीचे ठरू शकतात. ६० सेकंद शांतपणे विचार करा.",
      inputLabel: "तुम्ही कोणता आर्थिक निर्णय घेण्याच्या तयारीत आहात?",
      inputPlaceholder: "उदाहरण: 'माझ्या टेलिग्राम ग्रुपमधील सर्वजण नफा कमवत आहेत. मी उद्या यात ₹१ लाख टाकणार आहे.'",
      startBtn: "६०-सेकंदांचा विराम सुरू करा",
      signalsDetectedTitle: "आढळलेले भावनिक संकेत",
      signalsNotice: "MoneyGuard तुमच्या संदेशातील मानसशास्त्रीय नमुन्यांची नोंद घेते, कोणताही वैयक्तिक निष्कर्ष काढत नाही.",
      checkpointTitle: "६० सेकंदांचा मार्गदर्शित चेकपॉईंट",
      checkpointSubtitle: "आपला निर्णय अधिक स्पष्ट करण्यासाठी खालील ४ प्रश्नांची उत्तरे द्या:",
      nextBtn: "पुढील प्रश्न",
      prevBtn: "मागील",
      finishBtn: "आत्मपरीक्षण पूर्ण करा",
      coolingOffTitle: "निष्कर्ष सारांश आणि शांततेचा सल्ला",
      journalTitle: "माझे निर्णय जर्नल (Decision Journal)",
      journalPrompt: "हा निर्णय घेण्याचे तुमचे मुख्य कारण नोंदवून ठेवा:",
      journalSaveBtn: "जर्नलमध्ये जतन करा",
      journalSaved: "तुमच्या जर्नलमध्ये सुरक्षित जतन केले गेले!"
    },
    history: {
      title: "तुमचा MoneyGuard इतिहास",
      subtitle: "मागील स्कॅम तपासण्या, शैक्षणिक प्रश्न आणि जर्नल नोंदींचे पुनरावलोकन करा.",
      clearBtn: "सर्व इतिहास नष्ट करा",
      filterAll: "सर्व नोंदी",
      filterChecks: "स्कॅम चेक्स",
      filterExplains: "स्पष्टीकरणे",
      filterPauses: "शांत विचार सत्रे",
      emptyState: "अद्याप कोणतीही नोंद नाही. एखादा संदेश तपासून सुरुवात करा!"
    },
    safetyGuide: {
      title: "MoneyGuard सुरक्षा मार्गदर्शक",
      subtitle: "सुरक्षित आर्थिक निर्णयांसाठी १० आवश्यक सवयी",
      habits: [
        { num: 1, title: "हमीयुक्त अवास्तव परताव्यापासून सावध राहा", desc: "बाजारातील प्रत्येक गुंतवणुकीत जोखीम असते. हमीयुक्त परताव्याचे आश्वासन फसवणुकीचे पहिले लक्षण आहे." },
        { num: 2, title: "'फक्त आजच' अशा दबावाला बळी पडू नका", desc: "घाईगडबडीत निर्णय घेण्यास भाग पाडणे ही फसवणूक करणाऱ्यांची रणनीती असते." },
        { num: 3, title: "कधीही OTP, PIN किंवा पासवर्ड शेअर करू नका", desc: "कोणतीही बँक किंवा SEBI अधिकारी कधीही आपला पासवर्ड किंवा OTP मागत नाही." },
        { num: 4, title: "SEBI / RBI संकेतस्थळावर स्वतंत्र पडताळणी करा", desc: "सोशल मीडियावरील लोगोंवर विश्वास न ठेवता अधिकृत नोंदणी क्रमांक तपासा." },
        { num: 5, title: "सोशल मीडियावरील नफ्याच्या खोट्या स्क्रीनशॉटपासून दूर राहा", desc: "लोकांना आकर्षित करण्यासाठी अनेकदा भाड्याच्या गाड्या आणि खोटे नफे दाखवले जातात." },
        { num: 6, title: "इतर सर्व करत आहेत म्हणून गुंतवणूक करू नका", desc: "इतरांचे अनुकरण करणे (FOMO) हे नुकसानीचे प्रमुख कारण ठरते." },
        { num: 7, title: "उत्पादन समजून घेतल्याशिवाय पैसे लावू नका", desc: "जर तुम्हाला नफा नेमका कसा होतो हे साध्या भाषेत सांगता येत नसेल, तर पैसे गुंतवू नका." },
        { num: 8, title: "नुकसान भरून काढण्यासाठी मोठी जोखीम घेऊ नका", desc: "रागाच्या किंवा भीतीपोटी घेतलेले निर्णय नुकसान अधिक वाढवतात. शांत राहा." },
        { num: 9, title: "अनिवार्य शांतता कालावधी (Cooling-off) घ्या", desc: "मोठी गुंतवणूक करण्यापूर्वी किमान २४ तास थांबून विचार करा." },
        { num: 10, title: "विश्वास ठेवण्यापूर्वी पडताळणी करा", desc: "सावधगिरी आणि स्वतंत्र शंका हीच तुमची खरी आर्थिक ढाल आहे. थांबा, पडताळा आणि समजून घ्या." }
      ],
      scamTypesTitle: "भारतातील प्रमुख आर्थिक फसवणूक प्रकार",
      scamTypes: [
        { name: "टेलिग्राम / व्हॉट्सअॅप 'जॅकपॉट' ग्रुप्स", pattern: "अनधिकृत व्यक्ती १००% अचूकतेचा दावा करून आगाऊ व्हीआयपी शुल्क मागतात." },
        { name: "डिजिटल अरेस्ट व बनावट पोलीस धमकी", pattern: "CBI किंवा पोलिसांच्या नावाने खोटे फोन करून बेकायदेशीर पार्सलचे भय दाखवून पैसे उकळणे." },
        { name: "युट्यूब लाईक / वर्क फ्रॉम होम स्कॅम", pattern: "सुरुवातीला ₹५० देऊन नंतर क्रिप्टो मर्चंट खात्याच्या नावाखाली हजारो रुपये भरायला लावणे." },
        { name: "डब्बा ट्रेडिंग / अनधिकृत ॲप्स", pattern: "NSE/BSE बाजाराबाहेर थेट बेकायदेशीर व्यवहार करून लोकांचे पैसे बुडवणे." }
      ]
    }
  }
};
