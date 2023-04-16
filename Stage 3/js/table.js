/*let orderTotal = [
  [ "Medium Chocolate Cone", 2.25],
  [ "Medium Twist Cone", 2.25],
  [ "Medium Chocolate Cone", 2.25],
  [ "Small Vanilla Cone", 1.50],
  ["Large Chocolate Cone", 3.00]
];

let cost = 0;
function getTotal(data){
    cost = 0;
    for (let i = 0; i < data.length; i++) {
        let item = data[i][1];
        cost = cost + item;
  }
  orderTotal.push(["Pretax Total", cost]);
  cost = cost*1.06;
  orderTotal.push(["Total after Tax", cost]);
}




function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let i = 0; i < data.length; i++) {
    let row = table.insertRow();
    for (let j = 0; j <= 1; j++) {
      let cell = row.insertCell();
      let text = document.createTextNode(data[i][j]);
      cell.appendChild(text);
    }
  }
}

let table = document.getElementById("test");
getTotal(orderTotal);
generateTable(table, orderTotal);*/
var cart = JSON.parse(localStorage.getItem("cart"));


var products = [
    {
        id: 1,
        name: 'Vanilla Ice Cream',
        image: '1.JPG',
        price: 5.00,
        totalPrices: 5.00,
        intro: 'Made the old-fashioned way',
        desc: 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
    },
    {
        id: 2,
        name: 'Chocolate Ice Cream',
        image: '2.JPG',
        price: 5.00,
        totalPrices: 5.00,
        intro: 'Made the old-fashioned way',
        desc: 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
    },
    {
        id: 3,
        name: 'Neopolian Ice Cream',
        image: '3.JPG',
        price: 5.00,
        totalPrices: 10.00,
        intro: 'Made the old-fashioned way',
        desc: 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
    }
];

products.push({
        id: 3,
        name: 'Neopolian Ice Cream',
        image: '3.JPG',
        price: 5.00,
        totalPrices: 10.00,
        intro: 'Made the old-fashioned way',
        desc: 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
    });


    
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



var Transactions = [
    {
        id: 1,
        email: 'ameliaanderson@gmail.com',
        date: d,
        totalAmount: 12.36,
        paymentMethod: "credit",
        cardNumber: "45625465275476",
        orderItems: products
    }
    
];



function generateTable2(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    
    for (let i=0; i < 1; i++) {
      let cell = row.insertCell();
      let text = document.createTextNode(element["id"]);
      cell.appendChild(text);
      
    }
    
    
    for (let i=0; i < 1; i++) {
      let cell = row.insertCell();
      let text = document.createTextNode(element["quantity"]);
      cell.appendChild(text);
      
    }
    
  }
}


var cart = JSON.parse(localStorage.getItem("cart"));
/*let table2 = document.getElementById("test2");
generateTable2(table2, cart);*/

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
let table2 = document.getElementById("test2");
generateTable2(table2, orderItems);

/*generateTableHead(table, data);/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


