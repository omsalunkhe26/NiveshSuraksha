import re
from typing import List, Dict, Any
from app.schemas import BehavioralSignal, ReflectionAnswer

BEHAVIORAL_SIGNALS_CONFIG = {
    "FOMO": {
        "label": {
            "en": "Fear of Missing Out (FOMO)",
            "hi": "चूक जाने का डर (FOMO)",
            "mr": "संधी हुकण्याची भीती (FOMO)"
        },
        "description": {
            "en": "Language indicates a feeling that everyone else is profiting and you might be left behind if you do not act swiftly.",
            "hi": "संदेश में यह भावना दिखाई देती है कि बाकी सब मुनाफा कमा रहे हैं और आप पीछे छूट जाएंगे।",
            "mr": "इतर सर्व नफा कमवत आहेत आणि आपण मागे पडू अशी भीती भाषेमधून दिसून येते."
        },
        "patterns": [
            r"(?i)\b(everyone\s*is\s*(making|earning|investing|buying)|making\s*money|all\s*my\s*friends|don't\s*want\s*to\s*miss|missing\s*out|before\s*it\s*goes\s*to\s*moon|skyrocket)\b",
            r"(?i)\b(सब\s*कमा\s*रहे\s*हैं|सारे\s*पैसे\s*बना\s*रहे|सारेजण\s*कमवत\s*आहेत)\b"
        ]
    },
    "SOCIAL_PRESSURE": {
        "label": {
            "en": "Social & Group Pressure",
            "hi": "सामाजिक और समूह का प्रभाव",
            "mr": "सामाजिक व समूहाचा दबाव"
        },
        "description": {
            "en": "Decision appears motivated by peer circles, Telegram/WhatsApp groups, or social media chatter rather than individual financial goals.",
            "hi": "यह निर्णय अपने स्वयं के वित्तीय लक्ष्यों के बजाय सोशल मीडिया ग्रुप या दोस्तों की बातों से प्रेरित लगता है।",
            "mr": "हा निर्णय स्वतःच्या उद्दिष्टांपेक्षा टेलिग्राम/व्हॉट्सअॅप ग्रुप किंवा इतरांच्या सांगण्यावरून घेतला जात असल्याचे दिसते."
        },
        "patterns": [
            r"(?i)\b(telegram\s*group|whatsapp\s*group|friend(s)?\s*(told|recommended|doing)|influencer\s*said|group\s*is\s*buying|reddit|forum)\b",
            r"(?i)\b(टेलीग्राम\s*ग्रुप|दोस्तों\s*ने\s*कहा|ग्रुप\s*मध्ये\s*सांगितले)\b"
        ]
    },
    "URGENCY": {
        "label": {
            "en": "Time Pressure / Urgency",
            "hi": "तात्कालिकता और जल्दबाजी",
            "mr": "तातडी आणि घाईगडबड"
        },
        "description": {
            "en": "Language indicates haste to deploy funds immediately without taking adequate time for due diligence.",
            "hi": "बिना पूरा समय लिए और बिना सोचे-समझे तुरंत पैसे लगाने की जल्दबाजी दिखाई देती है।",
            "mr": "पूर्ण विचार किंवा अभ्यास न करता तात्काळ पैसे गुंतवण्याची घाई दिसून येते."
        },
        "patterns": [
            r"(?i)\b(tomorrow|tonight|right\s*now|immediately|today\s*itself|first\s*thing\s*in\s*morning|at\s*market\s*open)\b",
            r"(?i)\b(कल\s*ही|आज\s*ही|मार्केट\s*खुलते\s*ही|उद्याच|आताच)\b"
        ]
    },
    "LOSS_CHASING": {
        "label": {
            "en": "Loss Chasing",
            "hi": "पिछले नुकसान की भरपाई की चिंता (Loss Chasing)",
            "mr": "मागील नुकसान भरून काढण्याचा ताण (Loss Chasing)"
        },
        "description": {
            "en": "Urge to take heightened risks specifically to recover from earlier financial drawdowns.",
            "hi": "पुराने नुकसान की जल्दी से भरपाई करने के लिए ज्यादा जोखिम भरा कदम उठाने की प्रवृत्ति।",
            "mr": "मागील नुकसान लवकर भरून काढण्यासाठी अधिक धोका पत्करण्याची प्रवृत्ती."
        },
        "patterns": [
            r"(?i)\b(recover\s*(my\s*)?loss(es)?|lost\s*(money|lakh|thousand|amount)|break\s*even|get\s*back\s*what\s*i\s*lost)\b",
            r"(?i)\b(नुकसान\s*की\s*भरपाई|घाटा\s*पूरा\s*करना|नुकसान\s*भरून\s*काढणे)\b"
        ]
    },
    "OVERCONFIDENCE": {
        "label": {
            "en": "Overconfidence / Certainty Bias",
            "hi": "अति-आत्मविश्वास (Overconfidence)",
            "mr": "अति-आत्मविश्वास (Overconfidence)"
        },
        "description": {
            "en": "Assuming an investment outcome is guaranteed or risk-free without stress-testing downside scenarios.",
            "hi": "यह मान लेना कि यह सौदा कभी असफल नहीं हो सकता, और नकारात्मक परिणामों की अनदेखी करना।",
            "mr": "हा व्यवहार १००% फायदेशीरच ठरेल असा गृहित धरून संभाव्य तोट्याकडे दुर्लक्ष करणे."
        },
        "patterns": [
            r"(?i)\b(can't\s*go\s*wrong|cannot\s*fail|sure\s*thing|easy\s*money|100%\s*sure|guaranteed\s*win)\b",
            r"(?i)\b(पक्का\s*फायदा|फेल\s*नहीं\s*हो\s*सकता|नक्कीच\s*जिंकणार)\b"
        ]
    },
    "IMPULSIVE_LANGUAGE": {
        "label": {
            "en": "Impulsive Capital Allocation",
            "hi": "आवेगपूर्ण निर्णय (Impulsive Decision)",
            "mr": "आवेगपूर्ण निर्णय (Impulsive Decision)"
        },
        "description": {
            "en": "Willingness to commit a substantial portion of savings in a single swift action.",
            "hi": "एक ही झटके में एक बड़ी रकम या बचत को दांव पर लगाने का आवेग।",
            "mr": "एकाच वेळी मोठी रक्कम किंवा बचत झटक्यात गुंतवण्याचा आवेग."
        },
        "patterns": [
            r"(?i)\b(putting\s*(\u20B9|rs\.?|inr)?\s*[\d,]+\s*(lakh|k|thousand|crore)?|dump\s*all|invest\s*all\s*my\s*savings|all\s*in)\b",
            r"(?i)\b(पूरा\s*पैसा\s*लगा\s*दूंगा|१\s*लाख\s*डाल\s*रहा|सारे\s*पैसे\s*टाकणार)\b"
        ]
    }
}

QUESTIONS_BY_LANG = {
    "en": [
        {
            "id": 1,
            "question": "Why are you making this decision right now?",
            "options": [
                "I researched the fundamentals independently",
                "Someone in a group / channel recommended it",
                "Everyone else seems to be doing it",
                "I don't want to miss out on the opportunity",
                "I am trying to recover a previous loss",
                "Other personal reasons"
            ]
        },
        {
            "id": 2,
            "question": "If this decision goes badly, how would it affect your day-to-day finances?",
            "options": [
                "I can comfortably handle any downside without stress",
                "It would be uncomfortable but manageable",
                "It would seriously disrupt my emergency savings or bills",
                "I haven't really considered the downside yet"
            ]
        },
        {
            "id": 3,
            "question": "Have you independently verified the source and risks from official sources?",
            "options": [
                "YES - I reviewed official filings / disclosures",
                "NO - I relied on chat messages or social posts",
                "NOT SURE - I only checked high-level claims"
            ]
        },
        {
            "id": 4,
            "question": "Would you still make this exact decision if nobody else was talking about it?",
            "options": [
                "YES - it aligns with my independent plan",
                "NO - I was primarily excited by group chatter",
                "NOT SURE - the hype definitely drew my attention"
            ]
        }
    ],
    "hi": [
        {
            "id": 1,
            "question": "आप यह फैसला अभी क्यों ले रहे हैं?",
            "options": [
                "मैंने खुद स्वतंत्र रूप से रिसर्च की है",
                "किसी ग्रुप या चैनल में इसकी सिफारिश की गई है",
                "बाकी सभी लोग ऐसा कर रहे हैं",
                "मैं मुनाफा कमाने का मौका छोड़ना नहीं चाहता (FOMO)",
                "मैं अपने पुराने नुकसान की भरपाई करने की कोशिश कर रहा हूँ",
                "अन्य व्यक्तिगत कारण"
            ]
        },
        {
            "id": 2,
            "question": "यदि यह फैसला गलत साबित हुआ, तो आपकी वित्तीय स्थिति पर क्या प्रभाव पड़ेगा?",
            "options": [
                "मैं बिना किसी तनाव के नुकसान सहन कर सकता हूँ",
                "थोड़ा असहज होगा लेकिन संभल जाएगा",
                "मेरे जरूरी खर्चों या आपातकालीन बचत पर गंभीर असर पड़ेगा",
                "मैंने अभी तक नुकसान के पहलू पर विचार नहीं किया है"
            ]
        },
        {
            "id": 3,
            "question": "क्या आपने आधिकारिक स्रोतों से इस जानकारी की स्वतंत्र पुष्टि की है?",
            "options": [
                "हाँ - मैंने आधिकारिक दस्तावेज और नियम जांचे हैं",
                "नहीं - मैंने केवल चैट संदेशों या पोस्ट पर भरोसा किया है",
                "पक्का नहीं - मैंने केवल सरसरी तौर पर देखा है"
            ]
        },
        {
            "id": 4,
            "question": "यदि कोई अन्य व्यक्ति इसके बारे में बात न कर रहा होता, तो क्या आप तब भी यह निवेश करते?",
            "options": [
                "हाँ - यह मेरी व्यक्तिगत योजना के अनुकूल है",
                "नहीं - मुझे केवल ग्रुप में चल रही चर्चा से उत्साह हुआ",
                "पक्का नहीं - चर्चा ने निश्चित रूप से मेरा ध्यान खींचा"
            ]
        }
    ],
    "mr": [
        {
            "id": 1,
            "question": "तुम्ही हा निर्णय नेमका का घेत आहात?",
            "options": [
                "मी स्वतः सखोल अभ्यास आणि पडताळणी केली आहे",
                "ग्रुप किंवा चॅनेलमध्ये कोणाकडून शिफारस केली गेली आहे",
                "इतर सर्वजण यामध्ये पैसे टाकत आहेत",
                "मला संधी गमवायची नाही (FOMO)",
                "मी मागील नुकसान भरून काढण्याचा प्रयत्न करत आहे",
                "इतर वैयक्तिक कारणे"
            ]
        },
        {
            "id": 2,
            "question": "हा निर्णय चुकला तर तुमच्या दैनंदिन आर्थिक स्थितीवर काय परिणाम होईल?",
            "options": [
                "मी कोणत्याही तणावाशिवाय नुकसान सहन करू शकतो",
                "थोडी अडचण होईल पण सांभाळून घेता येईल",
                "माझ्या दैनंदिन गरजा किंवा आणीबाणीच्या निधीवर गंभीर परिणाम होईल",
                "मी संभाव्य नुकसानीचा विचारच केलेला नाही"
            ]
        },
        {
            "id": 3,
            "question": "तुम्ही अधिकृत स्त्रोतांकडून या माहितीची स्वतंत्र पडताळणी केली आहे का?",
            "options": [
                "होय - मी अधिकृत कागदपत्रे व नोंदी तपासल्या आहेत",
                "नाही - मी फक्त सोशल मीडिया किंवा चॅटवर विश्वास ठेवला आहे",
                "नक्की नाही - मी फक्त वरवर माहिती पाहिली आहे"
            ]
        },
        {
            "id": 4,
            "question": "इतर कोणीही याबद्दल बोलत नसते, तरीही तुम्ही हा निर्णय घेतला असता का?",
            "options": [
                "होय - हे माझ्या स्वतंत्र उद्दिष्टांशी सुसंगत आहे",
                "नाही - मी फक्त ग्रुपमधील उत्साहामुळे प्रभावित झालो",
                "नक्की नाही - ग्रुपमधील चर्चेमुळेच माझे लक्ष गेले"
            ]
        }
    ]
}

class BehavioralEngine:
    @staticmethod
    def detect_signals(intention_text: str, lang: str = "en") -> List[BehavioralSignal]:
        """
        Extract behavioral signals with supportive non-judgmental language.
        """
        detected = []
        normalized_text = intention_text.strip()

        for sig_key, config in BEHAVIORAL_SIGNALS_CONFIG.items():
            matched_snippets = []
            for pattern in config["patterns"]:
                matches = re.finditer(pattern, normalized_text)
                for m in matches:
                    matched_snippets.append(m.group(0).strip())

            if matched_snippets:
                label = config["label"].get(lang, config["label"]["en"])
                desc = config["description"].get(lang, config["description"]["en"])
                phrase = ", ".join(list(dict.fromkeys(matched_snippets))[:2])
                detected.append(
                    BehavioralSignal(
                        type=sig_key,
                        label=label,
                        severity="MEDIUM" if len(matched_snippets) == 1 else "HIGH",
                        detected_phrase=phrase,
                        description=desc
                    )
                )

        return detected

    @classmethod
    def analyze_intention(cls, intention_text: str, lang: str = "en") -> Dict[str, Any]:
        signals = cls.detect_signals(intention_text, lang=lang)
        
        # Determine emotional charge
        if len(signals) >= 3:
            emotional_charge = "INTENSE"
        elif len(signals) >= 2:
            emotional_charge = "HIGH"
        elif len(signals) == 1:
            emotional_charge = "MEDIUM"
        else:
            emotional_charge = "LOW"

        # Non-judgmental supportive observation
        if signals:
            signal_names = ", ".join([s.label for s in signals])
            if lang == "hi":
                observation = f"आपके संदेश में {signal_names} से जुड़े कुछ संकेत दिखाई दे रहे हैं। कोई भी कदम उठाने से पहले 60 सेकंड रुककर विचार करें।"
            elif lang == "mr":
                observation = f"तुमच्या संदेशात {signal_names} शी संबंधित काही संकेत दिसत आहेत. कोणताही निर्णय घेण्यापूर्वी ६० सेकंद शांतपणे विचार करा."
            else:
                observation = f"Your message contains patterns associated with {signal_names}. Taking a quick 60-second reflection can help ground your decision."
        else:
            if lang == "hi":
                observation = "आपका संदेश संतुलित लगता है। फिर भी वित्तीय प्रतिबद्धता से पहले 60 सेकंड का चेकपॉइंट लेना हमेशा सुरक्षित होता है।"
            elif lang == "mr":
                observation = "तुमचा संदेश संतुलित वाटतो. तरीही मोठा आर्थिक निर्णय घेण्यापूर्वी ६० सेकंदांचा चेकपॉइंट घेणे फायदेशीर ठरते."
            else:
                observation = "Your message appears relatively measured. A 60-second checkpoint helps ensure your decision aligns with your long-term plan."

        questions = QUESTIONS_BY_LANG.get(lang, QUESTIONS_BY_LANG["en"])

        return {
            "intention_text": intention_text,
            "language": lang,
            "signals_detected": signals,
            "overall_emotional_charge": emotional_charge,
            "gentle_observation": observation,
            "checkpoint_questions": questions
        }

    @staticmethod
    def evaluate_cooling_off(
        intention_text: str,
        signals: List[BehavioralSignal],
        answers: List[ReflectionAnswer],
        lang: str = "en"
    ) -> Dict[str, Any]:
        """
        Synthesizes the reflection results into a supportive summary without recommending buy/sell.
        """
        fomo_flag = any(s.type in ["FOMO", "SOCIAL_PRESSURE"] for s in signals)
        unverified_flag = any(
            "NO" in ans.selected_option or "NOT SURE" in ans.selected_option
            for ans in answers if ans.question_id == 3
        )
        high_impact_flag = any(
            "seriously" in ans.selected_option.lower() or "गंभीर" in ans.selected_option
            for ans in answers if ans.question_id == 2
        )

        if lang == "hi":
            summary_points = [
                "आपकी प्रतिक्रियाओं से पता चलता है कि यह निर्णय सामाजिक चर्चा या जल्दबाजी से प्रभावित हो सकता है।" if fomo_flag else "आपने अपनी सोच को स्पष्ट रूप से परखा है।",
                "चूंकि जानकारी अभी पूरी तरह स्वतंत्र रूप से जांची नहीं गई है, इसलिए सीधे पैसे लगाने से पहले आधिकारिक विवरण देखना सुरक्षित होगा।" if unverified_flag else "आपने स्वतंत्र रूप से जांच की पुष्टि की है, जो एक अच्छी आदत है।",
                "यह राशि आपकी वित्तीय स्थिति के लिए महत्वपूर्ण है; इसलिए 24 घंटे का कूलिंग-ऑफ समय लेना समझदारी होगी।" if high_impact_flag else "अपनी जोखिम क्षमता का ध्यान रखें।"
            ]
            recommendation_note = "MoneyGuard सुझाव देता है कि किसी भी वित्तीय लेनदेन से पहले कम से कम कुछ घंटे रुकें, शांत दिमाग से सोचें और किसी निष्पक्ष सलाहकार से चर्चा करें।"
        elif lang == "mr":
            summary_points = [
                "तुमच्या उत्तरांवरून हा निर्णय समूहातील चर्चा किंवा घाईगडबडीने प्रभावित असू शकतो असे दिसते." if fomo_flag else "तुम्ही तुमच्या विचारांची योग्य मांडणी केली आहे.",
                "माहितीची स्वतंत्र पडताळणी झालेली नसल्यास, थेट रक्कम गुंतवण्यापूर्वी अधिकृत नोंदी तपासणे हितकारक ठरेल." if unverified_flag else "स्वतंत्र पडताळणी करणे ही एक उत्तम सवय आहे.",
                "ही रक्कम तुमच्यासाठी महत्त्वाची असल्याने, २४ तासांचा शांततेचा कालावधी (Cooling-off) घेणे शहाणपणाचे ठरेल." if high_impact_flag else "नेहमी स्वतःच्या जोखीम क्षमतेनुसारच निर्णय घ्या."
            ]
            recommendation_note = "MoneyGuard सुचवते की कोणताही व्यवहार करण्यापूर्वी शांतपणे विचार करा आणि घाईत पैसे गुंतवणे टाळा."
        else:
            summary_points = [
                "Your responses suggest this decision may be influenced by group momentum and social anticipation." if fomo_flag else "You have taken time to reflect on your primary motivation.",
                "As the information has not been fully verified via independent primary sources, taking time to review official disclosures is strongly suggested." if unverified_flag else "Independent verification is an excellent financial habit.",
                "Because an adverse outcome would create financial strain, enforcing a 24-hour cooling-off window can protect your peace of mind." if high_impact_flag else "Keep your risk appetite front of mind."
            ]
            recommendation_note = "Consider taking a brief pause (e.g. 24 hours) before transferring any funds. A sound financial opportunity will still be sound tomorrow."

        return {
            "cooling_off_summary": " ".join(summary_points),
            "recommendation_note": recommendation_note
        }
