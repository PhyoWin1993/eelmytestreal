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


# Testing Under two method
def getTableId(id):
    table = session.query(Tables).get(id)
    return table

def deleteTable(obj):
    session.delete(obj)

