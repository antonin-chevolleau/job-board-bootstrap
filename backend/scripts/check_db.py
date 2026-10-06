"""Print the ads and applications stored in the database.

Quick way to check that the API can reach MySQL. Run from backend/:
    python -m scripts.check_db
"""

from sqlalchemy import select

from app.database import SessionLocal
from app.models import Ad, Application


def main():
    with SessionLocal() as db:
        for ad in db.scalars(select(Ad)):
            print(ad.id, ad.title, ad.company_id, ad.category_id)

        for application in db.scalars(select(Application)):
            print(
                application.id,
                application.person_id,
                application.ad_id,
                application.created_at,
            )


if __name__ == "__main__":
    main()
