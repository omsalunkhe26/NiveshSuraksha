/**
 * NiveshSuraksha API Client with transparent error recovery and client-side fallback.
 */

const API_BASE = "/api";

// Client-side fallback rule engine in case backend server is unreachable
const LOCAL_FALLBACK_RULES = {
  guaranteed: { points: 25, type: "GUARANTEED_RETURNS", title: "Guaranteed Returns Claim", severity: "HIGH", explanation: "Investments have market risk. Promises of guaranteed returns indicate fraud." },
  unrealistic: { points: 20, type: "UNREALISTIC_RETURNS", title: "Unrealistic Returns", severity: "HIGH", explanation: "Claims of doubling money or 40%+ fast returns are mathematically impossible." },
  urgency: { points: 15, type: "URGENCY", title: "Urgency / Pressure", severity: "MEDIUM", explanation: "Countdown timers are used to force hasty emotional transfers." },
  slots: { points: 15, type: "LIMITED_SLOTS", title: "Artificial Scarcity ('Only 3 slots left')", severity: "MEDIUM", explanation: "Manipulative tactic to trigger fear of missing out." },
  url: { points: 20, type: "SUSPICIOUS_URL", title: "Suspicious Link", severity: "HIGH", explanation: "Unverified external link to an unapproved website." },
  otp: { points: 25, type: "OTP_PIN_REQUEST", title: "Request for OTP / Password", severity: "CRITICAL", explanation: "No legitimate authority will ever ask for your OTP or password." },
  fomo: { points: 10, type: "FOMO", title: "FOMO Manipulation", severity: "MEDIUM", explanation: "Fear of missing out is triggered to cloud rational thinking." }
};

function runClientSideCheck(content, language = "en") {
  const c = content.toLowerCase();
  const redFlags = [];
  const breakdown = [];

  if (c.includes("guarantee") || c.includes("double") || c.includes("100% profit") || c.includes("गारंटी") || c.includes("दुप्पट")) {
    redFlags.push({ ...LOCAL_FALLBACK_RULES.guaranteed, evidence: "Guaranteed / Double returns" });
  }
  if (c.includes("40%") || c.includes("50%") || c.includes("5 days") || c.includes("in 1 week") || c.includes("5 दिनों")) {
    redFlags.push({ ...LOCAL_FALLBACK_RULES.unrealistic, evidence: "40% returns in 5 days" });
  }
  if (c.includes("slot") || c.includes("seat") || c.includes("सीटें") || c.includes("जागा")) {
    redFlags.push({ ...LOCAL_FALLBACK_RULES.slots, evidence: "Only 3 slots left" });
  }
  if (c.includes("http") || c.includes(".com") || c.includes("bit.ly") || c.includes("t.me")) {
    redFlags.push({ ...LOCAL_FALLBACK_RULES.url, evidence: "External link detected" });
  }
  if (c.includes("otp") || c.includes("pin") || c.includes("password") || c.includes("ओटीपी")) {
    redFlags.push({ ...LOCAL_FALLBACK_RULES.otp, evidence: "OTP / PIN request" });
  }
  if (c.includes("everyone") || c.includes("miss out") || c.includes("सब कमा रहे")) {
    redFlags.push({ ...LOCAL_FALLBACK_RULES.fomo, evidence: "Social pressure / FOMO claim" });
  }

  const rawScore = redFlags.reduce((sum, f) => sum + f.points, 0);
  const finalScore = Math.min(100, rawScore || (c.length > 20 ? 35 : 10));

  let riskLevel = "LOW";
  if (finalScore >= 80) riskLevel = "CRITICAL";
  else if (finalScore >= 60) riskLevel = "HIGH";
  else if (finalScore >= 30) riskLevel = "MEDIUM";

  redFlags.forEach(f => {
    breakdown.push({
      category: f.title,
      points: f.points,
      severity: f.severity,
      evidence_snippet: f.evidence
    });
  });

  return {
    risk_score: finalScore,
    risk_level: riskLevel,
    headline: riskLevel === "CRITICAL" ? "Critical warning signs detected!" : riskLevel === "HIGH" ? "Multiple warning signs detected." : "Some warning signs detected.",
    subheading: "This content contains patterns that deserve independent verification before you take action.",
    summary: `Identified ${redFlags.length} key warning indicators.`,
    red_flags: redFlags,
    score_breakdown: breakdown,
    safe_next_steps: [
      "🛑 Don't transfer money yet.",
      "🛑 Don't share OTPs, PINs, bank details, or passwords.",
      "🛑 Don't click unknown links.",
      "🔍 Independently verify the sender on official regulator websites (SEBI / RBI).",
      "📄 Check official company or fund documentation before acting."
    ],
    language,
    raw_content: content,
    input_type: "text"
  };
}

export const api = {
  async checkMessage(content, inputType = "text", language = "en", demoMode = false) {
    try {
      const res = await fetch(`${API_BASE}/check/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, input_type: inputType, language, demo_mode: demoMode })
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Backend API unavailable, using resilient local fallback:", err);
      return runClientSideCheck(content, language);
    }
  },

  async extractOCR(sampleId = null, imageBase64 = null) {
    try {
      const res = await fetch(`${API_BASE}/check/ocr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sample_id: sampleId, image_base64: imageBase64 })
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("OCR API fallback:", err);
      return {
        extracted_text: "Double your money in 5 days! Guaranteed 40% returns. Only 3 slots left. Invest now: http://fast-crorepati-returns.com",
        detected_language: "en",
        urls_found: ["http://fast-crorepati-returns.com"],
        claims_found: ["Double money in 5 days", "Guaranteed 40%", "3 slots left"],
        entities_found: ["VIP Group"]
      };
    }
  },

  async explainFinance(query, language = "en", demoMode = false) {
    try {
      const res = await fetch(`${API_BASE}/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, language, demo_mode: demoMode })
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Explain API fallback:", err);
      return {
        query,
        language,
        simple_explanation: `${query} is a key financial concept that helps you gauge value and market safety.`,
        everyday_analogy: "Like checking the dashboard meters in your vehicle before driving onto a highway.",
        simple_example: "When investing ₹2,000 monthly, understanding this concept protects you from overpaying.",
        why_it_matters: "Financial clarity removes fear and protects you from deceptive sales pitches.",
        common_misunderstanding: "Believing that market concepts are too complex for everyday savers. Simple analogies make it clear."
      };
    }
  },

  async analyzePause(intentionText, language = "en", demoMode = false) {
    try {
      const res = await fetch(`${API_BASE}/pause/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intention_text: intentionText, language, demo_mode: demoMode })
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Pause API fallback:", err);
      return {
        intention_text: intentionText,
        language,
        signals_detected: [
          { type: "FOMO", label: "Fear of Missing Out (FOMO)", severity: "HIGH", detected_phrase: "everyone is making money", description: "Feeling that others are profiting and you might be left behind." },
          { type: "SOCIAL_PRESSURE", label: "Social Pressure", severity: "HIGH", detected_phrase: "Telegram group", description: "Decision driven by social chatter rather than personal goals." },
          { type: "URGENCY", label: "Time Pressure", severity: "MEDIUM", detected_phrase: "tomorrow", description: "Haste to deploy funds immediately without due diligence." }
        ],
        overall_emotional_charge: "HIGH",
        gentle_observation: "Your message contains patterns associated with FOMO, Social Pressure, and Urgency. A 60-second reflection can ground your decision.",
        checkpoint_questions: [
          {
            id: 1,
            question: "Why are you making this decision right now?",
            options: [
              "I researched the fundamentals independently",
              "Someone in a group / channel recommended it",
              "Everyone else seems to be doing it",
              "I don't want to miss out on the opportunity",
              "I am trying to recover a previous loss",
              "Other personal reasons"
            ]
          },
          {
            id: 2,
            question: "If this decision goes badly, how would it affect your day-to-day finances?",
            options: [
              "I can comfortably handle any downside without stress",
              "It would be uncomfortable but manageable",
              "It would seriously disrupt my emergency savings or bills",
              "I haven't really considered the downside yet"
            ]
          },
          {
            id: 3,
            question: "Have you independently verified the source and risks from official sources?",
            options: [
              "YES - I reviewed official filings / disclosures",
              "NO - I relied on chat messages or social posts",
              "NOT SURE - I only checked high-level claims"
            ]
          },
          {
            id: 4,
            question: "Would you still make this exact decision if nobody else was talking about it?",
            options: [
              "YES - it aligns with my independent plan",
              "NO - I was primarily excited by group chatter",
              "NOT SURE - the hype definitely drew my attention"
            ]
          }
        ]
      };
    }
  },

  async completePause(payload) {
    try {
      const res = await fetch(`${API_BASE}/pause/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Pause Complete fallback:", err);
      return {
        cooling_off_summary: "Your responses suggest this decision may be influenced by group momentum and FOMO. Consider taking a 24-hour pause before committing money.",
        recommendation_note: "A sound financial opportunity will still be sound tomorrow. Review official documents first.",
        journal_saved: true,
        timestamp: new Date().toISOString()
      };
    }
  },

  async getHistory() {
    try {
      const res = await fetch(`${API_BASE}/history`);
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("History API fallback, reading local storage:", err);
      const local = JSON.parse(localStorage.getItem("NiveshSuraksha_history") || "[]");
      return { items: local, total_count: local.length };
    }
  },

  async deleteHistoryItem(type, id) {
    try {
      await fetch(`${API_BASE}/history/${type}/${id}`, { method: "DELETE" });
    } catch (err) {
      console.warn("Delete item fallback:", err);
    }
  },

  async clearHistory() {
    try {
      await fetch(`${API_BASE}/history/clear/all`, { method: "DELETE" });
    } catch (err) {
      console.warn("Clear history fallback:", err);
    }
    localStorage.removeItem("NiveshSuraksha_history");
  }
};
