
var cart = JSON.parse(localStorage.getItem("cart"));

let cost = 0;
let subtotal = 0;
let tax = 0;
let id_counter = 321;

function getTotal(data){
    cost = 0;
    for (let i = 0; i < data.length; i++) {
        var item = data[i].price * data[i].quantity;
        cost = cost + item;
  }
  
  var quant = 0;
  for (let i = 0; i < data.length; i++) {
        var item = data[i].quantity;
        quant = quant + item;
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
  for (let element of data) {
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

    let row = table.insertRow();

    let cell = row.insertCell();
    let text = document.createTextNode('tax');
    cell.appendChild(text);



    let cell2 = row.insertCell();
    let text2 = document.createTextNode('');

    cell2.appendChild(text2);


    let cell3 = row.insertCell();
    let text3 = document.createTextNode(tax.toFixed(2));

    cell3.appendChild(text3);

    row = table.insertRow();

    cell = row.insertCell();
    text = document.createTextNode('total');
    cell.appendChild(text);



    cell2 = row.insertCell();
    text2 = document.createTextNode('');

    cell2.appendChild(text2);


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

orderItem(cart);

let c = cost;
const y = document.getElementById("long");
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




import openConnectionToDatabase from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    let db;
    
    openConnectionToDatabase().then(database => {
        //assign db to current database instance
        db = database;

    }).catch(error => {
        console.error("Error getting database instance:", error);
    });
    
    
    

    function add() {
        
        var d = new Date();
        var id_value = id_counter;
        var email_value  = String(document.getElementById("email").value);
        var date_value  = d;
        var totalAmount_value  = cost;
        var paymentMethod_value  = String(document.getElementById("paymentMethod").value);
        var paymentStatus_value  = "incomplete";
        var orderItems_value  = orderItems;
        var request = db.transaction(["transactions"], "readwrite")
        request = request.objectStore("transactions")
        request.add({ id: id_value,
          email: email_value,
          date: date_value, 
          totalAmount: totalAmount_value,
          paymentMethod: paymentMethod_value,
          paymentStatus: paymentStatus_value,
          orderItems: orderItems_value
         });


        request.onsuccess = function(event) {
           alert("Transaction : "+id_value+" has been completed.");
        };

        request.onerror = function(event) {
           alert("Unable to complete transaction\r\n"+ id_value +" it aready exist in your database! ");
        };

        id_counter++;
     }
     
     
     function submit(){
        
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
        
        add();

        e.preventDefault();

        window.location.href = 'index.html';
     }

     document.getElementById("transactionForm").addEventListener("submit", submit);


});



