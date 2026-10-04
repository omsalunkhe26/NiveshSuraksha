import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import init_db
from app.routers import check, explain, pause, history, health

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("moneyguard")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🛡️ Initializing MoneyGuard Database and Services...")
    await init_db()
    logger.info(f"🛡️ MoneyGuard v{settings.VERSION} backend running on port {settings.PORT} (AI Provider: {settings.AI_PROVIDER})")
    yield
    logger.info("🛡️ MoneyGuard backend shutting down gracefully.")

app = FastAPI(
    title="MoneyGuard - AI Financial Safety Companion",
    description="Backend API for SANGYAN Investor Resilience Hackathon 2026. 'Pause. Verify. Understand.'",
    version=settings.VERSION,
    lifespan=lifespan
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permissive for easy local prototype dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled server error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "MoneyGuard couldn't complete the analysis.",
            "detail": "An internal error occurred. Please try again or switch to Demo Mode.",
            "suggestion": "MoneyGuard provides educational financial safety guidance."
        }
    )

# Include API Routers
app.include_router(health.router)
app.include_router(check.router)
app.include_router(explain.router)
app.include_router(pause.router)
app.include_router(history.router)

@app.get("/")
async def root():
    return {
        "app": "MoneyGuard - AI Financial Safety Companion",
        "tagline": "Pause. Verify. Understand.",
        "hackathon": "SANGYAN Investor Resilience Hackathon 2026",
        "status": "online",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
