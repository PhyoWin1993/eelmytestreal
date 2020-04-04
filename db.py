from helper import *
from sqlalchemy.orm import sessionmaker


Session = sessionmaker(bind=engin)
session = Session()


def createTableNow(name):
    tb = Tables(name=name)
    session.add(tb)
    session.commit()

def getAllTableNow():
    result = session.query(Tables).all()
    return result

def createDishesNow(name,price):
    dh = Dishes(name=name,price=price)
    session.add(dh)
    session.commit()

def getAllDishesNow():
    result = session.query(Dishes).all()
    return result

def update():
    session.commit()

def findById(obj,id):
    return session.query(obj).get(id)
# Testing Under two method
def getTableIdNow(id):
    table = session.query(Tables).get(id)
    return table

def deteteObj(obj):
    session.delete(obj)
    session.commit()

def createOrderNow(table_id,dish_id,price,order_count):
    obj = Orders(table_id=table_id,dish_id=dish_id,price=price,order_count=order_count)
    session.add(obj)
    session.commit()