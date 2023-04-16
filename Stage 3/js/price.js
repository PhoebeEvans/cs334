/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

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