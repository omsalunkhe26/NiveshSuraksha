from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
import datetime

# --- Scam Checker Schemas ---

class RedFlagItem(BaseModel):
    type: str # e.g. GUARANTEED_RETURNS, URGENCY
    title: str # User-friendly title e.g. "Guaranteed Returns"
    severity: str # LOW, MEDIUM, HIGH, CRITICAL
    points: int # Points contributed to deterministic score
    evidence: str # Quote or extracted proof from content
    explanation: str # Why it matters
    icon: Optional[str] = None

class ScoreBreakdownItem(BaseModel):
    category: str
    points: int
    severity: str
    evidence_snippet: str

class CheckRequest(BaseModel):
    content: str
    input_type: str = "text" # text, screenshot, voice
    language: str = "en" # en, hi, mr
    demo_mode: bool = False

class CheckResponse(BaseModel):
    id: Optional[int] = None
    created_at: Optional[str] = None
    input_type: str
    raw_content: str
    risk_score: int # 0 - 100
    risk_level: str # LOW, MEDIUM, HIGH, CRITICAL
    headline: str
    subheading: str
    summary: str
    red_flags: List[RedFlagItem]
    score_breakdown: List[ScoreBreakdownItem]
    safe_next_steps: List[str]
    language: str
    extracted_entities: Optional[Dict[str, Any]] = None

class OCRExtractRequest(BaseModel):
    image_base64: Optional[str] = None
    sample_id: Optional[str] = None

class OCRExtractResponse(BaseModel):
    extracted_text: str
    detected_language: Optional[str] = "en"
    urls_found: List[str] = []
    claims_found: List[str] = []
    entities_found: List[str] = []

# --- Explain Finance Schemas ---

class ExplainRequest(BaseModel):
    query: str
    language: str = "en" # en, hi, mr
    demo_mode: bool = False

class ExplainResponse(BaseModel):
    id: Optional[int] = None
    query: str
    language: str
    simple_explanation: str
    everyday_analogy: str
    simple_example: str
    why_it_matters: str
    common_misunderstanding: str
    key_takeaway: Optional[str] = None
    related_topics: Optional[List[str]] = []

# --- Pause & Reflect Schemas ---

class BehavioralSignal(BaseModel):
    type: str # FOMO, URGENCY, SOCIAL_PRESSURE, LOSS_CHASING, REVENGE_BEHAVIOUR, etc.
    label: str # "FOMO", "Social Pressure"
    severity: str # LOW, MEDIUM, HIGH
    detected_phrase: str # snippet from user's message
    description: str # Non-judgmental explanation

class PauseAnalyzeRequest(BaseModel):
    intention_text: str
    language: str = "en"
    demo_mode: bool = False

class PauseAnalyzeResponse(BaseModel):
    intention_text: str
    language: str
    signals_detected: List[BehavioralSignal]
    overall_emotional_charge: str # LOW, MEDIUM, HIGH, INTENSE
    gentle_observation: str # "Your message contains language associated with..."
    checkpoint_questions: List[Dict[str, Any]]

class ReflectionAnswer(BaseModel):
    question_id: int
    question_text: str
    selected_option: str

class PauseCompleteRequest(BaseModel):
    intention_text: str
    signals_detected: List[BehavioralSignal]
    answers: List[ReflectionAnswer]
    journal_entry: Optional[str] = None
    language: str = "en"

class PauseCompleteResponse(BaseModel):
    id: Optional[int] = None
    cooling_off_summary: str
    recommendation_note: str
    journal_saved: bool
    timestamp: str

# --- History Schemas ---

class HistoryItem(BaseModel):
    id: int
    type: str # check, explain, pause
    title: str
    subtitle: str
    created_at: str
    risk_level: Optional[str] = None
    risk_score: Optional[int] = None
    details: Dict[str, Any]
    language: str

class HistoryListResponse(BaseModel):
    items: List[HistoryItem]
    total_count: int
