from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routes.health import router as health_router
from app.routes.platform import router as platform_router
from app.routes.fleet import router as fleet_router
from app.routes.etickets import router as etickets_router
from app.routes.dispatch import router as dispatch_router
from app.routes.reports import router as reports_router
from app.routes.ai import router as ai_router


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Future AtlasBlake Technologies platform backend.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix=settings.API_PREFIX)
app.include_router(platform_router, prefix=settings.API_PREFIX)
app.include_router(fleet_router, prefix=settings.API_PREFIX)
app.include_router(etickets_router, prefix=settings.API_PREFIX)
app.include_router(dispatch_router, prefix=settings.API_PREFIX)
app.include_router(reports_router, prefix=settings.API_PREFIX)
app.include_router(ai_router, prefix=settings.API_PREFIX)


@app.get("/")
def root():
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.APP_ENV,
        "status": "running",
    }