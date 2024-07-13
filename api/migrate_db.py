from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
from api.models.database_models import Base
from sqlalchemyseed import load_entities_from_json, Seeder
from sqlalchemy.orm import sessionmaker
from datetime import datetime

load_dotenv()

DB_URL = os.getenv("DATABASE_URL")
engine = create_engine(DB_URL, echo=True)
session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def parse_datetime_fields(entity):
    if isinstance(entity, dict):
        for key, value in entity.items():
            if 'create_date' in key or 'update_date' in key or 'start_date' in key or 'end_date' in key:
                entity[key] = datetime.now()
            elif isinstance(value, dict):
                parse_datetime_fields(value)
            elif isinstance(value, list):
                for item in value:
                    parse_datetime_fields(item)
    elif isinstance(entity, list):
        for item in entity:
            parse_datetime_fields(item)


def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    seed_database()

def seed_database():
    session = session_local()
    try:
        seeder = Seeder(session)
        entities = load_entities_from_json('seed_data.json')
        parse_datetime_fields(entities)
        seeder.seed(entities)
        session.commit()
    except Exception as e:
        session.rollback()
        raise
    finally:
        session.close()


if __name__ == "__main__":
    reset_database()