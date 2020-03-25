from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Integer,String,Column
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
    
Base.metadata.create_all(engin)