from pydantic import BaseModel, ConfigDict, Field


class AdBase(BaseModel):
    title: str = Field(min_length=1)
    description: str = Field(min_length=1)
    company_id: int
    category_id: int


class AdCreate(AdBase):
    pass


class AdRead(AdBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
