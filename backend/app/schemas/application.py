from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ApplicationBase(BaseModel):
    person_id: int
    message: str = Field(min_length=1)


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationRead(ApplicationBase):
    id: int
    ad_id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
