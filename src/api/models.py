from typing import List
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base, relationship
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Store(db.Model):
    __tablename__ = 'store'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    quantity = Column(Integer, nullable=False)
    type = Column(String(80), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "quantity": self.quantity,
            "type": self.type
        }
