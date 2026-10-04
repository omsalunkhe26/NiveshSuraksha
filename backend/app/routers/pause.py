import json
import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.database import get_db
from app.models import PauseSession
from app.schemas import (
    PauseAnalyzeRequest,
    PauseAnalyzeResponse,
    PauseCompleteRequest,
    PauseCompleteResponse
)
from app.services.behavioral_engine import BehavioralEngine

router = APIRouter(prefix="/api/pause", tags=["NiveshSuraksha Pause"])

@router.post("/analyze", response_model=PauseAnalyzeResponse)
async def analyze_pause_intention(req: PauseAnalyzeRequest):
    if not req.intention_text or not req.intention_text.strip():
        raise HTTPException(status_code=400, detail="Intention text cannot be empty.")

    analysis = BehavioralEngine.analyze_intention(
        intention_text=req.intention_text.strip(),
        lang=req.language
    )

    return PauseAnalyzeResponse(
        intention_text=analysis["intention_text"],
        language=analysis["language"],
        signals_detected=analysis["signals_detected"],
        overall_emotional_charge=analysis["overall_emotional_charge"],
        gentle_observation=analysis["gentle_observation"],
        checkpoint_questions=analysis["checkpoint_questions"]
    )

@router.post("/complete", response_model=PauseCompleteResponse)
async def complete_pause_session(req: PauseCompleteRequest, db: AsyncSession = Depends(get_db)):
    result = BehavioralEngine.evaluate_cooling_off(
        intention_text=req.intention_text,
        signals=req.signals_detected,
        answers=req.answers,
        lang=req.language
    )

    signals_dicts = [s.model_dump() for s in req.signals_detected]
    answers_dicts = [a.model_dump() for a in req.answers]

    pause_record = PauseSession(
        created_at=datetime.datetime.utcnow(),
        intention_text=req.intention_text,
        signals_json=json.dumps(signals_dicts, ensure_ascii=False),
        reflection_answers_json=json.dumps(answers_dicts, ensure_ascii=False),
        cooling_off_summary=result["cooling_off_summary"],
        journal_entry=req.journal_entry,
        language=req.language
    )

    db.add(pause_record)
    await db.commit()
    await db.refresh(pause_record)

    return PauseCompleteResponse(
        id=pause_record.id,
        cooling_off_summary=result["cooling_off_summary"],
        recommendation_note=result["recommendation_note"],
        journal_saved=bool(req.journal_entry and req.journal_entry.strip()),
        timestamp=pause_record.created_at.isoformat()
    )

@router.get("/journal")
async def list_decision_journal_entries(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(PauseSession)
        .where(PauseSession.journal_entry.is_not(None))
        .where(PauseSession.journal_entry != "")
        .order_by(desc(PauseSession.created_at))
        .limit(20)
    )
    result = await db.execute(stmt)
    records = result.scalars().all()

    return [
        {
            "id": r.id,
            "created_at": r.created_at.isoformat(),
            "intention_text": r.intention_text,
            "journal_entry": r.journal_entry,
            "cooling_off_summary": r.cooling_off_summary,
            "signals": json.loads(r.signals_json) if r.signals_json else [],
            "language": r.language
        }
        for r in records
    ]
