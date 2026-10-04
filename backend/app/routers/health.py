from fastapi import APIRouter
from app.config import settings

router = APIRouter(prefix="/api/health", tags=["Health"])

@router.get("")
async def health_check():
    return {
        "status": "healthy",
        "service": "MoneyGuard AI Financial Safety Companion",
        "tagline": "Pause. Verify. Understand.",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "ai_provider_configured": settings.AI_PROVIDER,
        "gemini_api_key_available": bool(settings.GEMINI_API_KEY),
        "demo_mode_ready": True
    }
