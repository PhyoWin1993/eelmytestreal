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
        table = {"id":rows.id,"name":rows.name,"status":rows.status}
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

    
@eel.expose
def getTableById(id):
    result =  findById(Tables,id)
    obj = {"id":result.id,"name":result.name}
    return obj

@eel.expose
def updateTable(id,name):
    resul =findById(Tables,id)
    resul.name = name
    update()
    

@eel.expose
def getTbNameById(id):
    result =findById(Tables,id)
    return result.name
    


@eel.expose
def updateTableStatus(id,status):
    resul =findById(Tables,id)
    resul.status = status
    update()

# test Method tod delete 
@eel.expose
def deleteTables(id):
    obj =  getTableIdNow(id)
    deteteObj(obj)
    
@eel.expose
def deleteDishes(id):
    obj =findById(Dishes,id)
    deteteObj(obj)
    
    
@eel.expose
def updateDish(id,name,price):
    result = findById(Dishes,id)
    result.name= name 
    result.price = price
    update()


@eel.expose
def getDishById(id):
    result =  findById(Dishes,id)
    obj = {"id":result.id,"name":result.name,"price":result.price}
    return obj


@eel.expose
def createOrder(table_id,dish_id,order_count):
    obj =findById(Dishes,dish_id)
    print(obj.price)
    createOrderNow(table_id,dish_id,obj.price,order_count)



@eel.expose
def loadDishAndTable():
    obj = {"tables":getAllTable(),"dishes":getAlldishes()}
    return obj

@eel.expose
def getOrderByTbId(id):
    results = search(Orders,id,1) 
    resultList = list()
    for result in results:
        obj = {"id":result.id,"tableName":result.table.name,"dishName":result.dish.name,"price":result.price,"count":result.order_count,"status":result.status}
        resultList.append(obj)
    return resultList

@eel.expose
def updateOrderStatus(id):
    results = search(Orders,id,1)
    for result in results:
        result.status=0   
    update()



@eel.expose
def getHistory():
    results = searchHistoryNow(Orders,0) 
    resultList = list()
    for result in results:
        obj = {"id":result.id,"tableName":result.table.name,"dishName":result.dish.name,"price":result.price,"count":result.order_count,"times":result.date_time}
        resultList.append(obj)
        
    
    return resultList


eel.start("index.html")



