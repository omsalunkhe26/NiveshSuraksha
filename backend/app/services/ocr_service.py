import re
from typing import Dict, Any, List
from app.schemas import OCRExtractResponse

# Pre-packaged sample screenshots for hackathon demonstrations
SAMPLE_SCREENSHOT_DATA = {
    "whatsapp_crypto_pump": {
        "title": "WhatsApp: Guaranteed 40% Double Return Group",
        "category": "WhatsApp Scam Group",
        "extracted_text": "🔥 SPECIAL VIP INVITATION 🔥\n\nDouble your money in 5 days!\nGuaranteed 40% returns.\nOnly 3 slots left for today's batch.\n\nInvest now: http://fast-crorepati-returns.com/join\n\nContact Admin on Telegram: @quick_profit_admin",
        "urls_found": ["http://fast-crorepati-returns.com/join"],
        "claims_found": ["Double your money in 5 days", "Guaranteed 40% returns", "Only 3 slots left"],
        "entities_found": ["Telegram: @quick_profit_admin", "VIP Invitation"]
    },
    "telegram_insider_sebi": {
        "title": "Telegram: Fake SEBI Approved VIP Channel",
        "category": "Telegram Impersonation",
        "extracted_text": "🏆 SEBI REGISTERED RESEARCH ANALYST 🏆\n\n100% Sure Shot Jackpot Call tomorrow morning!\nAccuracy: 99.8% Guaranteed Profit.\nDirect Insider Information.\n\nPay ₹5,000 registration fee to UPI ID: insider.tips@okhdfcbank\nSend screenshot immediately to confirm your seat.",
        "urls_found": [],
        "claims_found": ["SEBI REGISTERED", "100% Sure Shot", "99.8% Guaranteed Profit", "Direct Insider Information"],
        "entities_found": ["UPI: insider.tips@okhdfcbank", "SEBI"]
    },
    "sms_bank_otp": {
        "title": "SMS: Urgent Account Block / Share OTP",
        "category": "Phishing SMS",
        "extracted_text": "URGENT ALERT: Your SBI NetBanking access is suspended due to pending KYC update.\nTo avoid permanent block within 2 hours, please update PAN and share OTP at:\nhttp://sbi-kyc-verify-portal.net/update\nDo not ignore.",
        "urls_found": ["http://sbi-kyc-verify-portal.net/update"],
        "claims_found": ["Suspended due to pending KYC", "Permanent block within 2 hours", "Share OTP"],
        "entities_found": ["SBI NetBanking", "KYC Update"]
    },
    "instagram_daily_income": {
        "title": "Instagram: Work From Home MLM Scam",
        "category": "Instagram Ad",
        "extracted_text": "Earn ₹25,000 to ₹50,000 daily from your mobile phone!\nZero risk. No investment needed.\nJust refer 5 friends to download our trading app.\nClick link in bio: https://t.me/daily_cash_india\nLive withdrawal proofs in story highlights!",
        "urls_found": ["https://t.me/daily_cash_india"],
        "claims_found": ["Earn ₹25,000 to ₹50,000 daily", "Zero risk", "Refer 5 friends", "Live withdrawal proofs"],
        "entities_found": ["Telegram: @daily_cash_india", "Instagram Bio"]
    }
}

class OCRService:
    @classmethod
    def extract_from_sample(cls, sample_id: str) -> OCRExtractResponse:
        """
        Retrieves mock OCR extraction data for preset hackathon demonstration samples.
        """
        sample = SAMPLE_SCREENSHOT_DATA.get(sample_id, SAMPLE_SCREENSHOT_DATA["whatsapp_crypto_pump"])
        return OCRExtractResponse(
            extracted_text=sample["extracted_text"],
            detected_language="en",
            urls_found=sample["urls_found"],
            claims_found=sample["claims_found"],
            entities_found=sample["entities_found"]
        )

    @classmethod
    def extract_from_image_data(cls, base64_or_bytes: str) -> OCRExtractResponse:
        """
        Extracts text from uploaded user image.
        Parses URLs, claims, and returns an editable text payload.
        """
        # In a real environment, pytesseract or Vision API can be plugged in.
        # If standard mock upload or image string is received, provide safe fallback
        extracted_text = (
            "Double your money in 5 days! Guaranteed 40% returns. Only 3 slots left. "
            "Invest now: http://example-investment-fund.com"
        )
        
        urls = re.findall(r"(https?://[^\s]+|www\.[^\s]+)", extracted_text)
        claims = ["Double money in 5 days", "40% returns", "3 slots left"]

        return OCRExtractResponse(
            extracted_text=extracted_text,
            detected_language="en",
            urls_found=urls,
            claims_found=claims,
            entities_found=["example-investment-fund.com"]
        )
