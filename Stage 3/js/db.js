// db.js

if (!window.indexedDB) {
	alert("IndexedDB is not supported!");
}

// Define the name and version of the IndexedDB database
const dbName = 'ultimateIceCreamDatabase';
const dbVersion = 1;

// Declare a variable to hold the database connection
let db;

//Function definition for getting data into Object Stores
async function insertDataIntoObjectStore(objectStoreName, data) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(objectStoreName, 'readwrite');
        const objectStore = transaction.objectStore(objectStoreName);

        data.forEach(item => objectStore.add(item));

        transaction.oncomplete = () => {
            resolve();
        };

        transaction.onerror = () => {
            reject(transaction.error);
        };
    });
}

// Define an async function called fetchData that takes a URL as an argument
async function fetchData(url) {
    // Await the fetch() function to complete and assign the result to the response variable
    const response = await fetch(url);
    
    // Check if the response's ok property is false, indicating an unsuccessful fetch request
    if (!response.ok) {
        // Throw an error with a custom message including the URL and response status text
        throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }
    console.log("In fetchData...");
    //console.log(response.json());
   
    // Return the unparsed object
    return response;
}




// Function to open and initialize the database
function openConnectionToDatabase() {
    console.log("Made it in here");
    // Wrap the database initialization in a promise to handle asynchronous calls
    return new Promise((resolve, reject) => {
        // Open the IndexedDB database with the specified name and version
        const request = indexedDB.open(dbName, dbVersion);
        let isDataInserted = false;

        // Event handler for database upgrade, called when the database is created or the version is changed
        //Should only be called once per session
        request.onupgradeneeded = async (event) => { //make the event handler async
            // Get the database connection from the event
            db = event.target.result;

            // Create the activeProducts object store if it doesn't exist
            if (!db.objectStoreNames.contains('activeProducts')) {
                //Set key path and other attributes
                const activeProductsStore = db.createObjectStore('activeProducts', { keyPath: 'id', autoIncrement: true });
                activeProductsStore.createIndex('name', 'name', { unique: true });
                activeProductsStore.createIndex('quantity', 'quantity');
                activeProductsStore.createIndex('vendor', 'vendor');
                activeProductsStore.createIndex('cost', 'cost');
                activeProductsStore.createIndex('markup', 'markup');
                activeProductsStore.createIndex('image', 'image');
                activeProductsStore.createIndex('totalCost', 'totalCost');
                activeProductsStore.createIndex('desc', 'desc');
            }

            // Create the backorderedProducts object store if it doesn't exist
            if (!db.objectStoreNames.contains('backorderedProducts')) {
                //Set key path and other attributes
                const backorderedProductsStore = db.createObjectStore('backorderedProducts', { keyPath: 'id', autoIncrement: true });
                backorderedProductsStore.createIndex('name', 'name', { unique: true });
                backorderedProductsStore.createIndex('quantity', 'quantity');
                backorderedProductsStore.createIndex('vendor', 'vendor');
                backorderedProductsStore.createIndex('cost', 'cost');
                backorderedProductsStore.createIndex('markup', 'markup');
            }

            // Create the supplies object store if it doesn't exist
            if (!db.objectStoreNames.contains('supplies')) {
                //Set key path and other attributes
                const suppliesStore = db.createObjectStore('supplies', { keyPath: 'suppliesID', autoIncrement: true });
                suppliesStore.createIndex('name', 'name', { unique: true });
                suppliesStore.createIndex('quantity', 'quantity');
                suppliesStore.createIndex('vendor', 'vendor');
                suppliesStore.createIndex('cost', 'cost');
            }

            // Create the transactions object store if it doesn't exist
            if (!db.objectStoreNames.contains('transactions')) {
                //Set key path and other attributes
                const transactionsStore = db.createObjectStore('transactions', { keyPath: 'id', autoIncrement: true });
                transactionsStore.createIndex('customerID', 'customerID');
                transactionsStore.createIndex('date', 'date');
                transactionsStore.createIndex('totalAmount', 'totalAmount');
                transactionsStore.createIndex('paymentMethod', 'paymentMethod');
                transactionsStore.createIndex('paymentStatus', 'paymentStatus');
            }

            // Add an event listener for the "complete" event of the transaction
            event.target.transaction.addEventListener("complete", () => {
                
                //look for isDataInserted flag before resolving
                if (isDataInserted) {
                    resolve(db);
                }
            });
        };

        // Event handler for successful database connection
        request.onsuccess = async (event) => {
            console.log("Database connection successful");

            // Set the global database connection variable to the connected database
            db = event.target.result;
        
            // Check if the data has already been inserted (by checking if any object store has data)
            const activeProductsStore = db.transaction("activeProducts").objectStore("activeProducts");
            const countRequest = activeProductsStore.count();
        
            countRequest.onsuccess = async () => {
                // If the object store has no data, insert the data
                console.log("Countrequest on success!");
                console.log(countRequest.result);
                if (countRequest.result === 0) {
                    console.log("Countrequest.result===0 true!");

                    // Load and insert data for the 'activeProducts' object store
                    let response = await fetchData('./JSON/active_products.json');
                    const data = await response.json();
                    await insertDataIntoObjectStore('activeProducts', data);

                    console.log("Finished ActiveProducts stuff");
        
                    // Load and insert data for the 'backorderedProducts' object store
                    response = await fetchData('./JSON/backordered_products.json');
                    const data2 = await response.json();
                    await insertDataIntoObjectStore('backorderedProducts', data2);

                    console.log("Finished backorderedProducts stuff");
        
                    // Load and insert data for the 'supplies' object store
                    response = await fetchData('./JSON/supplies.json');
                    const data3 = await response.json();
                    await insertDataIntoObjectStore('supplies', data3);

                    console.log("Finished supplies stuff");
        
                    // Load and insert data for the 'transactions' object store
                    response = await fetchData('./JSON/transactions.json');
                    const data4 = await response.json();
                    await insertDataIntoObjectStore('transactions', data4);

                    console.log("Finished transactions stuff");

                    isDataInserted = true;

                    resolve(db);
                } else {
                    resolve(db);
                }
            };
        };
        

        // Event handler for errors during database connection
        request.onerror = (event) => {
            // Log the error in the console
            console.error('Error opening database:', event.target.errorCode);
            // Reject the promise with the error code
            reject(event.target.errorCode);
        };
    });
}

openConnectionToDatabase();

// Export the openDatabase function as the default function
export default openConnectionToDatabase;


