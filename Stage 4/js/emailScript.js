/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var cart = JSON.parse(localStorage.getItem("cart"));
    console.log("cart");
    console.log(cart);

    let cost = 0;
    let subtotal = 0;
    let tax = 0;
    let id_counter = 321;

    function getTotal(data){
        cost = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i] == null){
                continue;
            } else{
                var item = data[i].price * data[i].quantity;
                cost = cost + item;
            }
            var item = data[i].price * data[i].quantity;
            cost = cost + item;
    }

    var quant = 0;
    for (let i = 0; i < data.length; i++) {
        if(data[i] == null){
            continue;
        } else{
            var item = data[i].quantity;
            quant = quant + item;
        }
    }

    //   data.push({
    //         flavor: 'Price before tax',
    //         quantity: 1,
    //         price: cost

    //     });

        subtotal = cost;
        tax = (cost*0.06);
        cost = subtotal+tax;

        // data.push({
        //     flavor: 'Price after tax',
        //     quantity: quant,
        //     totalCost: cost

        // });

        function passCartBack() {
            alert(JSON.stringify(cart));
            localStorage.setItem("listCard", JSON.stringify(cart));
        }

        function handleToGoBackClick() {
            console.log("handling to go click");
            passCartBack();
        }

        var anchorElement = document.querySelector('#go-back-1');
        anchorElement.addEventListener('click', handleToGoBackClick);
        anchorElement = document.querySelector('#go-back-2');
        anchorElement.addEventListener('click', handleToGoBackClick);

    }

    var d = new Date();


    function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let i=0; i < 2; i++) {
        let th = document.createElement("th");
        let text = "hi";
        th.appendChild(text);
        row.appendChild(th);
    }
    }

    function generateTable(table, data) {
        var i = 0;

       var orderArrayHeader = ["Name", "Quantity", "Cost"];
       var thead = document.createElement('thead');

       table.appendChild(thead);

       for(var i=0; i<orderArrayHeader.length; i++){
           thead.appendChild(document.createElement("th")).appendChild(document.createTextNode(orderArrayHeader[i]));
       }




    for (let element of data) {
        if(element == null){
            console.log("Element was null")
        } else{
            let row = table.insertRow();

            let cell = row.insertCell();
            let text = document.createTextNode(element["flavor"]);
            cell.appendChild(text);



            let cell2 = row.insertCell();
            let text2 = document.createTextNode(element['quantity']);

            cell2.appendChild(text2);


            let cell3 = row.insertCell();
            let text3 = document.createTextNode(element['price'] * element['quantity']);

            cell3.appendChild(text3);

            i++;
        }

    }

        let row = table.insertRow();

        let cell = row.insertCell();
        let text = document.createTextNode('Tax');
        cell.colSpan = 2;
        cell.appendChild(text);



        //let cell2 = row.insertCell();
        //let text2 = document.createTextNode('');

        //cell2.appendChild(text2);


        let cell3 = row.insertCell();
        let text3 = document.createTextNode(tax.toFixed(2));

        cell3.appendChild(text3);

        row = table.insertRow();

        cell = row.insertCell();
        text = document.createTextNode('Total');
        cell.colSpan = 2;
        cell.appendChild(text);



        //cell2 = row.insertCell();
        //text2 = document.createTextNode('');

        //cell2.appendChild(text2);


        cell3 = row.insertCell();
        text3 = document.createTextNode(cost.toFixed(2));

        cell3.appendChild(text3);

    }

    let table = document.getElementById("order");
    getTotal(cart);
    generateTable(table, cart);




    let orderItems = [];

    function orderItem(data){
        for (let i = 0; i < data.length; i++) {
            if(data[i] == null){
                continue;
            } else{
                let id = data[i].id;
                let quantity = data[i].quantity;

                orderItems.push(
                    {
                        id: id,
                        quantity: quantity

                    }

                );
            }
        }


    }

    orderItem(cart);

    let c = cost.toFixed(2);
    const y = document.getElementById("total");
    y.innerHTML = "Is $" + c + " okay?";



    var d = new Date();
    var id_value = 4;
    var email_value  = "hi@gmail.com";
    var date_value  = d;
    var totalAmount_value  = cost;
    var paymentMethod_value  = "debit";
    var paymentStatus_value  = "incomplete";
    var orderItems_value  = orderItems;

    var trans = [
        {id: 4, email: email_value, date: date_value, totalAmount: totalAmount_value, paymentMethod: paymentMethod_value, paymentStatus: paymentStatus_value}
    ];
    localStorage.setItem("action2", JSON.stringify(trans));

