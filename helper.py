from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Integer,String,Column,ForeignKey,DateTime
from datetime import datetime
from sqlalchemy.orm import relationship

Base = declarative_base()
engin = create_engine('sqlite:///sales.db',echo=True)

class Tables(Base):
    __tablename__ = 'tables'
    
    id = Column(Integer,primary_key=True)
    name = Column(String)
    status = Column(Integer,default=0)
    order = relationship("Orders",cascade="all,delete")

class Dishes(Base):
    __tablename__= 'dishes'

    id = Column(Integer,primary_key=True)
    name= Column(String)
    price = Column(Integer)
    order = relationship("Orders",cascade="all,delete")

class Orders(Base):
    __tablename__ = 'orders'

    id = Column(Integer,primary_key=True)
    table_id = Column(Integer, ForeignKey("tables.id",ondelete='CASCADE'))
    dish_id = Column(Integer,ForeignKey("dishes.id",ondelete='CASCADE'))
    price = Column(Integer,nullable=False)
    order_count =Column(Integer,default=1)
    status = Column(Integer,default=1)
    date_time = Column(String,default=datetime.now())
    dish = relationship("Dishes",passive_deletes=True,back_populates="orders")
    table = relationship("Tables",passive_deletes=True, back_populates="orders")


Dishes.orders = relationship("Orders",back_populates="dish")
Tables.orders = relationship("Orders",back_populates="table")


Base.metadata.create_all(engin)