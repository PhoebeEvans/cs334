// import openConnectionToDatabase from './db.js';

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


    //Get Data from server to pass to InsertDataIntoTable()
    async function populateTableFromServer(apiEndpoint, fulfilledOrdersTableSelector, unfulfilledOrdersTableSelector) {
        const fulfilledOrdersTableBody = document.querySelector(fulfilledOrdersTableSelector);
        const unfulfilledOrdersTableBody = document.querySelector(unfulfilledOrdersTableSelector);

        try {
            // Fetch the data from the Flask route
            const response = await fetch(apiEndpoint);
            const data = await response.json();

            // Insert the data into the appropriate table based on paymentStatus
            data.forEach(item => {
                if (item.paymentStatus === "INCOMPLETE") {
                    insertDataIntoTable(item, unfulfilledOrdersTableBody);
                } else {
                    insertDataIntoTable(item, fulfilledOrdersTableBody);
                }
            });
        } catch (error) {
            console.error('Error fetching data from server:', error);
        }
    }

    //INITIALIZE PAGE

    function initializeAdminOrdersPage() {
        populateTableFromServer("/transactions", "#fulfilled-orders-table > tbody", "#unfulfilled-orders-table > tbody");
    }

    initializeAdminOrdersPage();





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
