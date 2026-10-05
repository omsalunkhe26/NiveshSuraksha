# NiveshSuraksha 🛡️
> **"Pause. Verify. Understand."**  
> *Your AI-Powered Financial Safety Companion*

[![Hackathon](https://img.shields.io/badge/Hackathon-SANGYAN%20Investor%20Resilience%202026-0ea5e9.svg)](https://scores.sebi.gov.in)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20TailwindCSS-06b6d4.svg)](https://vitejs.dev)
[![Backend](https://img.shields.io/badge/Backend-Python%20FastAPI%20%2B%20SQLite-3b82f6.svg)](https://fastapi.tiangolo.com)
[![Status](https://img.shields.io/badge/Offline%20Demo%20Mode-Ready%20(Zero--Key)-10b981.svg)](#demo-mode-instructions)

---

## 📌 Executive Summary

**NiveshSuraksha** is an AI-powered Financial Safety Companion designed specifically for Indian retail investors. Developed for the **SANGYAN Investor Resilience Hackathon 2026**, NiveshSuraksha acts as a calm, intelligent protective layer between users and predatory financial content.

> **CRITICAL POSITIONING NOTICE:**  
> **NiveshSuraksha is a FINANCIAL SAFETY TOOL, NOT:**
> - an investment advisor or stock recommendation engine
> - a trading terminal or portfolio manager
> - a stock price prediction or algorithmic betting system
>
> Its sole purpose is to build resilience against **financial scams, misleading investment content, financial jargon, FOMO, and impulsive decisions.**
> ---

## 🛡️ Safety & Responsible AI Guardrails

NiveshSuraksha is designed as a **financial safety and education companion**, not as an investment recommendation system.

### What NiveshSuraksha NEVER does

- ❌ Recommends specific stocks or securities
- ❌ Provides Buy / Sell / Hold signals
- ❌ Predicts future prices or returns
- ❌ Provides personalized investment advice
- ❌ Promotes brokers, financial products, or paid services
- ❌ Requests OTPs, PINs, passwords, or unnecessary financial records

### What NiveshSuraksha ALWAYS does

- ✅ Explains financial concepts in simple language
- ✅ Identifies observable scam and manipulation signals
- ✅ Shows the evidence behind a risk assessment
- ✅ Communicates uncertainty rather than claiming certainty
- ✅ Encourages independent verification through trusted sources
- ✅ Provides safe, educational next steps

### Human-in-the-loop principle

NiveshSuraksha is designed to **support the user's decision-making process, not replace it**.

> **Understand → Verify → Pause → Decide**

---

## 🌟 The Three Pillars of Investor Resilience

graph TD
    A[User Encounters Financial Content] --> B{NiveshSuraksha Protective Layer}
    B -->|Check Message / Screenshot / Voice| C[🚨 NiveshSuraksha CHECK]
    B -->|Jargon-Free Financial Literacy| D[🧠 NiveshSuraksha EXPLAIN]
    B -->|60-Second Cooling-Off Buffer| E[🛑 NiveshSuraksha PAUSE]
    C --> F[18 Scam Signatures + Deterministic Score 0-100]
    D --> G[5-Part Everyday Analogy Breakdown]
    E --> H[Behavioral Signal Detector + Reflection Journal]
    F --> I[Safe, Informed Financial Action]
    G --> I
    H --> I


### 1. 🚨 NiveshSuraksha CHECK (Digital Fraud Resilience)
- **Multi-Modal Inputs**:
  - **Paste Message**: Analyzes text from WhatsApp forwards, Telegram groups, SMS, and emails.
  - **Screenshot OCR Flow**: Upload screenshots with automatic text & entity extraction (URLs, claims, payment requests), with in-place text editing before analysis. Includes pre-loaded 1-click test screenshot presets.
  - **Voice Input**: Natural spoken message dictation powered by browser Web Speech API across English, Hindi, and Marathi.
- **Scam Analysis Engine**: 5-step structured pipeline (Content extraction ➔ AI/pattern red-flag detection ➔ Deterministic risk scoring ➔ Human-readable explanations ➔ Safe next steps).
- **18 Red-Flag Categories**:
  - Guaranteed returns (+25)
  - Unrealistic returns (+20)
  - Artificial urgency (+15)
  - FOMO manipulation (+10)
  - High pressure to act (+15)
  - Suspicious links / Shorteners (+20)
  - Direct UPI / Payment requests (+20)
  - OTP / PIN / Password requests (+25)
  - Sensitive info requests (+20)
  - Fake regulatory / SEBI authority (+20)
  - Brand / Influencer impersonation (+25)
  - Referral / MLM pyramid pressure (+10)
  - Artificial scarcity ('Limited slots') (+15)
  - Secret strategy / Insider tips (+15)
  - Risk-free / 100% safe claims (+20)
  - Unrealistic accuracy (99% hit ratio) (+15)
  - Fabricated social proof (+15)
  - Loss recovery claims (+25)
- **Deterministic Risk Scoring**:
  - Mathematical point sum clamped at **0–100**.
  - Dual-encoding accessible risk badges: **`LOW` (0–29)**, **`MEDIUM` (30–59)**, **`HIGH` (60–79)**, **`CRITICAL` (80–100)**.
- **"How was this score calculated?"**:
  - Fully transparent, explainable breakdown modal disclosing each triggered red flag, evidence quote, and exact penalty points.
- **Safe Next Steps**: Clear educational checklists (Don't transfer, Don't share OTPs, Verify on SEBI/RBI portals).

---
---

## 🏗️ Technology Architecture

NiveshSuraksha follows a simple safety-first pipeline from user input to safer financial decisions.

```mermaid
flowchart LR
    A[👤 User Input<br/>Text • Screenshot • Voice]
    B[⚙️ Input Processing<br/>OCR • Speech-to-Text • Language]
    C[🧠 AI Safety Engine<br/>Gemini / OpenAI<br/>Risk Engine • Red Flags • Knowledge Base]
    D[🛡️ Safety Layer<br/>Risk Assessment<br/>Evidence • Cooling-Off]
    E[✅ Safe User Output<br/>Explanation • Regional Language<br/>Safe Next Steps]

    A --> B
    B --> C
    C --> D
    D --> E
   
### 2. 🧠 NiveshSuraksha EXPLAIN (Financial Literacy & Jargon Buster)
- Demystifies complex market concepts into **5 accessible parts**:
  1. **Simple Explanation**: 1–2 plain-language sentences.
  2. **Everyday Analogy**: Real-world relatable metaphors (groceries, shared buses, car dashboards).
  3. **Simple Example**: Concrete Indian rupee figures and numbers.
  4. **Why It Matters**: Personal safety relevance to the everyday saver.
  5. **Common Misunderstanding**: Debunking persistent retail investor myths.
- **Pre-Built Curated Topics**: NAV, IPO, SIP, Mutual Funds, P/E Ratio, Demat Accounts, etc.
- **Speech Audio Player**: Text-to-speech engine to listen to explanations aloud.

---

### 3. 🛑 NiveshSuraksha PAUSE (Behavioural Resilience & Cooling-Off)
- **Linguistic Marker Detection**: Identifies signals of **FOMO, Urgency, Social Pressure, Loss Chasing, Overconfidence, and Impulsive Capital Allocation**.
- **Non-Judgmental Tone**: Uses supportive phrasing (*"Your message contains language associated with..."* rather than labeling the user).
- **Interactive 60-Second Checkpoint**: 4-question guided reflection:
  1. *Why are you making this decision right now?*
  2. *If this goes badly, how would it affect your day-to-day finances?*
  3. *Have you independently verified the source from official filings?*
  4. *Would you still make this decision if nobody else was talking about it?*
- **Cooling-Off Synthesis**: Clear perspective summary recommending a mandatory pause window without giving buy/sell financial advice.
- **Decision Journal**: Dedicated journal tool allowing investors to write down their rationale and review historical entries.

---

### 4. 🗂️ AUDIT HISTORY & 10-HABIT SAFETY GUIDE
- **History Tracker**: SQLite & local storage synced log of all checks, explanations, and pause reflections with filtering, detailed drill-down, single item deletion, and full wipe.
- **Safety Guide**: 10 essential financial safety habits + breakdown of common Indian scam archetypes (Telegram Jackpot groups, Digital Arrests, Work-from-Home task scams, Dabba trading) and emergency hotlines (Cyber Helpline **1930**, SEBI SCORES, RBI Sachet).
- **Bharat-First Localization**: Seamless runtime switching between **English**, **हिन्दी (Hindi)**, and **मराठी (Marathi)**.

---

## 🏗️ Project Structure

```
c:\My Projects\AI-Finance-Companion\
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  # FastAPI entrypoint with CORS, lifespan & error handlers
│   │   ├── config.py                # Pydantic settings & environment loader
│   │   ├── database.py              # Async SQLAlchemy engine & SQLite session
│   │   ├── models.py                # ORM models (CheckHistory, ExplainHistory, PauseSession)
│   │   ├── schemas.py               # Pydantic validation schemas
│   │   ├── services/
│   │   │   ├── risk_engine.py       # 18 red flags, pattern heuristics & deterministic 0-100 scoring
│   │   │   ├── behavioral_engine.py # Emotional signal detection, 4-question reflection & cooling-off
│   │   │   ├── ai_provider.py       # Gemini API / OpenAI provider abstraction + offline knowledge base
│   │   │   ├── ocr_service.py       # Image OCR text extraction & demo screenshot presets
│   │   │   └── multilingual.py      # EN, HI, MR translation dictionaries
│   │   └── routers/
│   │       ├── check.py             # POST /api/check/analyze, /api/check/ocr, GET /samples
│   │       ├── explain.py           # POST /api/explain, GET /topics
│   │       ├── pause.py             # POST /api/pause/analyze, /complete, GET /journal
│   │       ├── history.py           # GET, DELETE /api/history
│   │       └── health.py            # GET /api/health
│   ├── requirements.txt
│   ├── .env.example
│   └── .env
├── frontend/
│   ├── index.html                   # HTML5 entry with Inter & Outfit fonts
│   ├── package.json
│   ├── vite.config.js               # Vite config with backend proxy (/api -> 8000)
│   ├── tailwind.config.js           # Fintech cybersecurity theme & tokens
│   ├── postcss.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx                  # Main layout, tabs routing & demo banner
│   │   ├── index.css                # Glassmorphism, animations & design system
│   │   ├── context/
│   │   │   ├── LanguageContext.jsx  # Multi-language state (EN, HI, MR)
│   │   │   ├── DemoModeContext.jsx  # Demo mode state & 1-click scenario loader
│   │   │   └── HistoryContext.jsx   # History management & local storage sync
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # NiveshSuraksha Shield+Rupee brand, navigation & controls
│   │   │   ├── Footer.jsx           # Educational disclaimer & regulator links
│   │   │   ├── RiskBadge.jsx        # Dual-encoding badge (icon + text + color)
│   │   │   ├── ScoreBreakdownModal.jsx # "How was this score calculated?" breakdown modal
│   │   │   ├── VoiceInputButton.jsx # Speech-to-text mic with Web Speech API
│   │   │   ├── SpeechPlayer.jsx     # Text-to-speech speaker button
│   │   │   └── DemoBanner.jsx       # 1-Click hackathon demo preset bar
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Hero, 3 action cards & resilience stats
│   │   │   ├── CheckMessage.jsx     # Primary check page (text, OCR, voice, red flags)
│   │   │   ├── ExplainFinance.jsx   # Jargon buster with 5-part cards & speech
│   │   │   ├── PauseReflect.jsx     # 60s reflection checkpoint & Decision Journal
│   │   │   ├── HistoryPage.jsx      # Audit trail, filters & clear history
│   │   │   └── SafetyGuide.jsx      # 10 habits & scam archetype playbook
│   │   ├── services/
│   │   │   └── api.js               # API client with zero-downtime local fallback
│   │   └── utils/
│   │       ├── translations.js      # Full EN, HI, MR vocabulary strings
│   │       └── demoData.js          # Preset scenarios & mock screenshot samples
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (v24.x recommended)
- **Python**: 3.10 or higher (3.11+ / 3.14 compatible)
- **Git**

---

### Step 1: Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
python -m pip install -r requirements.txt

# Create .env from .env.example
copy .env.example .env   # (Windows)
# or: cp .env.example .env (Linux/Mac)
```

### Step 2: Frontend Setup
```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install
```

---

## 🔐 Environment Variables

Create `backend/.env` with the following variables:

```env
# Backend Server Configuration
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=development

# AI Provider Configuration ("gemini", "openai", or "demo")
# NOTE: If keys are left blank, NiveshSuraksha runs automatically in resilient Demo Mode
AI_PROVIDER=demo
GEMINI_API_KEY=
OPENAI_API_KEY=

# Database Connection (Default: Async SQLite)
DATABASE_URL=sqlite+aiosqlite:///./NiveshSuraksha.db

# CORS Allowed Origins
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000
```

---

## 🚀 Run Commands

### 1. Run Backend Server
In the `backend` directory:
```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
*API will run at `http://127.0.0.1:8000` (Interactive docs at `http://127.0.0.1:8000/docs`).*

### 2. Run Frontend Server
In the `frontend` directory:
```bash
npm run dev
```
*Application UI will open at `http://127.0.0.1:5173`.*

---

## 🎯 Demo Mode Instructions

NiveshSuraksha is engineered to be **100% offline-resilient** and fully functional **without requiring an external API key or internet connection**. This guarantees that live hackathon jury presentations will never fail due to network drops or API rate limits.

### Top Banner Quick-Test Presets:
1. **1. Scam Check (Double Money)**:
   - Loads: *"Double your money in 5 days! Guaranteed 40% returns. Only 3 slots left. Invest now: http://fast-crorepati-returns.com"*
   - Result: **HIGH / CRITICAL RISK (80/100)** with 4 red flag cards.
   - Click **"How was this score calculated?"** to reveal the transparent points breakdown (`+25`, `+20`, `+15`, `+20`).
2. **2. Explain (What is NAV?)**:
   - Opens the 5-part jargon-free explanation with analogy, example, and myth debunking.
   - Click **"Read Aloud"** to hear spoken audio.
3. **3. Pause (Telegram FOMO)**:
   - Loads: *"Everyone in my Telegram group is making money. I'm putting ₹1 lakh in tomorrow."*
   - Detects: `FOMO`, `Social & Group Pressure`, `Time Pressure / Urgency`, `Impulsive Capital Allocation`.
   - Runs the interactive 4-question 60-second reflection checkpoint and offers saving to the **Decision Journal**.

---

## 🤖 AI Configuration & Fallback Hierarchy

NiveshSuraksha uses a three-tier provider abstraction:

```
[Request]
   │
   ▼
[Check Gemini / OpenAI API Key]
   ├── Key Available & Online ──► Call Google Gemini / OpenAI with Structured JSON
   │                                 │ (Catches Rate Limits / Timeouts)
   │                                 ▼
   └── Key Absent or Offline  ──► Deep Deterministic Knowledge Base & Heuristic Engine
                                     (100% Exact Score Math & Offline Explanations)
```

1. **Deterministic Rule Engine Priority**:
   - Regardless of whether an LLM is active, the **Risk Engine determines the final risk score** based on identified verifiable evidence. The AI is **never** allowed to hallucinate or invent an arbitrary risk score.
2. **Google Gemini (Optional)**:
   - Set `AI_PROVIDER=gemini` and provide `GEMINI_API_KEY` in `backend/.env`.
   - Uses `gemini-1.5-flash` with JSON output formatting.
3. **Demo Provider (Default & Resilient)**:
   - Contains pre-computed financial literacy explanations for standard terms and pattern-matching rules for all 18 red-flag categories.

---

## 🧪 Verified Test Cases

| Scenario | Input | Expected Output | Status |
| :--- | :--- | :--- | :---: |
| **High Risk Scam** | *"Double your money in 5 days! Guaranteed 40% returns. Only 3 slots left. http://fast-crorepati-returns.com"* | `CRITICAL RISK (80/100)`, 4 Red Flags, Breakdown Modal with exact sum | ✅ PASS |
| **Fake SEBI Analyst** | *"SEBI REGISTERED ANALYST. 100% Sure Shot Jackpot Call. Pay ₹5,000 to UPI insider@okhdfcbank"* | `CRITICAL RISK (85/100)`, Fake Authority + Direct UPI + Unrealistic Accuracy | ✅ PASS |
| **SMS Phishing** | *"URGENT: Bank access suspended. Share OTP immediately at http://sbi-kyc-verify-portal.net"* | `CRITICAL RISK (85/100)`, Urgency + OTP Request + Suspicious Link | ✅ PASS |
| **Explain NAV** | *"What is NAV?"* | 5-part structure: Simple explanation, fruit basket analogy, ₹10/unit math, why it matters, lower NAV myth | ✅ PASS |
| **Explain IPO / SIP** | *"What is an IPO?"* / *"What is SIP?"* | Bakery co-ownership analogy / watering plant analogy with rupee examples | ✅ PASS |
| **Telegram FOMO Pause** | *"Everyone in my Telegram group is making money. I am putting 1 lakh in tomorrow."* | 4 behavioral signals detected, 60s questionnaire, cooling-off summary | ✅ PASS |
| **Multi-Lingual Check** | *"5 दिनों में पैसा डबल! 100% गारंटीड रिटर्न। केवल 3 सीटें बाकी।"* (Hindi) | Full Hindi response: `गंभीर जोखिम`, localized red flags, Hindi safe steps | ✅ PASS |
| **Screenshot OCR** | Select sample or upload WhatsApp screenshot | Extracts text preview, editable box, runs scam analysis pipeline | ✅ PASS |

---

## ⚠️ Known Limitations & Scope Boundaries

1. **Educational Only**: NiveshSuraksha does not provide individualized tax, legal, or investment advice.
2. **Prototype Database**: Uses SQLite with async support for lightweight zero-config setup. For production multi-tenant deployment, migrate `DATABASE_URL` to PostgreSQL.
3. **Voice Recognition**: Web Speech API requires browser mic permissions and is natively supported in Chromium-based browsers (Chrome, Edge, Brave, Opera) and Safari.
4. **OCR Scope**: Includes full simulated OCR parser and pre-packaged test screenshots. In a full cloud production tier, Google Cloud Vision API or Tesseract binary can be bound to the OCR service interface.

---

## 🏆 SANGYAN 2026 Pitch Deck Alignment

- **Category**: Digital Fraud Resilience & Behavioral Investor Protection
- **Tagline**: *"Pause. Verify. Understand."*
- **Target Audience**: 160M+ Indian retail demat account holders navigating social media trading tips, WhatsApp pump groups, and high-pressure financial pitches.
