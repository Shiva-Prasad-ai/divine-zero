from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_url: str
    db_name: str = "ev_platform"
    jwt_secret: str
    jwt_expire_minutes: int = 60

    class Config:
        env_file = ".env"

settings = Settings()