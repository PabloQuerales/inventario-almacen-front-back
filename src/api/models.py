from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(256), nullable=False)
    first_name = Column(String(120), nullable=False)
    store = relationship("Store", backref="user")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            # do not serialize the password, it's a security breach
        }

class Store(db.Model):
    __tablename__ = 'store'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    name = Column(String(80), nullable=False)
    quantity = Column(Integer, nullable=False)
    type = Column(String(80), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "quantity": self.quantity,
            "type": self.type
        }
