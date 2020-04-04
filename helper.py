from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Integer,String,Column,ForeignKey,DateTime
from datetime import datetime
Base = declarative_base()
engin = create_engine('sqlite:///sales.db',echo=True)

class Tables(Base):
    __tablename__ = 'tables'
    
    id = Column(Integer,primary_key=True)
    name = Column(String)
    status = Column(Integer,default=0)

class Dishes(Base):
    __tablename__= 'dishes'

    id = Column(Integer,primary_key=True)
    name= Column(String)
    price = Column(Integer)

class Orders(Base):
    __tablename__ = 'orders'

    id = Column(Integer,primary_key=True)
    table_id = Column(Integer,ForeignKey("tables.id"))
    dish_id = Column(Integer,ForeignKey("dishes.id"))
    price = Column(Integer,nullable=False)
    order_count =Column(Integer,default=1)
    status = Column(Integer,default=1)
    date_time = Column(DateTime,default=datetime.now())

    # dish = relationship("Dishes",back_populate="order")
    # table = relationship("Tables",back_populate="order")




Base.metadata.create_all(engin)