let select_tb_id = 0 ;

function createTable(){
    name = document.querySelector('#create_table_name').value ;
    eel.createTable(name)((data)=>{
        document.querySelector('#create_table_name').value="";
        show("tableContainer");
    });
}


function loadAllTables(){
    eel.getAllTable()((datas)=>{
        let str = "";
        let num=1;
        datas.forEach((data) => {
            let bg = data.status == 1 ?'secondary':'success';
            let txt = data.status == 1 ?'Engaged':'     Free    ';
            str+=`
            <tr>
                    <td scope="row">${num}</td>
                    <td>${data.name}</td>
                    <td>
                        <button class="btn btn-success btn-sm bg-${bg}" id="update_table_status" onclick="updateTablestatu(${data.id},${data.status})">${txt}</button>
        
                        <button class="btn btn-info btn-sm" onclick="loadorderbytableid(${data.id})"><i class="fa fa-eye"></i></button>
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm float-left" onclick="getTables(${data.id})"> <i class="fa fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm float-right" onclick="deleteTable(${data.id})"><i class="fa fa-trash"></i></button>
                    </td>
            </tr>
            
            
            
            `;
            num++;

        });
        document.querySelector("#table_rows").innerHTML = str;
    });
}

function createDish(){
    name = document.querySelector('#create_dish_name').value;
    price = document.querySelector('#create_dish_price').value;
    eel.createDish(name,price)(()=>{
        document.querySelector('#create_dish_name').value="";
        document.querySelector('#create_dish_price').value="";
        show("dishesContainer");
    });

}
function loadAllDishes(){
    eel.getAlldishes()((datas)=>{
        let str = "";
        let num = 1;
        datas.forEach((data)=>{
            str+=`
            <tr>
                <td>${num}</td>
                <td>${data.name}</td>
                <td>${data.price}</td>
                <td>
                    <button class="btn btn-warning btn-sm float-left" onclick="loadDishId(${data.id})" ><i class="fa fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm float-right" onclick="deleteDish(${data.id})"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
            
            `
            num++;
        })

        document.querySelector('#dish_rows').innerHTML = str;


    });
}

function deleteTable(id){
    eel.deleteTables(id)(()=>{
        show("tableContainer");
    });
}


function getTables(id){
    eel.getTableById(id)((tbdata)=>{
       
        document.querySelector('#edit_table_name').value = tbdata.name;
        document.querySelector('#edit_table_id').value = tbdata.id;
        show("tableEditContainer");
        
    })

}

upd_tb_bt = document.querySelector('#update_table_bt');
upd_tb_bt.addEventListener('click',function(event){
    event.preventDefault();
    let name = document.querySelector('#edit_table_name').value ;
    let id =document.querySelector('#edit_table_id').value ;
    eel.updateTable(id,name)((data)=>{
        show("tableContainer");
    })
})



function updateTablestatu(id,status){
    status = status == 0? 1: 0 ;
    let stautu = document.querySelector('#update_table_status').value;
    eel.updateTableStatus(id,status)(()=>{
        loadAllTables();
        // show("tableContainer")
    })

}

function deleteDish(id){
    eel.deleteDishes(id)(()=>{
        loadAllDishes();
    })
}


function loadDishId(id){
    
    eel.getDishById(id)((data)=>{
        document.querySelector('#edit_dish_id').value = data.id;
        document.querySelector('#edit_dish_name').value = data.name;
        document.querySelector('#edit_dish_price').value = data.price;
        show("dishEditContainer");
    })
}


function updateDishes(){
        id = document.querySelector('#edit_dish_id').value;
        name = document.querySelector('#edit_dish_name').value ;
        price = document.querySelector('#edit_dish_price').value ;
        eel.updateDish(id,name,price)(()=>{
            show("dishesContainer");
        })
}
create_order_btn = document.querySelector('#create_order_btn');
create_order_btn.addEventListener('click',(event)=>{
    event.preventDefault();
    let tb_id = document.querySelector('#create_order_table_name').value;
    let d_id  = document.querySelector('#create_order_dish_name').value;
    let dish_count = document.querySelector('#create_order_count').value;

    eel.updateTableStatus(tb_id,1)(()=>{
        
    })


    eel.createOrder(tb_id,d_id,dish_count)(()=>{
        alert("success!");
        document.querySelector('#create_order_count').value="";
    })
    
})


function testAlert(){
    eel.getOrderByTbId(4)((data)=>{
        alert("Ok order Table id");
    })
}

function loadorderbytableid(id){
    select_tb_id = id;
    eel.getTbNameById(id)((tbname)=>{
        document.querySelector('#showtableName').innerHTML=tbname ;
    })
    eel.getOrderByTbId(id)((datas)=>{
        
        let all_order_row = document.querySelector('#all_order_row');
        let Str = "";
        let no = 0;
        let grandTotal = 0;
        datas.forEach((data)=>{
            grandTotal+=data.price * data.count;
           
            no++;
            Str +=`
            <tr>
               
                <td>${no}</td>
                
                <td>${data.dishName }</td>
                <td>${data.price }</td>
                <td>${ data.count }</td>
                <td>${data.price * data.count}</td>
             
            </tr>

            
            `
        })
        all_order_row.innerHTML = Str;
        document.querySelector('#grand_total').innerHTML = grandTotal;
        
    });
    
    show("allOrderContainer");
}

function billOut(){

    window.print();
    eel.updateTableStatus(select_tb_id,0)(()=>{

    })

    eel.updateOrderStatus(select_tb_id)(()=>{
        alert("Paied Success");
        show("tableContainer");

    })

}

function loadHistory(){
    
    eel.getHistory()((data)=>{
        let Str = "";

        data.forEach((datas)=>{
            
       Str +=`
     
                <tr>
                            
                    <td>${datas.id}</td>  
                    <td>${datas.tableName}</td>
                    <td>${datas.dishName}</td>
                    <td>${datas.price}</td>
                    <td>${datas.count}</td>
                    <td>${datas.price * datas.count}</td>  
                    <td>${datas.times}</td>
                    
                    </tr>
       
  `
        })
        document.querySelector('#history_tables').innerHTML = Str;

    });
}



function loadCurrentOrder(){
    eel.getCurrentOrder()((datas)=>{
        let Str = "";
        datas.forEach((data)=>{
            Str += `
            <tr>
                    <td>${ data.id }</td>
                    <td> ${data.tableName}</td>
                    <td>${data.dishName}</td>
                    <td>${data.price}</td>
                    <td>${data.count }</td>  
                    <td>${data.times}</td>
                    <td> 
                        <button class="btn btn-danger btn-sm float-rights" onclick="deleteCurrentOrder(${data.id})"><i class="fa fa-trash"></i></button>
                    </td>
            </tr>
            `
        })
        document.querySelector('#all_table_order_row').innerHTML = Str;

    });
}

function deleteCurrentOrder(id){
    eel.deleteCurrentOrder(id)(()=>{
        loadCurrentOrder();
    })
}