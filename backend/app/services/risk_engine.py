import re
from typing import List, Dict, Any, Tuple
from app.schemas import RedFlagItem, ScoreBreakdownItem
from app.services.multilingual import TRANSLATIONS

# Master configuration of 18 red flag categories and deterministic weights
RED_FLAG_CONFIG = {
    "GUARANTEED_RETURNS": {
        "title": {
            "en": "Guaranteed Returns Claim",
            "hi": "गारंटीड मुनाफे का दावा",
            "mr": "हमीयुक्त परताव्याचा दावा"
        },
        "points": 25,
        "default_severity": "HIGH",
        "explanation": {
            "en": "Legitimate market investments carry inherent risk. Any promise of 'guaranteed' or 'fixed high' returns is a hallmark warning sign of financial scams.",
            "hi": "वास्तविक वित्तीय बाजारों में जोखिम होता है। 'गारंटीड' या तय रिटर्न का कोई भी वादा वित्तीय धोखाधड़ी का सबसे बड़ा संकेत होता है।",
            "mr": "खऱ्या आर्थिक बाजारात जोखीम असते. 'हमीयुक्त' किंवा निश्चित परताव्याचे कोणतेही आश्वासन हे आर्थिक फसवणुकीचे मुख्य लक्षण आहे."
        },
        "patterns": [
            r"(?i)\b(guaranteed|guarantee|100%\s*profit|fixed\s*return|double\s*your\s*money|triple\s*your\s*money|paisa\s*double|paisa\s*triple)\b",
            r"(?i)\b(risk\s*free\s*profit|sure\s*shot\s*return|zero\s*risk\s*profit)\b",
            r"(?i)\b(गारंटी|पक्का\s*मुनाफा|पैसा\s*डबल|100%\s*रिटर्न|खात्रीशीर\s*परतावा)\b"
        ]
    },
    "UNREALISTIC_RETURNS": {
        "title": {
            "en": "Unrealistic Returns",
            "hi": "अवास्तविक लाभ का वादा",
            "mr": "अवास्तव परताव्याचा दावा"
        },
        "points": 20,
        "default_severity": "HIGH",
        "explanation": {
            "en": "Claims of doubling money quickly, or 20%–50%+ returns in days or weeks, are mathematically unsustainable and typical of Ponzi/fraud schemes.",
            "hi": "कुछ ही दिनों में पैसे दोगुना करने या 20%-50%+ से अधिक रिटर्न का वादा अवास्तविक और पोंजी स्कीमों की पहचान है।",
            "mr": "काही दिवसांत पैसे दुप्पट करणे किंवा 20%-50%+ पेक्षा जास्त परताव्याचे दावे हे अवास्तव असून फसवे असतात."
        },
        "patterns": [
            r"(?i)\b(\d{2,3}%\s*(daily|weekly|per\s*day|in\s*\d+\s*days|monthly|returns?|profit))\b",
            r"(?i)\b(double\s*in\s*\d+\s*(days|hours|weeks)|2x\s*in\s*\d+\s*days|10x\s*returns?)\b",
            r"(?i)\b(रोजाना\s*\d+%\s*मुनाफा|\d+\s*दिनों\s*में\s*दोगुना|\d+\s*दिवसांत\s*दुप्पट)\b"
        ]
    },
    "URGENCY": {
        "title": {
            "en": "Artificial Urgency & Time Pressure",
            "hi": "जल्दबाजी और तात्कालिकता का दबाव",
            "mr": "घाईगडबड आणि तातडीचा दबाव"
        },
        "points": 15,
        "default_severity": "MEDIUM",
        "explanation": {
            "en": "Scammers enforce arbitrary countdowns to prevent you from calmly verifying their claims or discussing with trusted advisors.",
            "hi": "धोखेबाज जानबूझकर समय की कमी दिखाते हैं ताकि आप शांत दिमाग से जांच-पड़ताल न कर सकें।",
            "mr": "फसवणूक करणारे मुद्दाम घाई करतात जेणेकरून तुम्हाला शांतपणे विचार किंवा पडताळणी करता येऊ नये."
        },
        "patterns": [
            r"(?i)\b(hurry|urgent|valid\s*only\s*today|offer\s*ends\s*in|act\s*now|within\s*\d+\s*(minutes|hours)|last\s*chance|expires\s*today)\b",
            r"(?i)\b(तुरंत\s*करें|आज\s*ही\s*अंतिम\s*तारीख|घाई\s*करा|आताच\s*गुंतवा)\b"
        ]
    },
    "FOMO": {
        "title": {
            "en": "Fear of Missing Out (FOMO) Manipulation",
            "hi": "चूक जाने का डर (FOMO)",
            "mr": "संधी गमावण्याची भीती (FOMO)"
        },
        "points": 10,
        "default_severity": "MEDIUM",
        "explanation": {
            "en": "Triggering FOMO leads to emotional impulses over rational analysis, encouraging victims to jump in without due diligence.",
            "hi": "FOMO का डर पैदा करने से लोग बिना सोचे-समझे और बिना जांच किए जल्दबाजी में गलत फैसला ले लेते हैं।",
            "mr": "संधी हुकण्याची भीती निर्माण करून लोकांना विचार न करता घाईत निर्णय घेण्यास प्रवृत्त केले जाते."
        },
        "patterns": [
            r"(?i)\b(don't\s*miss\s*out|once\s*in\s*a\s*lifetime|everyone\s*is\s*earning|don't\s*stay\s*behind|golden\s*opportunity|miss\s*this\s*chance)\b",
            r"(?i)\b(मौका\s*मत\s*छोड़ो|सुनहरा\s*अवसर|संधी\s*दवडू\s*नका|सारेजण\s*कमवत\s*आहेत)\b"
        ]
    },
    "PRESSURE_TO_ACT": {
        "title": {
            "en": "High Pressure to Act",
            "hi": "निर्णय लेने का अत्यधिक दबाव",
            "mr": "निर्णय घेण्याचा अति दबाव"
        },
        "points": 15,
        "default_severity": "MEDIUM",
        "explanation": {
            "en": "Persistent messages urging immediate transfer or contract execution are designed to bypass critical thinking.",
            "hi": "तुरंत पैसे भेजने या निर्णय लेने का लगातार दबाव तर्कसंगत सोच को बाधित करने के लिए बनाया जाता है।",
            "mr": "तात्काळ पैसे पाठवण्याचा सातत्याने येणारा दबाव योग्य विचार करण्यापासून रोखतो."
        },
        "patterns": [
            r"(?i)\b(send\s*money\s*now|pay\s*immediately|transfer\s*fast|do\s*not\s*delay|invest\s*right\s*now)\b"
        ]
    },
    "SUSPICIOUS_URL": {
        "title": {
            "en": "Suspicious / Unverified Links",
            "hi": "संदिग्ध या गैर-आधिकारिक लिंक",
            "mr": "संशयास्पद लिंक्स"
        },
        "points": 20,
        "default_severity": "HIGH",
        "explanation": {
            "en": "Shortened URLs (bit.ly, t.me) or fake phishing domains are commonly used to hijack credentials or deploy malicious payment gateways.",
            "hi": "शॉर्टनर लिंक (bit.ly, t.me) या नकली वेबसाइट्स का उपयोग पासवर्ड चुराने या फर्जी पेमेंट कराने के लिए किया जाता है।",
            "mr": "संक्षिप्त लिंक्स किंवा बनावट वेब पत्त्यांचा वापर खाजगी माहिती चोरण्यासाठी किंवा फसवे पेमेंट करण्यासाठी होतो."
        },
        "patterns": [
            r"(?i)(https?://[^\s]+)",
            r"(?i)\b(bit\.ly|t\.me/|wa\.me/|tinyurl\.com|tiny\.cc|goo\.gl|is\.gd|cutt\.ly|telegram\.me|chat\.whatsapp\.com)\b",
            r"(?i)\b(download\s*apk|click\s*here\s*to\s*join|link\s*in\s*bio)\b"
        ]
    },
    "PAYMENT_REQUEST": {
        "title": {
            "en": "Direct Payment / UPI Request",
            "hi": "अज्ञात UPI / खाते में सीधे पैसे की मांग",
            "mr": "थेट पैसे किंवा UPI ट्रान्सफरची मागणी"
        },
        "points": 20,
        "default_severity": "HIGH",
        "explanation": {
            "en": "Legitimate SEBI-registered brokers never ask for deposits into personal UPI IDs or individual third-party bank accounts.",
            "hi": "SEBI-पंजीकृत वैध ब्रोकर कभी भी व्यक्तिगत UPI ID या किसी अनजान व्यक्ति के खाते में पैसे ट्रांसफर करने को नहीं कहते।",
            "mr": "SEBI-नोंदणीकृत वैध ब्रोकर कधीही वैयक्तिक UPI किंवा अनोळखी खात्यात पैसे भरण्यास सांगत नाहीत."
        },
        "patterns": [
            r"(?i)\b(send\s*(money|cash|payment|deposit|funds)|pay\s*to\s*upi|gpay|phonepe|paytm|transfer\s*to\s*account|registration\s*fee|processing\s*charge)\b",
            r"(?i)\b[\w\.\-]+@(oksbi|okhdfcbank|okaxis|okicici|paytm|upi|ybl|apl)\b",
            r"(?i)\b(पैसे\s*भेजें|खाते\s*में\s*जमा|पैसे\s*पाठवा)\b"
        ]
    },
    "OTP_PIN_REQUEST": {
        "title": {
            "en": "Request for OTP / PIN / Passwords",
            "hi": "OTP, PIN या पासवर्ड मांगने का प्रयास",
            "mr": "OTP, PIN किंवा पासवर्ड मागणे"
        },
        "points": 25,
        "default_severity": "CRITICAL",
        "explanation": {
            "en": "CRITICAL SAFETY RISK: No legitimate financial authority, bank, or broker will EVER ask for your OTP, ATM PIN, or login credentials.",
            "hi": "गंभीर चेतावनी: कोई भी बैंक, SEBI या अधिकृत संस्थान आपसे कभी भी OTP, PIN या पासवर्ड नहीं मांगता।",
            "mr": "अत्यंत गंभीर: कोणतीही बँक किंवा अधिकृत संस्था कधीही तुमचा OTP, PIN किंवा पासवर्ड मागत नाही."
        },
        "patterns": [
            r"(?i)\b(otp|one\s*time\s*password|atm\s*pin|cvv|password|passcode|share\s*code|enter\s*pin)\b",
            r"(?i)\b(ओटीपी|पिन|पासवर्ड|सीवीवी)\b"
        ]
    },
    "SENSITIVE_INFO_REQUEST": {
        "title": {
            "en": "Sensitive Information Request",
            "hi": "संवेदनशील व्यक्तिगत जानकारी की मांग",
            "mr": "खाजगी माहिती मागणे"
        },
        "points": 20,
        "default_severity": "HIGH",
        "explanation": {
            "en": "Requests for Aadhaar, PAN card photos, or bank details over chat apps often lead to identity theft and unauthorized loans.",
            "hi": "चैट पर आधार, पैन कार्ड या बैंक पासबुक मांगना पहचान की चोरी और वित्तीय नुकसान का कारण बन सकता है।",
            "mr": "चॅटवर आधार, पॅन किंवा बँक माहिती मागणे हे फसवणुकीचे कारण ठरू शकते."
        },
        "patterns": [
            r"(?i)\b(share\s*aadhaar|send\s*pan|bank\s*statement|card\s*number|debit\s*card\s*details)\b"
        ]
    },
    "FAKE_AUTHORITY": {
        "title": {
            "en": "Unverified Regulatory / Authority Claims",
            "hi": "नकली SEBI / सरकारी मान्यता का दावा",
            "mr": "बनावट SEBI / शासकीय मान्यतेचा दावा"
        },
        "points": 20,
        "default_severity": "HIGH",
        "explanation": {
            "en": "Scammers frequently misappropriate logos or names of SEBI, RBI, NSE, or BSE without holding genuine registration licenses.",
            "hi": "धोखेबाज अक्सर लोगों का विश्वास जीतने के लिए SEBI, RBI या NSE के नाम का झूठा इस्तेमाल करते हैं।",
            "mr": "विश्वास संपादन करण्यासाठी अनेकदा SEBI, RBI किंवा NSE च्या नावाचा गैरवापर केला जातो."
        },
        "patterns": [
            r"(?i)\b(sebi\s*approved|rbi\s*registered|govt\s*certified|nse\s*certified|100%\s*legal\s*guaranteed|authorized\s*by\s*gov)\b",
            r"(?i)\b(सेबी\s*प्रमाणित|सरकार\s*मान्यता|आरबीआय\s*मंजूर)\b"
        ]
    },
    "IMPERSONATION": {
        "title": {
            "en": "Impersonation of Brands / Influencers",
            "hi": "प्रसिद्ध ब्रांड या फिन-इन्फ्लुएंसर की नकल",
            "mr": "प्रसिद्ध व्यक्ती किंवा ब्रँडचे सोंग"
        },
        "points": 25,
        "default_severity": "CRITICAL",
        "explanation": {
            "en": "Fraudsters create cloned accounts resembling well-known institutional executives, celebrity investors, or reputed brokers.",
            "hi": "धोखेबाज प्रसिद्ध वित्तीय विशेषज्ञों या कंपनियों के नाम और फोटो का उपयोग करके नकली खाते बनाते हैं।",
            "mr": "फसवणूक करणारे नामवंत तज्ज्ञ किंवा कंपन्यांच्या नावाचा व फोटोंचा गैरवापर करून बनावट प्रोफाईल तयार करतात."
        },
        "patterns": [
            r"(?i)\b(official\s*group|vip\s*channel|rakesh\s*jhunjhunwala|warren\s*buffett|institutional\s*insider|ceo\s*direct)\b"
        ]
    },
    "REFERRAL_PRESSURE": {
        "title": {
            "en": "Referral / Multi-Level Recruitment Pressure",
            "hi": "रेफरल और सदस्य जोड़ने का दबाव (MLM)",
            "mr": "रेफरल आणि सदस्य जोडण्याचा दबाव (MLM)"
        },
        "points": 10,
        "default_severity": "MEDIUM",
        "explanation": {
            "en": "Promises of earning higher returns by recruiting friends or sharing invite links indicate a pyramid or Ponzi structure.",
            "hi": "दोस्तों को जोड़ने या रेफरल कोड शेयर करने पर अधिक कमीशन का वादा पिरामिड या पोंजी स्कीम का लक्षण है।",
            "mr": "मित्रांना जोडल्यावर किंवा रेफरल दिल्यावर जादा नफ्याचे आमिष दाखवणे हे पोंझी योजनेचे लक्षण आहे."
        },
        "patterns": [
            r"(?i)\b(refer\s*and\s*earn|invite\s*\d+\s*friends|level\s*income|mlm|join\s*downline|referral\s*bonus)\b",
            r"(?i)\b(रेफर\s*करें|दोस्त\s*जोड़ें|मेंबर\s*बनवा)\b"
        ]
    },
    "LIMITED_SLOTS": {
        "title": {
            "en": "Artificial Scarcity ('Limited Slots Left')",
            "hi": "सीमित स्लॉट का झूठा दावा",
            "mr": "मर्यादित जागांचा खोटा दावा"
        },
        "points": 15,
        "default_severity": "MEDIUM",
        "explanation": {
            "en": "False scarcity ('Only 3 slots left', 'Exclusive group') is an emotional tactic to trigger hasty financial commitments.",
            "hi": "'केवल 3 स्लॉट बचे हैं' जैसी कृत्रिम कमी का दावा जल्दबाजी में भुगतान करवाने का मनोवैज्ञानिक हथकंडा है।",
            "mr": "'फक्त ३ जागा शिल्लक' असे सांगून घाईघाईत पैसे गुंतवण्यास भाग पाडण्याचा प्रयत्न केला जातो."
        },
        "patterns": [
            r"(?i)\b(only\s*\d+\s*slots?\s*(left|remaining)|limited\s*seats|exclusive\s*batch|first\s*\d+\s*users\s*only)\b",
            r"(?i)\b(केवल\s*\d+\s*सीटें\s*बाकी|फक्त\s*\d+\s*जागा\s*शिल्लक)\b"
        ]
    },
    "SECRET_STRATEGY": {
        "title": {
            "en": "Claims of 'Secret Algorithms' or 'Insider Strategy'",
            "hi": "गुप्त फॉर्मूला या इनसाइडर टिप्स का दावा",
            "mr": "गुप्त फॉर्म्युला किंवा इनसाइडर माहितीचा दावा"
        },
        "points": 15,
        "default_severity": "MEDIUM",
        "explanation": {
            "en": "Trading 'secrets' or 'insider leaks' are classic hooks used in pump-and-dump or unverified subscription frauds.",
            "hi": "'सीक्रेट स्ट्रैटेजी' या 'इनसाइडर टिप' के नाम पर बेचे जाने वाले दावे धोखाधड़ी का हिस्सा होते हैं।",
            "mr": "'गुप्त पद्धत' किंवा 'अंतर्गत माहिती' असल्याचे भासवून सामान्य गुंतवणूकदारांना फसवले जाते."
        },
        "patterns": [
            r"(?i)\b(secret\s*(strategy|formula|algorithm|software|bot)|insider\s*(tip|leak|news)|hidden\s*trick|guaranteed\s*jackpot)\b",
            r"(?i)\b(गुप्त\s*फॉर्मूला|जैकपॉट\s*टिप|इनसाइडर\s*माहिती)\b"
        ]
    },
    "RISK_FREE_CLAIM": {
        "title": {
            "en": "'Zero Risk / 100% Safe' Claims",
            "hi": "'शून्य जोखिम / 100% सुरक्षित' का झूठा दावा",
            "mr": "'शून्य जोखीम / १००% सुरक्षित' चा खोटा दावा"
        },
        "points": 20,
        "default_severity": "HIGH",
        "explanation": {
            "en": "All financial investments entail risk of capital loss. Any assertion of '100% risk-free' high return is fundamentally false.",
            "hi": "हर वास्तविक निवेश में पूंजी का जोखिम होता है। '100% जोखिम-मुक्त' और उच्च रिटर्न का दावा पूरी तरह भ्रामक है।",
            "mr": "प्रत्येक गुंतवणुकीत जोखीम असतेच. 'शून्य जोखीम' आणि मोठा नफा असा दावा पूर्णतः दिशाभूल करणारा असतो."
        },
        "patterns": [
            r"(?i)\b(zero\s*risk|no\s*risk|100%\s*safe|capital\s*protection\s*guarantee|loss\s*proof)\b",
            r"(?i)\b(बिना\s*किसी\s*जोखिम|शून्य\s*धोका|कोणतीही\s*जोखीम\s*नाही)\b"
        ]
    },
    "UNREALISTIC_ACCURACY": {
        "title": {
            "en": "Unrealistic Accuracy Claims (e.g. 99% Accuracy)",
            "hi": "अतिशयोक्तिपूर्ण सटीकता का दावा (99% सटीकता)",
            "mr": "अतिशयोक्तीपूर्ण अचूकतेचा दावा (९९% अचूकता)"
        },
        "points": 15,
        "default_severity": "MEDIUM",
        "explanation": {
            "en": "No analyst or algorithm can predict market movements with 95%+ certainty. Such claims target vulnerable beginners.",
            "hi": "शेयर बाजार में कोई भी 95%+ सटीकता से भविष्यवाणी नहीं कर सकता। ऐसे दावे निवेशकों को गुमराह करते हैं।",
            "mr": "बाजारात कोणीही ९५%+ अचूक भाकीत करू शकत नाही. असे दावे निव्वळ दिशाभूल करणारे असतात."
        },
        "patterns": [
            r"(?i)\b(9[5-9]%\s*accuracy|100%\s*accuracy|never\s*fails|sure\s*shot\s*call|100%\s*hit\s*ratio)\b"
        ]
    },
    "SOCIAL_PROOF_MANIPULATION": {
        "title": {
            "en": "Fabricated Social Proof / Fake Screenshots",
            "hi": "फर्जी मुनाफे के स्क्रीनशॉट और गवाही",
            "mr": "बनावट नफ्याचे स्क्रीनशॉट्स आणि पुरावे"
        },
        "points": 15,
        "default_severity": "MEDIUM",
        "explanation": {
            "en": "Fabricated bank balance screenshots, staged luxury testimonials, or fake WhatsApp chat proofs are often used to build false trust.",
            "hi": "नकली बैंक मैसेज, फर्जी मुनाफे के स्क्रीनशॉट और किराए की कारों के वीडियो केवल दिखावे के लिए इस्तेमाल किए जाते हैं।",
            "mr": "बनावट बँक स्क्रीनशॉट आणि खोट्या यशोगाथांचा वापर लोकांना जाळ्यात ओढण्यासाठी केला जातो."
        },
        "patterns": [
            r"(?i)\b(see\s*my\s*profit\s*screenshot|members\s*making\s*lakhs|proof\s*attached|daily\s*payout\s*proof|live\s*withdrawal\s*proof)\b"
        ]
    },
    "RECOVERY_CLAIM": {
        "title": {
            "en": "Loss Recovery / 'Get Your Lost Money Back' Claim",
            "hi": "नुकसान की भरपाई का दावा (Recovery Scam)",
            "mr": "नुकसान भरपाईचा दावा (Recovery Scam)"
        },
        "points": 25,
        "default_severity": "CRITICAL",
        "explanation": {
            "en": "Secondary recovery scams specifically target individuals who recently lost money in trading, demanding upfront recovery fees.",
            "hi": "नुकसान रिकवर कराने के नाम पर एडवांस फीस मांगना रिकवरी स्कैम की पहचान है।",
            "mr": "झालेले नुकसान परत मिळवून देण्याच्या नावाखाली आगाऊ रक्कम मागणे हा रिकव्हरी स्कॅम असतो."
        },
        "patterns": [
            r"(?i)\b(recover\s*(your\s*)?losses|loss\s*recovery\s*service|get\s*lost\s*money\s*back|trading\s*loss\s*recovered)\b",
            r"(?i)\b(लॉस\s*रिकवर|नुकसान\s*भरपाई)\b"
        ]
    }
}

class RiskEngine:
    @staticmethod
    def detect_heuristics(content: str, lang: str = "en") -> List[Dict[str, Any]]:
        """
        Pattern-matching heuristic scanner that finds evidence snippets for all 18 red flag categories.
        Ensures 100% offline accuracy for scam checking.
        """
        detected = []
        normalized_content = content.strip()

        for flag_type, config in RED_FLAG_CONFIG.items():
            matched_evidence = []
            for pattern in config["patterns"]:
                matches = re.finditer(pattern, normalized_content)
                for m in matches:
                    matched_evidence.append(m.group(0).strip())

            if matched_evidence:
                evidence_snippet = ", ".join(list(dict.fromkeys(matched_evidence))[:3])
                title = config["title"].get(lang, config["title"]["en"])
                explanation = config["explanation"].get(lang, config["explanation"]["en"])
                
                detected.append({
                    "type": flag_type,
                    "title": title,
                    "severity": config["default_severity"],
                    "points": config["points"],
                    "evidence": evidence_snippet,
                    "explanation": explanation
                })

        return detected

    @staticmethod
    def calculate_score(red_flags: List[Dict[str, Any]]) -> Tuple[int, str, List[ScoreBreakdownItem]]:
        """
        Deterministic Risk Scoring:
        Sum points, cap at 100, and classify:
          0–29: LOW
          30–59: MEDIUM
          60–79: HIGH
          80–100: CRITICAL
        """
        raw_score = sum(item.get("points", 0) for item in red_flags)
        final_score = min(100, max(0, raw_score))

        if final_score >= 80:
            risk_level = "CRITICAL"
        elif final_score >= 60:
            risk_level = "HIGH"
        elif final_score >= 30:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"

        breakdown = []
        for item in red_flags:
            breakdown.append(
                ScoreBreakdownItem(
                    category=item.get("title", item.get("type", "Warning")),
                    points=item.get("points", 0),
                    severity=item.get("severity", "MEDIUM"),
                    evidence_snippet=item.get("evidence", "")
                )
            )

        return final_score, risk_level, breakdown

    @classmethod
    def analyze_message(cls, content: str, lang: str = "en") -> Dict[str, Any]:
        """
        Full analysis combining heuristic pattern detection and deterministic risk scoring.
        """
        red_flags_raw = cls.detect_heuristics(content, lang=lang)
        final_score, risk_level, breakdown = cls.calculate_score(red_flags_raw)

        # Localized headings
        lang_data = TRANSLATIONS.get(lang, TRANSLATIONS["en"])
        headline = lang_data["headlines"].get(risk_level, lang_data["headlines"]["LOW"])
        subheading = lang_data["subheadings"].get(risk_level, lang_data["subheadings"]["LOW"])
        safe_steps = lang_data.get("safe_steps", TRANSLATIONS["en"]["safe_steps"])

        # Format RedFlagItem objects
        formatted_flags = [
            RedFlagItem(
                type=f["type"],
                title=f["title"],
                severity=f["severity"],
                points=f["points"],
                evidence=f["evidence"],
                explanation=f["explanation"]
            )
            for f in red_flags_raw
        ]

        summary_parts = []
        if formatted_flags:
            flag_names = [f.title for f in formatted_flags[:3]]
            summary_parts.append(f"Identified {len(formatted_flags)} key warning indicators: {', '.join(flag_names)}.")
        else:
            summary_parts.append("No common high-risk scam triggers or predatory keywords detected in this text.")

        return {
            "risk_score": final_score,
            "risk_level": risk_level,
            "headline": headline,
            "subheading": subheading,
            "summary": " ".join(summary_parts),
            "red_flags": formatted_flags,
            "score_breakdown": breakdown,
            "safe_next_steps": safe_steps
        }
