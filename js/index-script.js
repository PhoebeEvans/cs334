
function selectSize(size) {
    // Deselect all size buttons
    var sizeButtons = document.querySelectorAll('.size-name');
    sizeButtons.forEach(function(button) {
      button.classList.remove('selected');
    });
    
    // Select the clicked size button
    var selectedButton = document.querySelector('.size-name[data-size="' + size + '"]');
    selectedButton.classList.add('selected');
}

var openShopping = document.querySelector(".shopping");
var closeShopping = document.querySelector('.closeShopping');
var list = document.querySelector('.list');
var portfolio = document.querySelector('.portfolio-modal-shopping');
var listCard = document.querySelector('.listCard');
var body = document.querySelector('body');
var total = document.querySelector('.total');
var quantity = document.querySelector('.quantity');

openShopping.addEventListener("click", function () {
    body.classList.add("active")
});
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active')
});

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
        totalPrices: 5.00,
        intro: 'Made the old-fashioned way',
        desc: 'Indulge in the timeless classic of smooth and creamy vanilla ice cream. Our vanilla ice cream is made from the finest, all-natural ingredients, creating a rich and luxurious flavor that is simply irresistible. Each scoop is a perfect balance of sweet, fragrant vanilla and silky, velvety texture that will leave your taste buds wanting more.'
    }
];

var listCards = [];
function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <div class="col-lg-4 col-sm-6 mb-4">
                <!-- Portfolio item 1-->
                <div class="portfolio-item">
                    <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${value.id}">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                        </div>
                        <img class="img-fluid" src="images/products/${value.image}" alt="..." />
                    </a>
                    <div class="portfolio-caption">
                        <div class="portfolio-caption-heading">${value.name}</div>
                        <div class="portfolio-caption-subheading text-muted">$${value.price}</div>
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
            <div class="portfolio-modal modal fade" id="portfolioModal${value.id}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-lg-8">
                                        <div class="modal-body">

                                            <h2 class="text-uppercase">${value.name}</h2>
                                            <p class="item-intro text-muted">${value.intro}</p>
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
                                                            <strong>$${value.price}</strong>
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
    }
    reloadCard();
}

function reloadCard(){
        listCard.innerHTML = `
        `;
        var count = 0;
        var totalPrice = 0;
        listCards.forEach((value, key) =>{
            totalPrice = value.totalPrices + totalPrice;
            count = count + value.quantity;

            if(value != null){
                var newDiv = document.createElement('li');
                newDiv.innerHTML = `
                    <div> <img src="images/products/${value.image}"/> </div>
                    <div>${value.name}</div>
                    <div>$${value.totalPrices}</div>
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
        listCards[key].totalPrices = listCards[key].quantity * products[key].price;
    }
    reloadCard();
}
