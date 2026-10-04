export const DEMO_SCENARIOS = {
  scam1: {
    id: "scam1",
    name: "Scenario 1: High-Risk Guaranteed Scam",
    tag: "NiveshSuraksha Check",
    content: "Double your money in 5 days!\nGuaranteed 40% returns.\nOnly 3 slots left.\nInvest now: http://fast-crorepati-returns.com",
    expectedRisk: "HIGH / CRITICAL",
    route: "/check"
  },
  explain1: {
    id: "explain1",
    name: "Scenario 2: Jargon Buster ('What is NAV?')",
    tag: "NiveshSuraksha Explain",
    query: "What is NAV?",
    route: "/explain"
  },
  pause1: {
    id: "pause1",
    name: "Scenario 3: 60s Cooling-Off / FOMO Check",
    tag: "NiveshSuraksha Pause",
    intention: "Everyone in my Telegram group is making money. I'm putting ₹1 lakh in tomorrow.",
    route: "/pause"
  },
  sebiFake: {
    id: "sebiFake",
    name: "Fake SEBI Insider Call",
    tag: "NiveshSuraksha Check",
    content: "SEBI REGISTERED RESEARCH ANALYST. 100% Sure Shot Jackpot Call tomorrow morning! Accuracy: 99.8% Guaranteed Profit. Pay ₹5,000 to UPI insider.tips@okhdfcbank",
    expectedRisk: "CRITICAL",
    route: "/check"
  },
  smsPhish: {
    id: "smsPhish",
    name: "Bank KYC / Share OTP Phishing",
    tag: "NiveshSuraksha Check",
    content: "URGENT ALERT: Your SBI NetBanking access is suspended due to pending KYC update. Share OTP immediately at http://sbi-kyc-verify-portal.net to avoid permanent block.",
    expectedRisk: "CRITICAL",
    route: "/check"
  }
};

export const SAMPLE_SCREENSHOTS = [
  {
    id: "whatsapp_crypto_pump",
    title: "WhatsApp VIP Investment Group",
    category: "WhatsApp Scam",
    badge: "Guaranteed 40%",
    text: "🔥 SPECIAL VIP INVITATION 🔥\n\nDouble your money in 5 days!\nGuaranteed 40% returns.\nOnly 3 slots left for today's batch.\n\nInvest now: http://fast-crorepati-returns.com/join\n\nContact Admin on Telegram: @quick_profit_admin"
  },
  {
    id: "telegram_insider_sebi",
    title: "Telegram Fake SEBI Analyst",
    category: "Impersonation",
    badge: "Fake Authority",
    text: "🏆 SEBI REGISTERED RESEARCH ANALYST 🏆\n\n100% Sure Shot Jackpot Call tomorrow morning!\nAccuracy: 99.8% Guaranteed Profit.\nDirect Insider Information.\n\nPay ₹5,000 registration fee to UPI ID: insider.tips@okhdfcbank"
  },
  {
    id: "sms_bank_otp",
    title: "SMS Urgent Bank KYC Alert",
    category: "Phishing SMS",
    badge: "OTP Stealing",
    text: "URGENT ALERT: Your SBI NetBanking access is suspended due to pending KYC update.\nTo avoid permanent block within 2 hours, please update PAN and share OTP at:\nhttp://sbi-kyc-verify-portal.net/update"
  },
  {
    id: "instagram_daily_income",
    title: "Instagram Work From Home Ad",
    category: "Social Media MLM",
    badge: "Zero Risk Claim",
    text: "Earn ₹25,000 to ₹50,000 daily from your mobile phone!\nZero risk. No investment needed.\nJust refer 5 friends to download our trading app.\nClick link in bio: https://t.me/daily_cash_india"
  }
];
