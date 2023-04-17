import openConnectionToDatabase from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    let db;

    //Function for populating tables
    function insertDataIntoTable(data, targetTableBody) {
        const row = document.createElement('tr');
        
        
        // Handle transactions
        const transactionIdCell = document.createElement('th');
        const customerEmailCell = document.createElement('td');
        const dateCell = document.createElement('td');
        const totalAmountCell = document.createElement('td');
        const paymentMethodCell = document.createElement('td');
        const paymentStatusCell = document.createElement('td');
        
        transactionIdCell.innerText = data.id;
        customerEmailCell.innerText = data.email;
        dateCell.innerText = data.date;
        totalAmountCell.innerText = data.totalAmount.toFixed(2);
        paymentMethodCell.innerText = data.paymentMethod;
        paymentStatusCell.innerText = data.paymentStatus;
        
        row.appendChild(transactionIdCell);
        row.appendChild(customerEmailCell);
        row.appendChild(dateCell);
        row.appendChild(totalAmountCell);
        row.appendChild(paymentMethodCell);
        row.appendChild(paymentStatusCell);
        

        // Add row to the table
        targetTableBody.appendChild(row);
    }
        


    
      
    openConnectionToDatabase().then(database => {
        //assign db to current database instance
        db = database;

        console.log("populateTableFromObjectStore() should've been called!");
        
        populateTableFromObjectStore('transactions', '#fulfilled-orders-table > tbody', '#unfulfilled-orders-table > tbody');

    }).catch(error => {
        console.error("Error getting database instance:", error);
    });

    //Get Data from object store to pass to InsertDataIntoTable()
    function populateTableFromObjectStore(objectStoreName, targetTableBodySelector, secondTargetTableBodySelector) {
        const transaction = db.transaction(objectStoreName, 'readonly');
        const objectStore = transaction.objectStore(objectStoreName);
        const request = objectStore.openCursor();
    
        const targetTableBody = document.querySelector(targetTableBodySelector);
        const secondTargetTableBody = document.querySelector(secondTargetTableBodySelector);
    
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                // Check the paymentStatus attribute and choose the appropriate table
                let selectedTableBody;
                if (cursor.value.paymentStatus === "INCOMPLETE") {
                    selectedTableBody = secondTargetTableBody;
                } else {
                    selectedTableBody = targetTableBody;
                }
    
                // Insert data into the selected table
                insertDataIntoTable(cursor.value, selectedTableBody);
                cursor.continue();
            }
        };
    
        request.onerror = (event) => {
            console.error('Error fetching data from object store:', event.target.errorCode);
        };
    }
    


    //Tab event listeners
    const fulfilledOrdersTab = document.querySelector('#fulfilled-orders-tab');
    fulfilledOrdersTab.addEventListener('click', (e) => {
        e.preventDefault();
        switchActiveTab('fulfilled-orders-table');
    });

    const unfulfilledOrdersTab = document.querySelector('#unfulfilled-orders-tab');
    unfulfilledOrdersTab.addEventListener('click', (e) => {
        e.preventDefault();
        switchActiveTab('unfulfilled-orders-table');
    });

    
    function switchActiveTab(tabId) {
        const tabs = ['unfulfilled-orders-table', 'fulfilled-orders-table'];
        tabs.forEach((tab) => {
            document.querySelector(`#${tab}`).style.display = 'none';
        });
    
        document.querySelector(`#${tabId}`).style.display = 'table';
    
        // Update the active tab style
        document.querySelectorAll('.nav-link').forEach((navLink) => {
            navLink.classList.remove('tab-active');
        });
    
        switch (tabId) {
            case 'unfulfilled-orders-table':
                document.querySelector('#unfulfilled-orders-tab').classList.add('tab-active');
                break;
            case 'fulfilled-orders-table':
                document.querySelector('#fulfilled-orders-tab').classList.add('tab-active');
                break;
        }
    }
    
      


    
    
});
