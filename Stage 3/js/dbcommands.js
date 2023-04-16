/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */




import openConnectionToDatabase from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    let db;

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

var d = new Date();
var id_value = String(document.getElementById("id").value);
var email_value  = String(document.getElementById("email").value);
var date_value  = d;
var totalAmount_value  = cost;
var paymentMethod_value  = String(document.getElementById("paymentMethod").value);
var paymentStatus_value  = "incomplete";
var orderItems_value  = orderItems;

var trans = [
    {id: 4, email: email_value, date: date_value, totalAmount: totalAmount.value, paymentMethod: paymentMethod_value, paymentStatus: paymentStatus_value}
];
localStorage.setItem("action", JSON.stringify(trans));
