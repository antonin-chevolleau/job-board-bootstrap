from fastapi import HTTPException, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

# Status code policy (see docs/requirements.md):
# - 404 when an id in the URL does not exist
# - 400 when the request body is invalid (missing field, unknown id, ...)


def get_or_404(db: Session, model, object_id: int):
    """Return the row whose id comes from the URL, or answer 404."""
    obj = db.get(model, object_id)
    if obj is None:
        raise HTTPException(status_code=404, detail=f"{model.__name__} not found")
    return obj


def ensure_exists(db: Session, model, object_id: int, field: str):
    """Check that an id sent in the request body exists, or answer 400."""
    if db.get(model, object_id) is None:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid {field}: {model.__name__} {object_id} does not exist",
        )


async def validation_error_handler(request: Request, exc: RequestValidationError):
    """Answer 400 instead of FastAPI's default 422 when the request is invalid."""
    return JSONResponse(
        status_code=400, content={"detail": jsonable_encoder(exc.errors())}
    )
