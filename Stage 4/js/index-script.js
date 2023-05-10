import openConnectionToDatabase from './db.js';




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

    openShopping.addEventListener("click", function () {
        body.classList.add("active")
    });
    closeShopping.addEventListener('click', ()=>{
        body.classList.remove('active')
    });


    var listCards = [];
    function initApp(product){

        product.forEach((value, key)=>{
            console.log(value)
            if(value.id > 15 || value.img == ""){
                let newDiv = document.createElement('div');
                newDiv.classList.add('item');
                newDiv.innerHTML = `
                    <div >
                        <div class="portfolio-item" id="portfolio-item-shopping">
                            <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${value.id}">
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src="/static/images/products/placeholder.png" alt="..." />
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">${value.flavor}</div>
                                <div class="portfolio-caption-subheading text-muted">$${value.price}</div>
                            </div>
                        </div>
                    </div>
                `;
                list.appendChild(newDiv);
            } else {
                let newDiv = document.createElement('div');
                newDiv.classList.add('item');
                newDiv.innerHTML = `
                    <div >
                        <div class="portfolio-item" id="portfolio-item-shopping">
                            <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${value.id}">
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src="/static/images/products/${value.img}" alt="..." />
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">${value.flavor}</div>
                                <div class="portfolio-caption-subheading text-muted">$${value.price}</div>
                            </div>
                        </div>
                    </div>
                `;
                list.appendChild(newDiv);
            }
        })
    }

    function initAppModal(product){
        let i=0;
        product.forEach((value, key)=>{
            if(value.id > 15 || value.img == ""){
                let newDiv = document.createElement('div');
                newDiv.innerHTML = `
                <div class="wrapperDiv">
                    <div class="portfolio-modal modal fade" id="portfolioModal${value.id}" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content centerContent img-border-modal">
                                <div class="close-modal" data-bs-dismiss="modal"><img src="/static/images/img/close-icon.svg" alt="Close modal" /></div>
                                    <div class="container">
                                        <div class="borderItem">
                                            hello
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">
                                                <div class="modal-body">

                                                    <h2 class="text-uppercase">${value.flavor}</h2>
                                                    <p class="item-intro text-muted">Made the old-fashioned way</p>
                                                    <img class="img-fluid d-block mx-auto img-border-modal" src="/static/images/products/placeholder.png" alt="..." />
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
                                                        <button class="btn btn-primary btn-xl text-uppercase add-to-card-button  buttonFlattener" data-key="${i}" data-bs-dismiss="modal" type="button" onclick="addToCard(${key})">
                                                                                    Add To Cart
                                                        </button>
                                                        <span class="buttonSpacer"></span>
                                                        <button class="btn btn-primary btn-xl text-uppercase buttonFlattener" data-bs-dismiss="modal" type="button">
                                                            <i class="fas fa-xmark me-1"></i>
                                                                Close Product
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="borderItem">
                                            hello
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
            } else {
                let newDiv = document.createElement('div');
                newDiv.innerHTML = `
                <div class="wrapperDiv">
                    <div class="portfolio-modal modal fade" id="portfolioModal${value.id}" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content centerContent img-border-modal">
                                <div class="close-modal" data-bs-dismiss="modal"><img src="/static/images/img/close-icon.svg" alt="Close modal" /></div>
                                    <div class="container">
                                        <div class="borderItem">
                                            hello
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">
                                                <div class="modal-body">

                                                    <h2 class="text-uppercase">${value.flavor}</h2>
                                                    <p class="item-intro text-muted">Made the old-fashioned way</p>
                                                    <img class="img-fluid d-block mx-auto  img-border-modal" src="/static/images/products/${value.img}" alt="..." />
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
                                                        <button class="btn btn-primary btn-xl text-uppercase add-to-card-button  buttonFlattener" data-key="${i}" data-bs-dismiss="modal" type="button" onclick="addToCard(${key})">
                                                                                    Add To Cart
                                                        </button>
                                                        <span class="buttonSpacer"></span>
                                                        <button class="btn btn-primary btn-xl text-uppercase buttonFlattener" data-bs-dismiss="modal" type="button">
                                                            <i class="fas fa-xmark me-1"></i>
                                                                Close Product
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="borderItem">
                                            hello
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
            }
        })
    }

    window.addToCard = function (key) {
        if (listCards[key] == null) {
          listCards[key] = fetchedProducts[key];
          listCards[key].quantity = 1;
        } else {
            listCards[key].quantity = listCards[key].quantity + 1;
        }
        reloadCard();
    };

    window.changeQuantity = function (key, quantity) {
        if (quantity == 0) {
            console.log("delete listCards")
            console.log(listCards)
            delete listCards[key];
            console.log("delete 2 listCards")
            console.log(listCards)
        } else {
            listCards[key].quantity = quantity;
            listCards[key].totalCost = listCards[key].quantity * fetchedProducts[key].price;
        }
        reloadCard();
    };


    function passCart(){
        console.log("listCards")
        console.log(listCards)
        alert(JSON.stringify(listCards));
        localStorage.setItem("cart", JSON.stringify(listCards));
    }

    function handleToGoClick() {
        console.log("handling to go click");
        console.log("listCards")
        console.log(listCards)
        passCart();
    }

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
                totalPrice = (value.price * value.quantity) + totalPrice;
                count = count + value.quantity;

                if(value != null){
                    var newDiv = document.createElement('li');
                    newDiv.innerHTML = `
                        <div> <img src="/static/images/products/${value.img}"/> </div>
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
        } else {
            listCards[key].quantity = listCards[key].quantity + 1;
        }
        reloadCard();
    };

    function generateCard(cartCards) {
        if (cartCards == null){
            console.log("Cart is empty")
        }
        else{
            for (let element of cartCards) {
                if(element == null){
                    continue;
                } else{
                    let idKey = element["id"] - 1;

                    listCards[idKey] = fetchedProducts[idKey]
                    listCards[idKey].quantity = element["quantity"]
                }
            }
        }
        reloadCard();
    }

    async function getDataFromServer(apiEndpoint) {
        try {
            // Fetch the data from the Flask route
            const response = await fetch(apiEndpoint);
            const data = await response.json();

            console.log("Data informatiuon:");
            console.log(data);

            initApp(data);
            initAppModal(data);
        } catch (error) {
            console.error('Error fetching data from server:', error);
        }
    }


    openConnectionToDatabase().then(database => {

        //assign db to current database instance

        db = database;

        getDataFromServer('/products');

        var store= db.transaction('product', IDBTransaction.READ_ONLY).objectStore('product');
        store.getAll().onsuccess = function(event) {
            var product = event.target.result;
            var cartCards = JSON.parse(localStorage.getItem("listCard"));
            fetchedProducts = product; // Store the fetched data
            generateCard(cartCards);
            console.log(cartCards);
        };

        }).catch(error => {

        console.error("Error getting database instance:", error);

    });
});

//PWA Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker registered successfully:', registration);
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Update the UI notify the user they can install the PWA
  showInstallPromotion();
});

function showInstallPromotion() {
  const installButton = document.createElement('button');
  installButton.id = 'install-button';
  installButton.innerText = 'Install PWA';

  installButton.style.position = 'fixed';
  installButton.style.bottom = '20px';
  installButton.style.right = '20px';
  installButton.style.backgroundColor = '#4CAF50';
  installButton.style.border = 'none';
  installButton.style.color = 'white';
  installButton.style.textAlign = 'center';
  installButton.style.textDecoration = 'none';
  installButton.style.display = 'inline-block';
  installButton.style.fontSize = '16px';
  installButton.style.padding = '10px 24px';
  installButton.style.cursor = 'pointer';

  // Append the button to the body
  document.body.appendChild(installButton);

  // Add click event listener to the install button
  installButton.addEventListener('click', onInstallButtonClick);
}

// When the user clicks the install button or any other element you use to show the install prompt
function onInstallButtonClick() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the installation');
      } else {
        console.log('User dismissed the installation');
      }
      deferredPrompt = null;
    });
  }
}