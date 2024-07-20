from sqlalchemy import String, Integer, DateTime, Boolean, ForeignKey, Column, Float,func
from sqlalchemy.orm import relationship
from api.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), index=True)
    photo_id = Column(Integer, ForeignKey("photos.id"), index=True)
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
    # photo = relationship("Photo", back_populates="event", foreign_keys=[photo_id])

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    create_date = Column(DateTime)
    update_date = Column(DateTime)

    events = relationship("Event", back_populates="organization")
    users = relationship("User", back_populates="organization")



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

    # event = relationship("Event", back_populates="photo", foreign_keys=[event_id])

class MobileUser(Base):
    __tablename__ = "mobile_users"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    created_date = Column(DateTime, default=func.now())
    updated_date = Column(DateTime, default=func.now(), onupdate=func.now())

class Photo2MobileUser(Base):
    __tablename__ = "photo2mobileuser"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    photo_id = Column(Integer, ForeignKey('photos.id'), index=True)
    user_id = Column(String, ForeignKey('mobile_users.id'), index=True)
    created_date = Column(DateTime, default=func.now())
    score = Column(Integer,index=True)
    # リレーションシップの定義（オプション）


# authとの結合時に使うところ
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    organization = relationship("Organization", back_populates="users")
