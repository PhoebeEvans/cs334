import openConnectionToDatabase from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addTodoButton = document.getElementById('add-todo');
    let db;

    

    //Function for populating tables
    function insertDataIntoTable(data, targetTableBody) {
        const row = document.createElement('tr');
        
        if (!data.flavor) {
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
        } else {
            // Handle products
            const idCell = document.createElement('th');
            const flavorCell = document.createElement('td');
            const quantityCell = document.createElement('td');
            const vendorCell = document.createElement('td');
            const costCell = document.createElement('td');
            const markupCell = document.createElement('td');

            idCell.innerText = data.productID || data.id;
            flavorCell.innerText = data.flavor || data.name;
            quantityCell.innerText = data.quantity;
            vendorCell.innerText = data.vendor;
            costCell.innerText = data.price.toFixed(2);
            markupCell.innerText = (data.markup * 100).toFixed(0);

            // Add markupCell to the row only if the product has the markup property
            if (data.hasOwnProperty('markup')) {
                row.appendChild(markupCell);
            }

            row.appendChild(idCell);
            row.appendChild(flavorCell);
            row.appendChild(quantityCell);
            row.appendChild(vendorCell);
            row.appendChild(costCell);
            row.appendChild(markupCell);
        }

        // Add row to the table
        targetTableBody.appendChild(row);
    }

    //Get Data from object store to pass to InsertDataIntoTable()
    function populateTableFromObjectStore(objectStoreName, targetTableBodySelector) {
        const transaction = db.transaction(objectStoreName, 'readonly');
        const objectStore = transaction.objectStore(objectStoreName);
        const request = objectStore.openCursor();
        const targetTableBody = document.querySelector(targetTableBodySelector);
    
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                insertDataIntoTable(cursor.value, targetTableBody);
                cursor.continue();
            }
        };
    
        request.onerror = (event) => {
            console.error('Error fetching data from object store:', event.target.errorCode);
        };
    }

    //POPULATING TABLES

    openConnectionToDatabase().then(database => {
        //assign db to current database instance
        db = database;

        console.log("populateTableFromObjectStore() should've been called!");
        
        populateTableFromObjectStore('product', '#active-products-table > tbody');

        // Check if the element with the specified ID exists
        var adminIndexElement = document.getElementById("admin-index");

        // If the element exists, execute the code specific to the admin-index page
        if (adminIndexElement) {
            
            populateTableFromObjectStore('transactions', '#transactions-table > tbody');
            console.log("Executing code specific to the admin-product page");
        }

        

    }).catch(error => {
        console.error("Error getting database instance:", error);
    });
    
    
    //To do box code
    //Only execute this line if the to do box is located on the page
    const confirmTodoButton = document.querySelector('#confirm-todo');

    if (addTodoButton && todoList) {

        //Function to check if any reminders are present, show message if not
        function updateNoRemindersVisibility() {
            const noReminders = document.getElementById('empty-todo');
            const noRemindersIcon = document.getElementById('empty-todo-icon');
            noReminders.style.display = todoList.childElementCount === 0 ? 'block' : 'none';
            noRemindersIcon.style.display = todoList.childElementCount === 0 ? 'block' : 'none';
        }

        // Updates the confirm button visibility based on checked tasks
        function updateConfirmButtonVisibility() {
            const anyChecked = Array.from(todoList.querySelectorAll('.circle-checkbox')).some(checkbox => checkbox.checked);
            const confirmTodoButton = document.getElementById('confirm-todo');
            confirmTodoButton.style.display = anyChecked ? 'inline' : 'none';
        }

        function saveTodosToLocalStorage() {
            const todos = Array.from(todoList.querySelectorAll('li'))
                .map(item => {
                    const title = item.querySelector('.card-title').textContent;
                    const description = item.querySelector('.card-text').textContent;
                    const timestamp = item.querySelector('.text-muted').dataset.timestamp;
                    return { title, description, timestamp };
                });
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        
        function createTodoItem(title, description, timestamp) {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
        
            const row = document.createElement('div');
            row.classList.add('row', 'g-0');
        
            const col1 = document.createElement('div');
            col1.classList.add('col-md-3');
        
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('circle-checkbox');
        
            col1.appendChild(checkbox);
        
            const col2 = document.createElement('div');
            col2.classList.add('col-md-9');
        
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
        
            const h6 = document.createElement('h6');
            h6.classList.add('card-title');
            h6.textContent = title;
        
            const p1 = document.createElement('p');
            p1.classList.add('card-text');
            p1.textContent = description;
        
            const p2 = document.createElement('p');
            p2.classList.add('card-text');
        
            const small = document.createElement('small');
            small.classList.add('text-muted');
            small.dataset.timestamp = timestamp;
            small.textContent = getTimeElapsed(timestamp);
        
            p2.appendChild(small);
            cardBody.appendChild(h6);
            cardBody.appendChild(p1);
            cardBody.appendChild(p2);
            col2.appendChild(cardBody);
        
            row.appendChild(col1);
            row.appendChild(col2);
            li.appendChild(row);

            checkbox.addEventListener('change', () => {
                updateConfirmButtonVisibility();
            });

            li.dataset.timestamp = timestamp;
        
            return li;
        }

        addTodoButton.addEventListener('click', () => {
            const title = prompt('Enter the title of the task:');
            const description = prompt('Enter the description of the task:');
            const timestamp = Date.now();
            const todoItem = createTodoItem(title, description, timestamp);
            todoList.appendChild(todoItem);
            saveTodosToLocalStorage(); // Call this function after adding the task
            updateNoRemindersVisibility(); // Call this function after adding the task
        });
    
        //Load todo items from localStorage
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        savedTodos.forEach(todo => {
            const todoItem = createTodoItem(todo.title, todo.description, todo.timestamp);
            todoList.appendChild(todoItem);
        });
    
        updateNoRemindersVisibility(); // Call this function after loading the todo items

        if (confirmTodoButton) {
            confirmTodoButton.addEventListener('click', () => {
                // Click event listener for the confirm button to remove checked tasks
                document.getElementById('confirm-todo').addEventListener('click', () => {
                    Array.from(todoList.querySelectorAll('.circle-checkbox'))
                        .filter(checkbox => checkbox.checked)
                        .forEach(checkbox => {
                            todoList.removeChild(checkbox.closest('.list-group-item'));
                        });
                });
            })
        }   

        function getTimeElapsed(timestamp) {
            const elapsedMs = Date.now() - timestamp;
            const elapsedSec = Math.floor(elapsedMs / 1000);
            const elapsedMin = Math.floor(elapsedSec / 60);
            const elapsedHour = Math.floor(elapsedMin / 60);
            const elapsedDay = Math.floor(elapsedHour / 24);
        
            if (elapsedDay > 0) {
                return `Added ${elapsedDay} day${elapsedDay > 1 ? 's' : ''} ago`;
            }
            if (elapsedHour > 0) {
                return `Added ${elapsedHour} hour${elapsedHour > 1 ? 's' : ''} ago`;
            }
            if (elapsedMin > 0) {
                return `Added ${elapsedMin} minute${elapsedMin > 1 ? 's' : ''} ago`;
            }
            return `Added ${elapsedSec} second${elapsedSec > 1 ? 's' : ''} ago`;
        }
    
        function updateElapsedTimes() {
            todoList.querySelectorAll('li').forEach(item => {
                const timestamp = Number(item.querySelector('.text-muted').dataset.timestamp);
                const elapsedTimeElement = item.querySelector('.text-muted');
                elapsedTimeElement.textContent = getTimeElapsed(timestamp);
            });
        }
        
        if (todoList) {
            setInterval(updateElapsedTimes, 60 * 1000);
            updateElapsedTimes();
        }
    
        // Click event listener for the confirm button to remove checked tasks
        document.getElementById('confirm-todo').addEventListener('click', () => {
            Array.from(todoList.querySelectorAll('.circle-checkbox'))
                .filter(checkbox => checkbox.checked)
                .forEach(checkbox => {
                    todoList.removeChild(checkbox.closest('.list-group-item'));
                });
    
            updateConfirmButtonVisibility();
            saveTodosToLocalStorage();
            updateNoRemindersVisibility(); // Call this function after adding the task
        });

    }
    
    
    
});
