from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.errors import ensure_exists, get_or_404
from app.models import Ad, Application, Person
from app.schemas import ApplicationCreate, ApplicationRead

router = APIRouter(tags=["applications"])


@router.post(
    "/ads/{ad_id}/applications", response_model=ApplicationRead, status_code=201
)
def create_application(
    ad_id: int, application: ApplicationCreate, db: Session = Depends(get_db)
):
    get_or_404(db, Ad, ad_id)
    ensure_exists(db, Person, application.person_id, "person_id")

    new_application = Application(ad_id=ad_id, **application.model_dump())
    db.add(new_application)
    db.commit()
    db.refresh(new_application)
    return new_application
