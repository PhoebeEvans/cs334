import openConnectionToDatabase from '../..//js/db.js';

document.addEventListener('DOMContentLoaded', () => {
    let db;

    var openShopping = document.querySelector(".shopping");
    var closeShopping = document.querySelector('.closeShopping');
    var list = document.querySelector('.list');
    var portfolio = document.querySelector('.portfolio-modal-shopping');
    var listCard = document.querySelector('.listCard');
    var body = document.querySelector('body');
    var total = document.querySelector('.total');
    var quantity = document.querySelector('.quantity');

    var fetchedProducts = [];



    


    const product = document.getElementById('activeProducts');
    console.log(product);

    openShopping.addEventListener("click", function () {
        body.classList.add("active")
    });
    closeShopping.addEventListener('click', ()=>{
        body.classList.remove('active')
    });


    var listCards = [];
    function initApp(product){
        
        product.forEach((value, key)=>{
            let newDiv = document.createElement('div');
            newDiv.classList.add('item');
            newDiv.innerHTML = `
                <div >
                    <div class="portfolio-item" id="portfolio-item-shopping">
                        <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${value.id}">
                            <div class="portfolio-hover">
                                <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="images/products/${value.img}" alt="..." />
                        </a>
                        <div class="portfolio-caption">
                            <div class="portfolio-caption-heading">${value.flavor}</div>
                            <div class="portfolio-caption-subheading text-muted">$${value.price}</div>
                        </div>
                    </div>
                </div>
            `;
            list.appendChild(newDiv);
        })
    }

    function initAppModal(product){
        let i=0;
        product.forEach((value, key)=>{
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

                                                <h2 class="text-uppercase">${value.flavor}</h2>
                                                <p class="item-intro text-muted">Made the old-fashioned way</p>
                                                <img class="img-fluid d-block mx-auto" src="images/products/${value.img}" alt="..." />
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
                                                    <button class="btn btn-primary btn-xl text-uppercase add-to-card-button" data-key="${i}" data-bs-dismiss="modal" type="button" onclick="addToCard(${key})">
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
            i++;
        })
    }

    window.addToCard = function (key) {
        if (listCards[key] == null) {
          listCards[key] = fetchedProducts[key];
          listCards[key].quantity = 1;
        }
        reloadCard();
    };

    window.changeQuantity = function (key, quantity) {
        if (quantity == 0) {
            delete listCards[key];
        } else {
            listCards[key].quantity = quantity;
            listCards[key].totalCost = listCards[key].quantity * fetchedProducts[key].price;
        }
        reloadCard();
    };
    

    function passCart(){
        alert(JSON.stringify(listCards));
        localStorage.setItem("cart", JSON.stringify(listCards));
    }

    function handleToGoClick() {
        console.log("handling to go click");
        passCart();
    }

    console.log("event listener part 1");
    var anchorElement = document.querySelector('#go-to-1');
    anchorElement.addEventListener('click', handleToGoClick);
    anchorElement = document.querySelector('#go-to-2');
    anchorElement.addEventListener('click', handleToGoClick);

    // document.addEventListener('DOMContentLoaded', function() {
    //     console.log("event listener part 1");
    //     var anchorElement = document.querySelector('#go-to-1');
    //     anchorElement.addEventListener('click', handleToGoClick);
    //     anchorElement = document.querySelector('#go-to-2');
    //     anchorElement.addEventListener('click', handleToGoClick);
    // });
      

    
    
      

  


    function reloadCard(){
            listCard.innerHTML = `
            `;
            var count = 0;
            var totalPrice = 0;
            listCards.forEach((value, key) =>{
                console.log(value);
                totalPrice = (value.price * value.quantity) + totalPrice;
                count = count + value.quantity;

                if(value != null){
                    var newDiv = document.createElement('li');
                    newDiv.innerHTML = `
                        <div> <img src="images/products/${value.img}"/> </div>
                        <div>${value.flavor}</div>
                        <div>$${value.price * value.quantity}</div>
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

    window.addToCard = function (key) {
        if (listCards[key] == null) {
          listCards[key] = fetchedProducts[key];
          listCards[key].quantity = 1;
          console.log("Heyyy");
        }
        reloadCard();
    };
      

    

    openConnectionToDatabase().then(database => {


        //assign db to current database instance
                
        db = database;

        var store= db.transaction('product', IDBTransaction.READ_ONLY).objectStore('product');
        store.getAll().onsuccess = function(event) {
            var product = event.target.result;
            fetchedProducts = product; // Store the fetched data
            initApp(product);
            initAppModal(product);
        };
                
        }).catch(error => {
                
        console.error("Error getting database instance:", error);
                
    });
});