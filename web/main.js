let panels = ["homeContainer", "tableContainer", "dishesContainer", "ordersContainer", "historyContainer", "tableCreateContainer","dishCreateContainers","tableEditContainer","dishEditContainer","allOrderContainer","allTableOrderCntainer"];

function show(container) {
    console.log(container);
    panels.forEach((panel) => {
        document.querySelector('#' + panel).style.display = "none";
    });
    document.querySelector("#" + container).style.display = "block";

    if (container == "tableContainer"){
        loadAllTables();
    }else if(container=="dishesContainer"){
        loadAllDishes();
    }else if(container == "ordersContainer"){
        loadOptionList();
    }else if(container=="historyContainer"){
        loadHistory();
    }else if(container == "allTableOrderCntainer"){
        loadCurrentOrder();
    }
   
}


function loadOptionList(){
    eel.loadDishAndTable()((data)=>{
        let create_order_table_name = document.querySelector("#create_order_table_name") ;
        let create_order_dish_name = document.querySelector("#create_order_dish_name") ;
        let tbStr = "";
        dishStr = "";
        data.tables.forEach((tbdata)=>{
            tbStr += `
            <option value="${tbdata.id}">${tbdata.name}</option>
            `;
        });
        data.dishes.forEach((dishdata)=>{
            dishStr += `
            <option value="${dishdata.id}">${dishdata.name}</option>
            `;
        });
        create_order_table_name.innerHTML = tbStr;
        create_order_dish_name.innerHTML = dishStr;

    })
}
show('homeContainer')
