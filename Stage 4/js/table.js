//import openConnectionToDatabase from './db.js';

document.addEventListener('DOMContentLoaded', () => {
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
            //var item = data[i].price * data[i].quantity;
            //cost = cost + item;
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


        subtotal = cost;
        tax = (cost*0.06);
        cost = subtotal+tax;



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

    let datetime = "2023-05-09T17:36:36.380Z";

    let date = datetime.split('T')[0];

    console.log(date); // Outputs: "2023-05-09"


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

    let table = document.getElementById("test");
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
    const y = document.getElementById("long");
    y.innerHTML = "Is $" + c + " okay?";


    let order = "On " + date + " you ordered,"
    function getOrder(data){
        for (let i = 0; i < data.length; i++) {
            if(data[i] == null){
                continue;
            } else{
                var item = data[i].flavor;
                var quantity = data[i].quantity;
                var price = data[i].price*data[i].quantity;
                price = price.toFixed(2);
                order = order + " \n" + quantity + " " + item + " icecreams for $" + price+ ".";
            }

        }
        order = order + "\nThe total was: " + c + ".";
        order = order + "\nThe payment method was: " + String(document.getElementById("paymentMethod").value) + ".";
        order = order + "\nThank you for choosing Ultimate Ice Cream";


    }
    getOrder(cart);

    async function addTransaction() {
        console.log("add stop stop stop")
        var d = date;
        var id_value = 355;
        var email_value  = String(document.getElementById("email").value);
        var date_value  = d;
        var totalAmount_value  = parseFloat(cost);
        var paymentMethod_value  = String(document.getElementById("paymentMethod").value);
        var paymentStatus_value  = "incomplete";

        let transactionData = {
            id: id_value,
            email: email_value,
            date: date_value,
            totalAmount: totalAmount_value,
            paymentMethod: paymentMethod_value,
            paymentStatus: paymentStatus_value,
            orderItems: String(order)
        };

        try {
            console.log("try");
            const response = await fetch('/transaction/add' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData)
            });
            console.log("await")
            const data = await response.json();
            console.log("response")
            if (data.status === 'success') {
                alert('Order Approved');

                try {
                    console.log("try");
                    const response = await fetch('/email' , {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(transactionData)
                    });
                    console.log("await")
                    const data = await response.json();
                    console.log("response")
                    if (data.status === 'success') {
                        alert('Confirmation email sent');
                    } else {
                        alert('Error: ' + data.message);
                    }
                }
                catch (error) {

                    alert('Error: Unable to send confirmation email');
                }


            } else {
                alert('Error: ' + data.message);
            }
            cart=[];
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        catch (error) {

            alert('Error: Unable to add product');
        }




    }


    function submit(){
        console.log("start submit");
        let email = document.getElementById("email").value;
        if(email == ""){
            alert("enter an email address");
            e.preventDefault();
        }

        if(email.indexOf("@")<1){
            alert("Please enter a valid email address.");
            e.preventDefault();
        }

        let card = document.getElementById("card").value;
        if(card == ""){
            alert("please enter your card number");
            e.preventDefault();
        }

        const checkMark = document.getElementById("check");
        if (! checkMark.checked) {
        // if here then the checkbox was not selected
            alert("please approve the price");
            e.preventDefault();
        }
        const radios = document.querySelectorAll("input[name=paymentMethod]");
        var radio = 0;
        for (let rad of radios) {
        if (rad.checked) {
        //if here then this ratio button was selected
        console.log(rad.value + " was checked");
        radio = 1;
        }
        }
        if(radio == 0){
            alert("please select payment");
            e.preventDefault();
        }

        addTransaction();

    }

    document.getElementById('transactionForm').addEventListener('submit', (event) => {
        console.log("submit listener")
        event.preventDefault();
        submit();
    });

});

