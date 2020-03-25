let panels = ["homeContainer", "tableContainer", "dishesContainer", "ordersContainer", "historyContainer", "tableCreateContainer","dishCreateContainers"];

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
    }
   
}
show('homeContainer')
