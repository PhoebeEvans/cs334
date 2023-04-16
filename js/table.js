
var cart = JSON.parse(localStorage.getItem("cart"));

let cost = 0;

function getTotal(data){
    cost = 0;
    for (let i = 0; i < data.length; i++) {
        var item = data[i].totalPrice;
        cost = cost + item;
  }
  
  var quant = 0;
  for (let i = 0; i < data.length; i++) {
        var item = data[i].quantity;
        quant = quant + item;
  }
  
  data.push({
        flavor: 'Price before tax',
        quantity: quant,
        totalPrice: cost
        
    });
    
    cost = cost*1.06;
    cost = cost.toFixed(2);

    data.push({
        flavor: 'Price after tax',
        quantity: quant,
        totalPrice: cost
        
    });
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
    let text3 = document.createTextNode(element['totalPrice']);

    cell3.appendChild(text3);
    
    i++;
    
  }
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

document.getElementById("transactionForm").addEventListener("submit",
function(e){
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
    
    var d = new Date();
    var id_value = 5;
    var email_value  = String(document.getElementById("email").value);
    var date_value  = d;
    var totalAmount_value  = cost;
    var paymentMethod_value  = String(document.getElementById("paymentMethod").value);
    var paymentStatus_value  = "incomplete";
    var orderItems_value  = orderItems;

    var trans = [
        {id: 4, email: email_value, date: date_value, totalAmount: totalAmount_value, paymentMethod: paymentMethod_value, paymentStatus: paymentStatus_value, orderItems: orderItems_value}
    ];
    localStorage.setItem("action3", JSON.stringify(trans));
    //submit();

})


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
        var id_value = String(document.getElementById("id").value);
        var email_value  = String(document.getElementById("email").value);
        var date_value  = d;
        var totalAmount_value  = cost;
        var paymentMethod_value  = String(document.getElementById("paymentMethod").value);
        var paymentStatus_value  = "incomplete";
        var orderItems_value  = orderItems;
        var request = db.transaction(["Transaction"], "readwrite")
        .objectStore("Transaction")
        .add({ id: id_value,
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
     }
     
     
     function submit(){
         add();
         
     }

    
});


document.addEventListener('DOMContentLoaded', () => {
    let db;
    
    openConnectionToDatabase().then(database => {
        //assign db to current database instance
        db = database;
        function add() {
            var d = new Date();
            var id_value = 4;
            var email_value  = "String@gmail.com";
            var date_value  = d;
            var totalAmount_value  = cost;
            var paymentMethod_value  = "credit";
            var paymentStatus_value  = "incomplete";
            var orderItems_value  = orderItems;
            var request = db.transaction(["Transactions"], "readwrite")
            .objectStore("Transactions")
            .add({ id: id_value,
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
         }
         add();
    }).catch(error => {
        console.error("Error getting database instance:", error);
    });
    
        
     

    
});


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
localStorage.setItem("action", JSON.stringify(trans));
/*generateTableHead(table, data);/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


