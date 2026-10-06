from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Ad(Base):
    __tablename__ = "ads"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
