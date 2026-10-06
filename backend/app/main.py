from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from app.errors import validation_error_handler
from app.routers import ads, applications

app = FastAPI()

app.add_exception_handler(RequestValidationError, validation_error_handler)

app.include_router(ads.router)
app.include_router(applications.router)
