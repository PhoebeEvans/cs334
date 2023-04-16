import openConnectionToDatabase from '../..//js/db.js';

var openShopping = document.querySelector(".shopping");
var closeShopping = document.querySelector('.closeShopping');
var list = document.querySelector('.list');
var portfolio = document.querySelector('.portfolio-modal-shopping');
var listCard = document.querySelector('.listCard');
var body = document.querySelector('body');
var total = document.querySelector('.total');
var quantity = document.querySelector('.quantity');

var store= db.transaction('tab', IDBTransaction.READ_ONLY).objectStore('tab');


const product = document.getElementById('activeProducts');
console.log(product);

openShopping.addEventListener("click", function () {
    body.classList.add("active")
});
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active')
});

var products = 
    [
        {
          "productID": 1,
          "flavor": "Ultimate Double-Chocolate",
          "quantity": 50,
          "vendor": "IceCreamCorp",
          "cost": 5.80,
          "markup": 1.5,
          "image": "1.JPG",
          "totalCost": 5.80,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        },
        {
          "productID": 2,
          "flavor": "Vanilla",
          "quantity": 80,
          "vendor": "IceCreamCorp",
          "cost": 5.80,
          "markup": 1.4,
          "image": "2.JPG",
          "totalCost": 5.80,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 3,
          "flavor": "Strawberry",
          "quantity": 30,
          "vendor": "IceCreamExpress",
          "cost": 6.20,
          "markup": 1.6,
          "image": "3.PNG",
          "totalCost": 6.20,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 4,
          "flavor": "Mint Chocolate Chip",
          "quantity": 45,
          "vendor": "IceCreamCorp",
          "cost": 6.00,
          "markup": 1.5,
          "image": "4.PNG",
          "totalCost": 6.00,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 5,
          "flavor": "Cookie Dough",
          "quantity": 60,
          "vendor": "IceCreamCorp",
          "cost": 6.10,
          "markup": 1.4,
          "image": "5.PNG",
          "totalCost": 6.10,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 6,
          "flavor": "Rocky Road",
          "quantity": 40,
          "vendor": "IceCreamExpress",
          "cost": 6.50,
          "markup": 1.6,
          "image": "6.PNG",
          "totalCost": 6.50,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 7,
          "flavor": "Rum Raisin",
          "quantity": 35,
          "vendor": "IceCreamCorp",
          "cost": 6.30,
          "markup": 1.5,
          "image": "7.PNG",
          "totalCost": 6.30,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 8,
          "flavor": "Pistachio",
          "quantity": 55,
          "vendor": "IceCreamCorp",
          "cost": 6.40,
          "markup": 1.4,
          "image": "8.PNG",
          "totalCost": 6.40,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 9,
          "flavor": "Coffee",
          "quantity": 65,
          "vendor": "IceCreamExpress",
          "cost": 6.10,
          "markup": 1.6,
          "image": "9.PNG",
          "totalCost": 6.10,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 10,
          "flavor": "Caramel Swirl",
          "quantity": 60,
          "vendor": "IceCreamCorp",
          "cost": 5.90,
          "markup": 1.5,
          "image": "10.PNG",
          "totalCost": 5.90,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 11,
          "flavor": "Lemon Sorbet",
          "quantity": 70,
          "vendor": "IceCreamCorp",
          "cost": 5.80,
          "markup": 1.4,
          "image": "11.PNG",
          "totalCost": 5.80,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 12,
          "flavor": "Mango",
          "quantity": 45,
          "vendor": "IceCreamExpress",
          "cost": 6.20,
          "markup": 1.6,
          "image": "12.PNG",
          "totalCost": 6.20,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 13,
          "flavor": "Peach",
          "quantity": 50,
          "vendor": "IceCreamCorp",
          "cost": 5.90,
          "markup": 1.5,
          "image": "13.PNG",
          "totalCost": 5.90,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "productID": 14,
          "flavor": "Cookies and Cream",
          "quantity": 80,
          "vendor": "IceCreamCorp",
          "cost": 6.00,
          "markup": 1.4,
          "image": "14.PNG",
          "totalCost": 6.00,
          "intro": 'Made the old-fashioned way',
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        },
        {
          "id": 15,
          "name": "Blueberry Cheesecake",
          "quantity": 40,
          "vendor": "IceCreamExpress",
          "cost": 6.30,
          "markup": 1.6,
          "image": "15.PNG",
          "totalCost": 6.30,
          "desc": 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
        
        }
];

var listCards = [];
function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <div >
                <!-- Portfolio item 1-->
                <div class="portfolio-item" id="portfolio-item-shopping">
                    <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${value.productID}">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                        </div>
                        <img class="img-fluid" src="images/products/${value.image}" alt="..." />
                    </a>
                    <div class="portfolio-caption">
                        <div class="portfolio-caption-heading">${value.flavor}</div>
                        <div class="portfolio-caption-subheading text-muted">$${value.cost}</div>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(newDiv);
    })
}

function initAppModal(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="portfolio-modal modal fade" id="portfolioModal${value.productID}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-lg-8">
                                        <div class="modal-body">

                                            <h2 class="text-uppercase">${value.flavor}</h2>
                                            <p class="item-intro text-muted">Made the old-fashioned way</p>
                                            <img class="img-fluid d-block mx-auto" src="images/products/${value.image}" alt="..." />
                                            <p>${value.desc}</p>
                                            <ul class="list-inline">
                                                <li>
                                                    <div class="price-spacer">
                                                        <strong class="price-spacer">Price:</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="wrapperDivPrice">
                                                        <div>
                                                            <strong>$${value.cost}</strong>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="wrapperDiv"> 
                                                <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button" onclick="addToCard(${key})">
                                                                            Add To Cart
                                                </button>
                                                <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                                    <i class="fas fa-xmark me-1"></i>
                                                        Close Product
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        portfolio.appendChild(newDiv);
    })
}

initApp();
initAppModal();

function addToCard(key){
    if(listCards[key]==null){
        listCards[key] = products[key];
        listCards[key].quantity = 1;
        console.log("Heyyy")
    }
    reloadCard();
}

function reloadCard(){
        listCard.innerHTML = `
        `;
        var count = 0;
        var totalPrice = 0;
        listCards.forEach((value, key) =>{
            totalPrice = value.totalCost + totalPrice;
            count = count + value.quantity;

            if(value != null){
                var newDiv = document.createElement('li');
                newDiv.innerHTML = `
                    <div> <img src="images/products/${value.image}"/> </div>
                    <div>${value.flavor}</div>
                    <div>$${value.totalCost}</div>
                    <div>
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    </div>
                `;
                listCard.appendChild(newDiv);
            }
        })
        total.innerText = '$' + totalPrice.toLocaleString();
        quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    } else{
        listCards[key].quantity = quantity;
        listCards[key].totalCost = listCards[key].quantity * products[key].cost;
    }
    reloadCard();
}

function passCart(){

}