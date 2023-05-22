from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Base
from dotenv import dotenv_values

config = dotenv_values(".env")


engine = create_engine(config.get('SQLALCHEMY_DATABASE_URL'))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def create_tables():
    Base.metadata.create_all(bind=engine)
