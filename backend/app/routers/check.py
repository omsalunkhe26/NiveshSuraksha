import json
import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import CheckHistory
from app.schemas import CheckRequest, CheckResponse, OCRExtractRequest, OCRExtractResponse
from app.services.ai_provider import AIProviderService
from app.services.ocr_service import OCRService, SAMPLE_SCREENSHOT_DATA

router = APIRouter(prefix="/api/check", tags=["NiveshSuraksha Check"])

@router.post("/analyze", response_model=CheckResponse)
async def analyze_message(req: CheckRequest, db: AsyncSession = Depends(get_db)):
    if not req.content or not req.content.strip():
        raise HTTPException(status_code=400, detail="Content cannot be empty.")

    # Run multi-step pipeline
    analysis = await AIProviderService.analyze_message_content(
        content=req.content,
        lang=req.language,
        demo_mode=req.demo_mode
    )

    # Persist to database for history
    red_flags_dicts = [flag.model_dump() for flag in analysis["red_flags"]]
    breakdown_dicts = [item.model_dump() for item in analysis["score_breakdown"]]

    history_item = CheckHistory(
        created_at=datetime.datetime.utcnow(),
        input_type=req.input_type,
        raw_content=req.content,
        risk_score=analysis["risk_score"],
        risk_level=analysis["risk_level"],
        summary=analysis["summary"],
        red_flags_json=json.dumps(red_flags_dicts, ensure_ascii=False),
        breakdown_json=json.dumps(breakdown_dicts, ensure_ascii=False),
        safe_steps_json=json.dumps(analysis["safe_next_steps"], ensure_ascii=False),
        language=req.language
    )

    db.add(history_item)
    await db.commit()
    await db.refresh(history_item)

    return CheckResponse(
        id=history_item.id,
        created_at=history_item.created_at.isoformat(),
        input_type=req.input_type,
        raw_content=req.content,
        risk_score=analysis["risk_score"],
        risk_level=analysis["risk_level"],
        headline=analysis["headline"],
        subheading=analysis["subheading"],
        summary=analysis["summary"],
        red_flags=analysis["red_flags"],
        score_breakdown=analysis["score_breakdown"],
        safe_next_steps=analysis["safe_next_steps"],
        language=req.language
    )

@router.post("/ocr", response_model=OCRExtractResponse)
async def extract_ocr(req: OCRExtractRequest):
    if req.sample_id:
        return OCRService.extract_from_sample(req.sample_id)
    elif req.image_base64:
        return OCRService.extract_from_image_data(req.image_base64)
    else:
        raise HTTPException(status_code=400, detail="Either image_base64 or sample_id must be provided.")

@router.get("/samples")
async def list_ocr_samples():
    """
    Returns preset sample screenshots metadata for quick 1-click testing in the UI.
    """
    return [
        {
            "id": k,
            "title": v["title"],
            "category": v["category"],
            "preview": v["extracted_text"][:100] + "..."
        }
        for k, v in SAMPLE_SCREENSHOT_DATA.items()
    ]
