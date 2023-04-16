//IndexedDB IIFE

(function(){
    const dbName = 'iceCreamDBtest';
    const dbVersion = 1;
    let db;

    //Check to make sure IndexedDB is supported first
    if (!window.indexedDB) {
        console.log(`Your browser doesn't support IndexedDB :( `);
        return;
    }

    function initIndexedDB() {

        //Open the database connection
        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode}`);
        };
        
        request.onsuccess = (event) => {
            db = event.target.result;
            //Load dummy data into DB here with JSON file
            //Display the appropriate data from DB into tables and other elements initially
        };

        // create the Products object store and indexes
        request.onupgradeneeded = (event) => {
            db = event.target.result;

            // create the Products object store 
            // with auto-increment id
            let store = db.createObjectStore('Transactions', {
                autoIncrement: true
            });

            // create an index on the flavor property
            let index = store.createIndex('id', 'id', {
                unique: true
            });
            
            // create an index on the flavor property
            let index = store.createIndex('email', 'email', {
                unique: false
            });
            
            // create an index on the flavor property
            let index = store.createIndex('date', 'date', {
                unique: false
            });
            
            // create an index on the flavor property
            let index = store.createIndex('totalAmount', 'totalAmount', {
                unique: false
            });
            
            // create an index on the flavor property
            let index = store.createIndex('paymentMethod', 'paymentMethod', {
                unique: false
            });
            
            // create an index on the flavor property
            let index = store.createIndex('cardNumber', 'cardNumber', {
                unique: false
            });
            
            
        };
    }

    //CRUD methods
    //Universal method to get all data from an objectstore, most likely used to fill tables on initial page load
    function getAllData(objectStoreName, callback) {
        const transaction = db.transaction(objectStoreName, 'readonly');
        const objectStore = transaction.objectStore(objectStoreName);
        const request = objectStore.getAll();
      
        request.onsuccess = function (event) {
          callback(null, event.target.result);
        };
      
        request.onerror = function (event) {
          console.error('Error getting all data:', event.target.error);
          callback(event.target.error, null);
        };
    }
      
    //CRUD products
    //CRUD employees
    //CRUD customers
    //CRUD cart
    //CRUD transactions

    //Initialize IndexedDB
    initIndexedDB();

    // Expose CRUD functions to the global scope under namespace "iceCreamDB"
    // This allows us to call functions defined above globally, in dot notation
    // ( e.g. iceCreamDB.addData(data) )
    window.iceCreamDB = {
        getAllData: getAllData,
        // addData: addData,
        // updateData: updateData,
        // deleteData: deleteData
    };
})();