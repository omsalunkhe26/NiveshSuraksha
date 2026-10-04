"""
Multilingual helper for MoneyGuard (English, Hindi, Marathi).
Provides native natural translations and explanations without awkward literal machine translation.
"""

TRANSLATIONS = {
    "en": {
        "risk_levels": {
            "LOW": "LOW RISK",
            "MEDIUM": "MEDIUM RISK",
            "HIGH": "HIGH RISK",
            "CRITICAL": "CRITICAL RISK"
        },
        "headlines": {
            "CRITICAL": "Critical warning signs detected!",
            "HIGH": "Multiple warning signs detected.",
            "MEDIUM": "Some warning signs detected.",
            "LOW": "No obvious scam patterns detected."
        },
        "subheadings": {
            "CRITICAL": "This content contains severe indicators commonly associated with financial fraud. Exercise extreme caution.",
            "HIGH": "This content contains patterns that deserve independent verification before you take action.",
            "MEDIUM": "Some claims appear exaggerated or unverified. Verify details independently before proceeding.",
            "LOW": "While no overt scam flags were found, always verify before making financial transactions."
        },
        "safe_steps": [
            "🛑 Don't transfer money yet.",
            "🛑 Don't share OTPs, PINs, bank details, or passwords.",
            "🛑 Don't click unknown or shortened links.",
            "🔍 Independently verify the sender on official regulator websites (e.g. SEBI / RBI).",
            "📄 Check official company or fund documentation before committing any money."
        ],
        "cooling_off_titles": {
            "high": "TAKE A MOMENT TO PAUSE",
            "medium": "A QUICK CHECKPOINT",
            "low": "REFLECT & VERIFY"
        },
        "disclaimer": "MoneyGuard provides educational financial safety guidance. It does not provide investment advice or recommendations."
    },
    "hi": {
        "risk_levels": {
            "LOW": "कम जोखिम (LOW RISK)",
            "MEDIUM": "मध्यम जोखिम (MEDIUM RISK)",
            "HIGH": "उच्च जोखिम (HIGH RISK)",
            "CRITICAL": "गंभीर जोखिम (CRITICAL RISK)"
        },
        "headlines": {
            "CRITICAL": "गंभीर चेतावनी के संकेत पाए गए!",
            "HIGH": "कई चेतावनी के संकेत (Red Flags) मिले हैं।",
            "MEDIUM": "कुछ संदिग्ध संकेत मिले हैं।",
            "LOW": "कोई स्पष्ट धोखाधड़ी का संकेत नहीं मिला।"
        },
        "subheadings": {
            "CRITICAL": "इस संदेश में वित्तीय धोखाधड़ी से जुड़े गंभीर संकेत हैं। कोई भी कदम उठाने से पहले तुरंत रुकें।",
            "HIGH": "इस संदेश में ऐसे पैटर्न हैं जिन्हें कोई भी कदम उठाने से पहले स्वतंत्र रूप से जांचना बेहद जरूरी है।",
            "MEDIUM": "कुछ दावे बढ़ा-चढ़ाकर किए गए लगते हैं। आगे बढ़ने से पहले विवरण की स्वतंत्र पुष्टि करें।",
            "LOW": "यद्यपि कोई स्पष्ट धोखाधड़ी नहीं मिली, फिर भी वित्तीय लेन-देन से पहले हमेशा सावधानी बरतें।"
        },
        "safe_steps": [
            "🛑 अभी कोई पैसा ट्रांसफर न करें।",
            "🛑 कभी भी OTP, PIN, बैंक विवरण या पासवर्ड साझा न करें।",
            "🛑 अज्ञात या संदिग्ध लिंक पर क्लिक न करें।",
            "🔍 आधिकारिक नियामक वेबसाइटों (जैसे SEBI / RBI) पर प्रेषक की स्वतंत्र जांच करें।",
            "📄 कोई भी निर्णय लेने से पहले आधिकारिक दस्तावेजों और स्रोतों की पुष्टि करें।"
        ],
        "cooling_off_titles": {
            "high": "एक पल रुकें और सोचें (TAKE A MOMENT)",
            "medium": "एक त्वरित समीक्षा (A QUICK CHECKPOINT)",
            "low": "पुष्टि करें और विचार करें"
        },
        "disclaimer": "MoneyGuard केवल वित्तीय सुरक्षा और जागरूकता मार्गदर्शन प्रदान करता है। यह निवेश सलाह या सिफारिशें नहीं देता है।"
    },
    "mr": {
        "risk_levels": {
            "LOW": "कमी धोका (LOW RISK)",
            "MEDIUM": "मध्यम धोका (MEDIUM RISK)",
            "HIGH": "उच्च धोका (HIGH RISK)",
            "CRITICAL": "गंभीर धोका (CRITICAL RISK)"
        },
        "headlines": {
            "CRITICAL": "अत्यंत गंभीर धोक्याचे संकेत आढळले आहेत!",
            "HIGH": "अनेक धोक्याचे संकेत (Red Flags) आढळले आहेत.",
            "MEDIUM": "काही संशयास्पद बाबी आढळल्या आहेत.",
            "LOW": "कोणतीही स्पष्ट फसवणूक आढळली नाही."
        },
        "subheadings": {
            "CRITICAL": "या मजकुरात आर्थिक फसवणुकीशी संबंधित गंभीर नमुने आहेत. कृपया अत्यंत सावधगिरी बाळगा.",
            "HIGH": "या मजकुरात असे नमुने आहेत ज्यांची कोणतीही कृती करण्यापूर्वी स्वतंत्रपणे पडताळणी करणे आवश्यक आहे.",
            "MEDIUM": "काही दावे अतिशयोक्तीपूर्ण वाटत आहेत. पुढे जाण्यापूर्वी स्वतंत्रपणे खात्री करा.",
            "LOW": "जरी कोणताही स्पष्ट धोका आढळला नसला तरी, कोणताही आर्थिक व्यवहार करण्यापूर्वी नेहमी काळजी घ्या."
        },
        "safe_steps": [
            "🛑 आत्ताच कोणतेही पैसे ट्रान्सफर करू नका.",
            "🛑 कधीही OTP, PIN, बँक तपशील किंवा पासवर्ड कोणाशीही शेअर करू नका.",
            "🛑 अज्ञात किंवा संशयास्पद लिंक्सवर क्लिक करू नका.",
            "🔍 अधिकृत नियामक संकेतस्थळांवर (उदा. SEBI / RBI) प्रेषकाची स्वतंत्र पडताळणी करा.",
            "📄 कोणतेही पैसे गुंतवण्यापूर्वी अधिकृत कागदपत्रे आणि अधिकृत माहिती तपासा."
        ],
        "cooling_off_titles": {
            "high": "एक क्षण थांबा आणि विचार करा (TAKE A MOMENT)",
            "medium": "एक छोटा चेकपॉईंट",
            "low": "पडताळणी करा आणि विचार करा"
        },
        "disclaimer": "MoneyGuard केवळ शैक्षणिक आर्थिक सुरक्षितता मार्गदर्शन प्रदान करते. हे गुंतवणुकीचा सल्ला किंवा शिफारसी देत नाही."
    }
}

def get_text(key: str, lang: str = "en", subkey: str = None) -> Any:
    lang_dict = TRANSLATIONS.get(lang, TRANSLATIONS["en"])
    if subkey and key in lang_dict and isinstance(lang_dict[key], dict):
        return lang_dict[key].get(subkey, TRANSLATIONS["en"][key].get(subkey, ""))
    return lang_dict.get(key, TRANSLATIONS["en"].get(key, ""))
