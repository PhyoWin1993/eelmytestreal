import eel
from db import *


eel.init("web")

@eel.expose
def createTable(name):
    createTableNow(name)
    return name

@eel.expose
def getAllTable():
    tableList = []
    row = getAllTableNow()

    for rows in row:
        table = {"id":rows.id,"name":rows.name}
        tableList.append(table)
    return tableList


@eel.expose
def createDish(name,price):
    createDishesNow(name,price)

@eel.expose
def getAlldishes():
    dishList = []
    row = getAllDishesNow()

    for rows in row:
        dishTB = {"id":rows.id,"name":rows.name,"price":rows.price}
        dishList.append(dishTB)
    return dishList

    


# test Method tod delete
@eel.expose
def delete(id):
    obj =  getTableId(id)
    delete(obj)

eel.start("index.html")


