import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Float
from app.database import Base

class CheckHistory(Base):
    __tablename__ = "check_history"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    input_type = Column(String(50), default="text") # text, screenshot, voice
    raw_content = Column(Text, nullable=False)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String(20), nullable=False) # LOW, MEDIUM, HIGH, CRITICAL
    summary = Column(Text, nullable=False)
    red_flags_json = Column(Text, nullable=False) # JSON string
    breakdown_json = Column(Text, nullable=False) # JSON string
    safe_steps_json = Column(Text, nullable=False) # JSON string
    language = Column(String(10), default="en")

class ExplainHistory(Base):
    __tablename__ = "explain_history"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    query = Column(String(255), nullable=False)
    simple_explanation = Column(Text, nullable=False)
    everyday_analogy = Column(Text, nullable=False)
    simple_example = Column(Text, nullable=False)
    why_it_matters = Column(Text, nullable=False)
    common_misunderstanding = Column(Text, nullable=False)
    language = Column(String(10), default="en")

class PauseSession(Base):
    __tablename__ = "pause_sessions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    intention_text = Column(Text, nullable=False)
    signals_json = Column(Text, nullable=False) # JSON array of signals detected
    reflection_answers_json = Column(Text, nullable=True) # JSON answers
    cooling_off_summary = Column(Text, nullable=False)
    journal_entry = Column(Text, nullable=True)
    language = Column(String(10), default="en")
