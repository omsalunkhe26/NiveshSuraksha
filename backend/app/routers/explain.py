import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import ExplainHistory
from app.schemas import ExplainRequest, ExplainResponse
from app.services.ai_provider import AIProviderService

router = APIRouter(prefix="/api/explain", tags=["NiveshSuraksha Explain"])

@router.post("", response_model=ExplainResponse)
async def explain_finance_concept(req: ExplainRequest, db: AsyncSession = Depends(get_db)):
    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    explanation = await AIProviderService.explain_concept(
        query=req.query.strip(),
        lang=req.language,
        demo_mode=req.demo_mode
    )

    # Persist to database
    history_item = ExplainHistory(
        created_at=datetime.datetime.utcnow(),
        query=req.query.strip(),
        simple_explanation=explanation["simple_explanation"],
        everyday_analogy=explanation["everyday_analogy"],
        simple_example=explanation["simple_example"],
        why_it_matters=explanation["why_it_matters"],
        common_misunderstanding=explanation["common_misunderstanding"],
        language=req.language
    )

    db.add(history_item)
    await db.commit()
    await db.refresh(history_item)

    return ExplainResponse(
        id=history_item.id,
        query=explanation.get("query", req.query),
        language=explanation.get("language", req.language),
        simple_explanation=explanation["simple_explanation"],
        everyday_analogy=explanation["everyday_analogy"],
        simple_example=explanation["simple_example"],
        why_it_matters=explanation["why_it_matters"],
        common_misunderstanding=explanation["common_misunderstanding"],
        key_takeaway=explanation.get("key_takeaway"),
        related_topics=explanation.get("related_topics", [])
    )

@router.get("/topics")
async def list_popular_topics():
    return [
        {"title": "What is NAV?", "query": "What is NAV?", "category": "Mutual Funds"},
        {"title": "What is an IPO?", "query": "What is an IPO?", "category": "Stock Market"},
        {"title": "What is a Mutual Fund?", "query": "What is a mutual fund?", "category": "Investing"},
        {"title": "What is SIP?", "query": "What is SIP?", "category": "Disciplined Investing"},
        {"title": "What is P/E Ratio?", "query": "What is P/E ratio?", "category": "Valuation"},
        {"title": "What is a Demat Account?", "query": "What is a demat account?", "category": "Basics"}
    ]
