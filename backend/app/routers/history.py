import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, delete
from app.database import get_db
from app.models import CheckHistory, ExplainHistory, PauseSession
from app.schemas import HistoryItem, HistoryListResponse

router = APIRouter(prefix="/api/history", tags=["History"])

@router.get("", response_model=HistoryListResponse)
async def get_history(db: AsyncSession = Depends(get_db)):
    items = []

    # Fetch Checks
    check_stmt = select(CheckHistory).order_by(desc(CheckHistory.created_at)).limit(30)
    check_res = await db.execute(check_stmt)
    for c in check_res.scalars().all():
        try:
            flags = json.loads(c.red_flags_json)
        except Exception:
            flags = []
        flag_titles = ", ".join([f.get("title", "") for f in flags[:2]]) or "No warning signs"
        items.append(
            HistoryItem(
                id=c.id,
                type="check",
                title=f"{c.risk_level} RISK - Score {c.risk_score}/100",
                subtitle=f"{flag_titles} • {c.raw_content[:60]}...",
                created_at=c.created_at.strftime("%b %d, %Y %I:%M %p"),
                risk_level=c.risk_level,
                risk_score=c.risk_score,
                details={
                    "raw_content": c.raw_content,
                    "input_type": c.input_type,
                    "summary": c.summary,
                    "red_flags": flags,
                    "breakdown": json.loads(c.breakdown_json) if c.breakdown_json else [],
                    "safe_steps": json.loads(c.safe_steps_json) if c.safe_steps_json else []
                },
                language=c.language
            )
        )

    # Fetch Explains
    explain_stmt = select(ExplainHistory).order_by(desc(ExplainHistory.created_at)).limit(30)
    explain_res = await db.execute(explain_stmt)
    for e in explain_res.scalars().all():
        items.append(
            HistoryItem(
                id=e.id,
                type="explain",
                title=f"Educational: {e.query}",
                subtitle=f"{e.simple_explanation[:90]}...",
                created_at=e.created_at.strftime("%b %d, %Y %I:%M %p"),
                risk_level="EDUCATIONAL",
                risk_score=None,
                details={
                    "query": e.query,
                    "simple_explanation": e.simple_explanation,
                    "everyday_analogy": e.everyday_analogy,
                    "simple_example": e.simple_example,
                    "why_it_matters": e.why_it_matters,
                    "common_misunderstanding": e.common_misunderstanding
                },
                language=e.language
            )
        )

    # Fetch Pauses
    pause_stmt = select(PauseSession).order_by(desc(PauseSession.created_at)).limit(30)
    pause_res = await db.execute(pause_stmt)
    for p in pause_res.scalars().all():
        try:
            signals = json.loads(p.signals_json)
        except Exception:
            signals = []
        sig_labels = ", ".join([s.get("label", "") for s in signals[:2]]) or "Reflective Session"
        items.append(
            HistoryItem(
                id=p.id,
                type="pause",
                title=f"Pause & Reflect: {sig_labels}",
                subtitle=f"{p.intention_text[:70]}...",
                created_at=p.created_at.strftime("%b %d, %Y %I:%M %p"),
                risk_level="BEHAVIORAL",
                risk_score=None,
                details={
                    "intention_text": p.intention_text,
                    "signals": signals,
                    "cooling_off_summary": p.cooling_off_summary,
                    "journal_entry": p.journal_entry,
                    "answers": json.loads(p.reflection_answers_json) if p.reflection_answers_json else []
                },
                language=p.language
            )
        )

    # Sort combined items by datetime
    return HistoryListResponse(
        items=sorted(items, key=lambda x: x.created_at, reverse=True),
        total_count=len(items)
    )

@router.delete("/{item_type}/{item_id}")
async def delete_history_item(item_type: str, item_id: int, db: AsyncSession = Depends(get_db)):
    if item_type == "check":
        stmt = delete(CheckHistory).where(CheckHistory.id == item_id)
    elif item_type == "explain":
        stmt = delete(ExplainHistory).where(ExplainHistory.id == item_id)
    elif item_type == "pause":
        stmt = delete(PauseSession).where(PauseSession.id == item_id)
    else:
        raise HTTPException(status_code=400, detail="Invalid item type.")

    await db.execute(stmt)
    await db.commit()
    return {"status": "success", "message": f"Deleted {item_type} record #{item_id}"}

@router.delete("/clear/all")
async def clear_all_history(db: AsyncSession = Depends(get_db)):
    await db.execute(delete(CheckHistory))
    await db.execute(delete(ExplainHistory))
    await db.execute(delete(PauseSession))
    await db.commit()
    return {"status": "success", "message": "All MoneyGuard history cleared."}
