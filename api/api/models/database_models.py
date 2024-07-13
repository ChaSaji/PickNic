from sqlalchemy import String, Integer, DateTime, Boolean, ForeignKey, Column, Float
from sqlalchemy.orm import relationship
from api.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), index=True)
    event_name = Column(String)
    target_name = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    description = Column(String)
    create_date = Column(DateTime)
    update_date = Column(DateTime)
    status = Column(Boolean)

    organization = relationship("Organization", back_populates="events")
    event_badge = relationship("EventBadge", back_populates="event")
    photo = relationship("Photo", back_populates="event")

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    create_date = Column(DateTime)
    update_date = Column(DateTime)

    events = relationship("Event", back_populates="organization")
    admin_users = relationship("AdminUser", back_populates="organization")

class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    organizer_id = Column(Integer, ForeignKey("organizations.id"))
    email = Column(String)
    password = Column(String)
    name = Column(String)
    create_date = Column(DateTime)
    update_date = Column(DateTime)

    organization = relationship("Organization", back_populates="admin_users")

class EventBadge(Base):
    __tablename__ = "event_badges"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey("events.id"), index=True)
    name = Column(String)
    pass_2_photo = Column(String)
    create_date = Column(DateTime)
    update_date = Column(DateTime)

    event = relationship("Event", back_populates="event_badge")

class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey("events.id"), index=True)
    pass_2_photo = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    create_date = Column(DateTime)
    update_date = Column(DateTime)

    event = relationship("Event", back_populates="photo")

# authとの結合時に使うところ
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
