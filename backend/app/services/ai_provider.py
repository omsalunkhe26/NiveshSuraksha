import os
import json
import logging
import requests
from typing import Dict, Any, List
from app.config import settings
from app.services.risk_engine import RiskEngine
from app.services.behavioral_engine import BehavioralEngine

logger = logging.getLogger("moneyguard.ai")

# Pre-computed curated financial explanations for standard hackathon queries
FINANCIAL_KNOWLEDGE_BASE = {
    "nav": {
        "en": {
            "query": "What is NAV (Net Asset Value)?",
            "simple_explanation": "NAV (Net Asset Value) represents the per-unit market value of a mutual fund scheme.",
            "everyday_analogy": "Imagine a big shopping basket filled with fruits worth ₹1,000 total, divided into 100 equal gift pouches. The price of each individual pouch (₹10) is like the NAV.",
            "simple_example": "If a mutual fund holds ₹10,00,000 worth of shares, has ₹1,00,000 in expenses/liabilities, and has 90,000 issued units, the NAV is (₹10,00,000 - ₹1,00,000) / 90,000 = ₹10 per unit.",
            "why_it_matters": "When you invest or withdraw money from a mutual fund, units are bought or redeemed strictly at the current day's applicable NAV.",
            "common_misunderstanding": "A lower NAV (like ₹15 vs ₹150) does NOT mean a mutual fund is 'cheaper' or a better bargain. Both funds will grow at the exact same percentage rate if their underlying assets increase equally."
        },
        "hi": {
            "query": "NAV (नेट एसेट वैल्यू) क्या है?",
            "simple_explanation": "NAV किसी म्यूचुअल फंड की एक यूनिट (हिस्से) का बाजार मूल्य होता है।",
            "everyday_analogy": "मान लीजिए ₹1,000 मूल्य के फलों की एक बड़ी टोकरी को 100 बराबर पैकेटों में बांटा गया है। प्रत्येक पैकेट की कीमत (₹10) को आप NAV समझ सकते हैं।",
            "simple_example": "यदि किसी फंड के पास कुल ₹10 लाख के शेयर हैं और 1 लाख यूनिट हैं, तो 1 यूनिट का NAV ₹10 होगा।",
            "why_it_matters": "जब भी आप म्यूचुअल फंड खरीदते या बेचते हैं, तो लेन-देन उस दिन के तय NAV पर ही होता है।",
            "common_misunderstanding": "कम NAV (जैसे ₹10 बनाम ₹100) का मतलब यह नहीं है कि फंड 'सस्ता' या अधिक फायदेमंद है। रिटर्न फंड में शामिल शेयरों के प्रदर्शन पर निर्भर करता है, NAV की संख्या पर नहीं।"
        },
        "mr": {
            "query": "NAV (नेट अॅसेट व्हॅल्यू) म्हणजे काय?",
            "simple_explanation": "NAV म्हणजे म्युच्युअल फंडाच्या एका युनिटची (भागाची) बाजार किंमत होय.",
            "everyday_analogy": "समजा ₹१,००० रुपयांची एक फळांची टोपली १०० समान भागांमध्ये विभागली आहे. प्रत्येक भागाची ₹१० ही किंमत म्हणजे NAV.",
            "simple_example": "जर फंडाकडे ₹१० लाख किमतीचे शेअर्स असतील आणि एकूण १ लाख युनिट्स असतील, तर १ युनिटची NAV ₹१० असेल.",
            "why_it_matters": "म्युच्युअल फंडामध्ये गुंतवणूक करताना किंवा पैसे काढताना युनिट्स त्या दिवसाच्या NAV नुसार खरेदी किंवा विकले जातात.",
            "common_misunderstanding": "कमी NAV (उदा. ₹१० विरुद्ध ₹१००) म्हणजे फंड 'स्वस्त' किंवा चांगला असा अजिबात होत नाही. परतावा त्यातील शेअर्सच्या वाढीवर अवलंबून असतो."
        }
    },
    "ipo": {
        "en": {
            "query": "What is an IPO (Initial Public Offering)?",
            "simple_explanation": "An IPO is when a private company sells its shares to the general public for the very first time to raise capital.",
            "everyday_analogy": "Think of a popular local bakery that decides to open branches across the country. To fund this expansion, the owner invites community members to become co-owners by buying small slices of the bakery.",
            "simple_example": "Company XYZ needs ₹500 Crores to build new factories. It issues 5 Crore new shares to the public at ₹100 each during its IPO window.",
            "why_it_matters": "IPOs allow early retail investors to participate in an expanding company's journey before the shares begin trading continuously on stock exchanges.",
            "common_misunderstanding": "An IPO listing is NOT guaranteed to surge on Day 1 ('listing gains'). Shares can open below the issue price ('discount listing') if market sentiment or company valuation is weak."
        },
        "hi": {
            "query": "IPO (इनिशियल पब्लिक ऑफरिंग) क्या है?",
            "simple_explanation": "IPO वह प्रक्रिया है जब कोई प्राइवेट कंपनी पहली बार आम जनता को अपने शेयर बेचकर पूंजी जुटाती है।",
            "everyday_analogy": "जैसे किसी शहर की प्रसिद्ध मिठाई की दुकान नए शहर में शाखाएं खोलने के लिए ग्राहकों को दुकान में छोटा सा हिस्सेदार बनने का मौका दे।",
            "simple_example": "कंपनी XYZ को नए प्रोजेक्ट के लिए ₹100 करोड़ चाहिए, इसलिए वह ₹100 प्रति शेयर के भाव पर जनता के लिए IPO लाती है।",
            "why_it_matters": "IPO निवेशकों को कंपनी के स्टॉक एक्सचेंज पर आने के शुरुआती चरण में हिस्सेदार बनने का अवसर देता है।",
            "common_misunderstanding": "हर IPO पहले दिन मुनाफा ('लिस्टिंग गेन') ही देगा, ऐसा बिल्कुल जरूरी नहीं है। खराब वैल्यूएशन पर शेयर नुकसान में भी लिस्ट हो सकते हैं।"
        },
        "mr": {
            "query": "IPO म्हणजे काय?",
            "simple_explanation": "जेव्हा एखादी खाजगी कंपनी भांडवल उभारण्यासाठी पहिल्यांदाच सर्वसामान्य जनतेला आपले शेअर्स विकते, त्याला IPO म्हणतात.",
            "everyday_analogy": "एखाद्या नामांकित स्थानिक बेकरीने व्यवसाय वाढवण्यासाठी लोकांना आपल्या व्यवसायात छोटा भागीदार होण्याची संधी देण्यासारखे हे आहे.",
            "simple_example": "XYZ कंपनीला विस्तारासाठी ₹१०० कोटी हवे आहेत, म्हणून ती प्रत्येकी ₹१०० भावाने नवीन शेअर्स बाजारात आणते.",
            "why_it_matters": "IPO मुळे सामान्य गुंतवणूकदारांना सुरुवातीच्या टप्प्यावर चांगल्या कंपनीचे मालक होण्याची संधी मिळते.",
            "common_misunderstanding": "प्रत्येक IPO लिस्टिंगच्या दिवशी नफाच देईल अशी कोणतीही खात्री नसते. अभ्यास न करता अर्ज केल्यास नुकसानही होऊ शकते."
        }
    },
    "sip": {
        "en": {
            "query": "What is an SIP (Systematic Investment Plan)?",
            "simple_explanation": "SIP is a disciplined method of investing a fixed amount of money at regular intervals (like monthly) into a mutual fund.",
            "everyday_analogy": "Like watering a plant every Sunday with a fixed cup of water instead of dumping an entire water tank all at once.",
            "simple_example": "Investing ₹2,000 on the 5th of every month into an index fund automatically through your bank account.",
            "why_it_matters": "SIP averages out market fluctuations (Rupee Cost Averaging) and builds wealth through compounding without needing to time market highs or lows.",
            "common_misunderstanding": "SIP is NOT an investment product itself; it is simply a disciplined delivery mechanism to invest in mutual funds."
        },
        "hi": {
            "query": "SIP (सिस्टमैटिक इन्वेस्टमेंट प्लान) क्या है?",
            "simple_explanation": "SIP म्यूचुअल फंड में नियमित अंतराल (जैसे हर महीने) पर एक निश्चित राशि निवेश करने का अनुशासित तरीका है।",
            "everyday_analogy": "जैसे पौधे को रोज थोड़ा-थोड़ा पानी देना, बजाय एक ही दिन पूरी बाल्टी उड़ेलने के।",
            "simple_example": "हर महीने की 5 तारीख को ₹1,000 किसी इंडेक्स फंड में ऑटोमैटिकली जमा होना।",
            "why_it_matters": "यह बाजार के उतार-चढ़ाव का जोखिम कम करता है और नियमित बचत की अच्छी आदत बनाता है।",
            "common_misunderstanding": "SIP अपने आप में कोई अलग स्कीम नहीं है, यह म्यूचुअल फंड में निवेश करने का एक जरिया मात्र है।"
        },
        "mr": {
            "query": "SIP म्हणजे काय?",
            "simple_explanation": "SIP म्हणजे नियमित अंतराने (उदा. दरमहा) म्युच्युअल फंडामध्ये ठरावीक रक्कम गुंतवण्याची एक शिस्तबद्ध पद्धत.",
            "everyday_analogy": "झाडाला रोज ठरवून थोडे थोडे पाणी घालण्यासारखे हे आहे, ज्यामुळे झाड हळूहळू जोमाने वाढते.",
            "simple_example": "दर महिन्याच्या १० तारखेला बँक खात्यातून ₹१,५०० आपोआप फंडात जमा होणे.",
            "why_it_matters": "यामुळे बाजाराची वेळ (Timing) साधण्याची गरज उरत नाही आणि चक्रवाढ व्याजाचा (Compounding) फायदा मिळतो.",
            "common_misunderstanding": "SIP हे स्वतः कोणते उत्पादन नसून म्युच्युअल फंडामध्ये पैसे गुंतवण्याचा एक मार्ग आहे."
        }
    },
    "mutual_fund": {
        "en": {
            "query": "What is a Mutual Fund?",
            "simple_explanation": "A mutual fund pools money from many individuals to invest in a diversified basket of stocks, bonds, or government securities managed by professional fund managers.",
            "everyday_analogy": "Like hiring a shared tourist bus where everyone chips in for fuel and a professional licensed driver navigates the route safely.",
            "simple_example": "Instead of buying one costly share of 50 different companies, 1,000 investors pool ₹500 each, and the fund manager purchases a balanced portfolio.",
            "why_it_matters": "It provides instant diversification and professional management even for small monthly savings of ₹500.",
            "common_misunderstanding": "Mutual funds are NOT risk-free, nor are they limited only to high-risk equity; they range from low-risk overnight debt funds to equity funds."
        },
        "hi": {
            "query": "म्यूचुअल फंड क्या है?",
            "simple_explanation": "म्यूचुअल फंड कई लोगों के पैसों को मिलाकर अनुभवी फंड मैनेजरों द्वारा विभिन्न शेयरों और बॉन्डों में निवेश करने का माध्यम है।",
            "everyday_analogy": "जैसे कई लोग मिलकर एक टैक्सी किराए पर लें और एक अनुभवी ड्राइवर उन्हें सुरक्षित मंजिल तक पहुंचाए।",
            "simple_example": "₹500 के छोटे निवेश से भी आप देश की 50 सबसे बड़ी कंपनियों के शेयरों में अप्रत्यक्ष हिस्सेदारी पा सकते हैं।",
            "why_it_matters": "यह कम पैसे में भी जोखिम को कई कंपनियों में बांटने (Diversification) की सुविधा देता है।",
            "common_misunderstanding": "म्यूचुअल फंड का मतलब केवल शेयर बाजार का जोखिम नहीं है; इसमें सरकारी बॉन्ड और सुरक्षित लिक्विड फंड भी होते हैं।"
        },
        "mr": {
            "query": "म्युच्युअल फंड म्हणजे काय?",
            "simple_explanation": "अनेक गुंतवणूकदारांचे पैसे एकत्र करून तज्ज्ञ फंड मॅनेजरमार्फत विविध शेअर्स आणि रोख्यांमध्ये गुंतवण्याची ही एक पद्धत आहे.",
            "everyday_analogy": "एकत्र मिळून एका अनुभवी ड्रायव्हरची बस भाड्याने घेण्यासारखे, जिथे सर्वांचा प्रवास सुरक्षित होतो.",
            "simple_example": "अवघ्या ₹५०० मध्ये ५० मोठ्या कंपन्यांमध्ये एकाच वेळी विभागून गुंतवणूक करण्याची संधी.",
            "why_it_matters": "कमी भांडवलात जोखीम विभागली जाते आणि तज्ज्ञांचे मार्गदर्शन लाभते.",
            "common_misunderstanding": "म्युच्युअल फंडात जोखीम नसते असा समज चुकीचा आहे; बाजारातील चढ-उतारांचा त्यावर प्रभाव पडतोच."
        }
    },
    "pe_ratio": {
        "en": {
            "query": "What is P/E Ratio (Price to Earnings)?",
            "simple_explanation": "P/E ratio measures how much investors are willing to pay for each ₹1 of a company's annual earnings.",
            "everyday_analogy": "If two grocery shops make ₹10,000 profit a year, and Shop A costs ₹1,00,000 to buy (P/E 10) while Shop B costs ₹5,00,000 (P/E 50), P/E helps evaluate relative valuation.",
            "simple_example": "If a stock trades at ₹200 and its annual earnings per share is ₹10, its P/E ratio is 200 / 10 = 20.",
            "why_it_matters": "It helps assess whether a stock's current price is relatively high or reasonable compared to its actual profits and industry peers.",
            "common_misunderstanding": "A high P/E does not automatically mean a stock is overvalued; fast-growing companies frequently command higher P/E ratios due to strong future growth prospects."
        },
        "hi": {
            "query": "P/E अनुपात (Price to Earnings) क्या है?",
            "simple_explanation": "P/E रेश्यो यह बताता है कि कंपनी के ₹1 के सालाना मुनाफे के लिए निवेशक कितना रुपया देने को तैयार हैं।",
            "everyday_analogy": "यदि कोई दुकान सालाना ₹10,000 कमाती है और उसकी कीमत ₹1,00,000 है, तो उसका P/E 10 होगा।",
            "simple_example": "यदि शेयर का भाव ₹200 है और प्रति शेयर कमाई ₹10 है, तो P/E रेश्यो 20 होगा।",
            "why_it_matters": "यह समझने में मदद करता है कि शेयर अपनी वास्तविक कमाई की तुलना में महंगा है या उचित मूल्य पर है।",
            "common_misunderstanding": "कम P/E का मतलब हमेशा यह नहीं होता कि शेयर अच्छा ही है; कई बार कमजोर बिजनेस का P/E भी कम होता है।"
        },
        "mr": {
            "query": "P/E रेश्यो म्हणजे काय?",
            "simple_explanation": "कंपनीच्या ₹१ च्या नफ्यासाठी गुंतवणूकदार बाजारात किती पैसे मोजायला तयार आहेत, हे P/E रेश्यो दर्शवतो.",
            "everyday_analogy": "वार्षिक ₹१०,००० नफा कमवणाऱ्या दुकानाचे मुल्यांकन ₹१ लाखाला होत असेल, तर P/E रेश्यो १० ठरतो.",
            "simple_example": "शेअरची किंमत ₹२०० आणि वार्षिक नफा प्रति शेअर ₹१० असल्यास, P/E = २०.",
            "why_it_matters": "शेअर वाजवी किमतीत उपलब्ध आहे की महाग, हे तपासण्यासाठी याचा वापर होतो.",
            "common_misunderstanding": "कमी P/E असणारा शेअर नेहमीच उत्तम असतो असे नाही; कंपनीच्या भविष्यातील वाढीचाही विचार करावा लागतो."
        }
    },
    "demat": {
        "en": {
            "query": "What is a Demat Account?",
            "simple_explanation": "A Demat (Dematerialized) account is an electronic locker used to hold your shares, bonds, and securities safely in digital form.",
            "everyday_analogy": "Just like a bank account holds your digital rupees instead of physical currency notes, a Demat account holds your company shares instead of paper certificates.",
            "simple_example": "When you purchase 10 shares of Infosys, they are digitally credited and safely stored in your Demat account maintained with NSDL or CDSL.",
            "why_it_matters": "It eliminates the risks of lost, stolen, or forged physical share certificates and enables instant settlement.",
            "common_misunderstanding": "A Demat account is NOT where your money sits; cash is kept in your linked bank/trading account, while shares sit in the Demat account."
        },
        "hi": {
            "query": "डिमैट खाता (Demat Account) क्या है?",
            "simple_explanation": "डिमैट खाता एक इलेक्ट्रॉनिक लॉकर है जिसमें आपके शेयर, बॉन्ड और म्यूचुअल फंड डिजिटल रूप में सुरक्षित रखे जाते हैं।",
            "everyday_analogy": "जैसे बैंक खाता आपके पैसों को कागजी नोटों के बजाय डिजिटल रखता है, वैसे ही डिमैट खाता शेयरों को डिजिटल रखता है।",
            "simple_example": "जब आप शेयर खरीदते हैं, तो वे NSDL या CDSL द्वारा प्रबंधित आपके डिमैट खाते में जमा हो जाते हैं।",
            "why_it_matters": "यह कागजी सर्टिफिकेट खोने, फटने या चोरी होने के जोखिम को पूरी तरह खत्म करता है।",
            "common_misunderstanding": "डिमैट खाते में पैसे नहीं रखे जाते; पैसे आपके बैंक खाते में होते हैं और शेयर डिमैट खाते में।"
        },
        "mr": {
            "query": "डिमॅट खाते (Demat Account) म्हणजे काय?",
            "simple_explanation": "डिमॅट खाते म्हणजे तुमचे शेअर्स, रोखे आणि इतर डिजिटल मालमत्ता सुरक्षित ठेवण्यासाठीचे इलेक्ट्रॉनिक लॉकर होय.",
            "everyday_analogy": "जसे बँक खात्यात तुमचे पैसे डिजिटल स्वरूपात असतात, तसेच डिमॅट खात्यात शेअर्स डिजिटल स्वरूपात असतात.",
            "simple_example": "शेअर बाजारात खरेदी केलेले शेअर्स तुमच्या डिमॅट खात्यात डिजिटल पद्धतीने जमा होतात.",
            "why_it_matters": "कागदी प्रमाणपत्रे गहाळ होण्याचा किंवा खराब होण्याचा धोका यामुळे पूर्णपणे टळतो.",
            "common_misunderstanding": "डिमॅट खात्यात थेट पैसे नसतात; पैसे बँकेत असतात आणि खरेदी केलेले शेअर्स डिमॅटमध्ये असतात."
        }
    }
}

class AIProviderService:
    @staticmethod
    def _match_knowledge_base(query: str, lang: str = "en") -> Dict[str, Any]:
        """
        Keyword matcher across our curated financial literacy topics.
        """
        q_lower = query.lower()
        topic_key = None
        if "nav" in q_lower or "net asset" in q_lower:
            topic_key = "nav"
        elif "ipo" in q_lower or "initial public" in q_lower:
            topic_key = "ipo"
        elif "sip" in q_lower or "systematic investment" in q_lower:
            topic_key = "sip"
        elif "mutual fund" in q_lower or "म्यूचुअल" in q_lower or "म्युच्युअल" in q_lower:
            topic_key = "mutual_fund"
        elif "p/e" in q_lower or "pe ratio" in q_lower or "price to earnings" in q_lower:
            topic_key = "pe_ratio"
        elif "demat" in q_lower or "डीमैट" in q_lower or "डिमॅट" in q_lower:
            topic_key = "demat"

        if topic_key and topic_key in FINANCIAL_KNOWLEDGE_BASE:
            data = FINANCIAL_KNOWLEDGE_BASE[topic_key].get(lang, FINANCIAL_KNOWLEDGE_BASE[topic_key]["en"])
            return {
                "query": query,
                "language": lang,
                "simple_explanation": data["simple_explanation"],
                "everyday_analogy": data["everyday_analogy"],
                "simple_example": data["simple_example"],
                "why_it_matters": data["why_it_matters"],
                "common_misunderstanding": data["common_misunderstanding"],
                "key_takeaway": "Financial literacy builds your resilience against predatory hype.",
                "related_topics": ["NAV", "SIP", "Diversification", "Risk Management"]
            }
        return None

    @classmethod
    async def explain_concept(cls, query: str, lang: str = "en", demo_mode: bool = False) -> Dict[str, Any]:
        """
        Explains any financial concept in a 5-part jargon-free structure.
        Uses Gemini/OpenAI if available, or rich dynamic offline engine.
        """
        # 1. Check curated knowledge base first
        cached = cls._match_knowledge_base(query, lang=lang)
        if cached:
            return cached

        # 2. If Gemini API Key is present and not explicitly demo mode, call Gemini
        if settings.GEMINI_API_KEY and not demo_mode:
            try:
                system_prompt = (
                    "You are MoneyGuard Explain, an AI Financial Safety and Literacy guide for Indian retail investors. "
                    "Explain the requested financial concept in simple, friendly, jargon-free language. "
                    "CRITICAL: Do NOT provide investment advice or buy/sell recommendations. "
                    f"Generate response in language: '{lang}' (English, Hindi, or Marathi). "
                    "Respond ONLY with valid JSON matching this exact structure: \n"
                    "{\n"
                    '  "simple_explanation": "1-2 clear sentences",\n'
                    '  "everyday_analogy": "Relatable non-financial analogy",\n'
                    '  "simple_example": "Concrete Indian numbers/rupee scenario",\n'
                    '  "why_it_matters": "Why an everyday person should know this",\n'
                    '  "common_misunderstanding": "A common myth debunked",\n'
                    '  "key_takeaway": "One short takeaway"\n'
                    "}"
                )
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"
                payload = {
                    "contents": [{
                        "parts": [
                            {"text": system_prompt},
                            {"text": f"User query: {query}"}
                        ]
                    }],
                    "generationConfig": {"response_mime_type": "application/json"}
                }
                res = requests.post(url, json=payload, timeout=8)
                if res.status_code == 200:
                    data = res.json()
                    text = data["candidates"][0]["content"]["parts"][0]["text"]
                    parsed = json.loads(text)
                    parsed["query"] = query
                    parsed["language"] = lang
                    return parsed
            except Exception as e:
                logger.warning(f"Gemini API call failed, using graceful offline explainer: {e}")

        # 3. Dynamic offline generator for any other term
        if lang == "hi":
            return {
                "query": query,
                "language": lang,
                "simple_explanation": f"'{query}' वित्तीय दुनिया में एक महत्वपूर्ण अवधारणा है जो यह दर्शाती है कि पूंजी कैसे काम करती है और उसका प्रबंधन कैसे किया जाता है।",
                "everyday_analogy": "जैसे किसी वाहन को सुरक्षित चलाने के लिए स्पीडोमीटर और फ्यूल गेज को देखना जरूरी होता है, वैसे ही यह अवधारणा आपके वित्तीय सफर को स्पष्ट करती है।",
                "simple_example": "जब आप ₹5,000 की बचत का निर्णय लेते हैं, तो इस नियम को समझने से आप अनावश्यक नुकसान से बच सकते हैं।",
                "why_it_matters": "वित्तीय शब्दों को सीधे और सरल तरीके से समझकर आप भ्रामक विज्ञापनों और धोखेबाजों की मीठी बातों से सुरक्षित रह सकते हैं।",
                "common_misunderstanding": "जटिल वित्तीय शब्द केवल विशेषज्ञों के लिए हैं, ऐसा सोचना गलत है। बुनियादी समझ से कोई भी सुरक्षित निर्णय ले सकता है।",
                "key_takeaway": "वित्तीय जागरूकता ही धोखाधड़ी से बचने का सबसे मजबूत सुरक्षा कवच है।"
            }
        elif lang == "mr":
            return {
                "query": query,
                "language": lang,
                "simple_explanation": f"'{query}' ही एक मूलभूत आर्थिक संकल्पना आहे, जी पैशांचे नियोजन आणि जोखीम व्यवस्थापन समजण्यास मदत करते.",
                "everyday_analogy": "गाडी चालवताना डॅशबोर्डवरील निर्देशक जसे सुरक्षित प्रवासात मदत करतात, तसेच ही संकल्पना आर्थिक निर्णयांना स्पष्टता देते.",
                "simple_example": "दरमहा ₹३,००० ची बचत करताना या नियमाचा योग्य वापर केल्यास दीर्घकालीन सुरक्षितता मिळते.",
                "why_it_matters": "अशा संज्ञा समजल्याने खोट्या जाहिराती किंवा अवास्तव दाव्यांना बळी पडण्याचा धोका टळतो.",
                "common_misunderstanding": "आर्थिक संकल्पना केवळ तज्ज्ञांसाठी असतात हा गैरसमज आहे; थोड्या सरावाने कोणीही या समजू शकतो.",
                "key_takeaway": "योग्य माहिती हीच सुरक्षित गुंतवणुकीची पहिली पायरी आहे."
            }
        else:
            return {
                "query": query,
                "language": lang,
                "simple_explanation": f"'{query}' is a financial concept that helps investors measure value, assess market dynamics, or organize their personal capital safely.",
                "everyday_analogy": "Think of it like checking the dashboard gauges in your car before a long highway drive — it gives you reliable clarity on where things stand.",
                "simple_example": "When planning your monthly savings of ₹5,000, understanding this concept prevents you from overpaying or taking uncalculated risks.",
                "why_it_matters": "Knowing the underlying reality behind financial terms makes you immune to high-pressure pitchmen and confusing jargon.",
                "common_misunderstanding": "Believing that financial terms are too complex for ordinary savers. With simple analogies, anyone can make safe, clear choices.",
                "key_takeaway": "Financial understanding turns confusing jargon into personal safety."
            }

    @classmethod
    async def analyze_message_content(cls, content: str, lang: str = "en", demo_mode: bool = False) -> Dict[str, Any]:
        """
        Executes the multi-step scam analysis pipeline:
        1. Content extraction
        2. Red-flag pattern heuristic scanner
        3. Deterministic rule-based scoring (0-100)
        4. Safe next steps and transparent breakdown
        """
        # Run our deterministic risk engine
        analysis = RiskEngine.analyze_message(content, lang=lang)
        analysis["raw_content"] = content
        analysis["language"] = lang
        return analysis
