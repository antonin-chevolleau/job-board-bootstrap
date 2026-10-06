from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.errors import ensure_exists, get_or_404
from app.models import Ad, Category, Company
from app.schemas import AdCreate, AdRead

router = APIRouter(tags=["ads"])


@router.get("/companies/{company_id}/ads", response_model=list[AdRead])
def list_company_ads(company_id: int, db: Session = Depends(get_db)):
    get_or_404(db, Company, company_id)
    return db.scalars(select(Ad).where(Ad.company_id == company_id)).all()


@router.get("/ads/{ad_id}", response_model=AdRead)
def get_ad(ad_id: int, db: Session = Depends(get_db)):
    return get_or_404(db, Ad, ad_id)


@router.post("/ads", response_model=AdRead, status_code=201)
def create_ad(ad: AdCreate, db: Session = Depends(get_db)):
    ensure_exists(db, Company, ad.company_id, "company_id")
    ensure_exists(db, Category, ad.category_id, "category_id")

    new_ad = Ad(**ad.model_dump())
    db.add(new_ad)
    db.commit()
    db.refresh(new_ad)
    return new_ad
