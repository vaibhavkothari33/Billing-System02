// // Sample product data
// let products = JSON.parse(localStorage.getItem('products')) || [
//     { name: 'Product 1', price: 5, discount: 0 },
//     { name: 'Product 2', price: 10, discount: 0 },
//     { name: 'PVC Pipe 1', price: 150, discount: 0 },
//     // Add more products as needed
// ];

// // Function to search products and display suggestions
// function searchProducts() {
//     const query = document.getElementById('product-search').value.toLowerCase();
//     const suggestionsList = document.getElementById('suggestions-list');
//     suggestionsList.innerHTML = '';

//     if (query) {
//         const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
//         filteredProducts.forEach(product => {
//             const listItem = document.createElement('li');
//             listItem.textContent = product.name;
//             listItem.onclick = () => selectProduct(product);
//             suggestionsList.appendChild(listItem);
//         });
//     }
// }

// // Function to select a product from the suggestions
// function selectProduct(product) {
//     document.getElementById('product-name').textContent = product.name;
//     document.getElementById('product-price').textContent = product.price;
//     document.getElementById('product-quantity').value = 1;
//     document.getElementById('product-discount').value = product.discount;
//     document.getElementById('suggestions-list').innerHTML = '';
// }

// // Function to add the product to the bill
// function addProduct() {
//     const name = document.getElementById('product-name').textContent;
//     const price = parseFloat(document.getElementById('product-price').textContent);
//     const quantity = parseInt(document.getElementById('product-quantity').value);
//     const discountPercentage = parseFloat(document.getElementById('product-discount').value);

//     if (!name) {
//         alert('No product selected. Please select a product to add.');
//         return;
//     }

//     // Calculate discount as a percentage
//     const discount = (price * discountPercentage) / 100;
//     const total = (price * quantity) - discount;

//     const billTable = document.getElementById('bill-table');
//     const row = document.createElement('tr');

//     row.innerHTML = `
//         <td>${name}</td>
//         <td>${price}</td>
//         <td>${quantity}</td>
//         <td>${discountPercentage}</td>
//         <td>${total.toFixed(2)}</td>
//         <td><button onclick="removeProduct(this)">Remove</button></td>
//     `;
//     billTable.appendChild(row);

//     updateTotalAmount();
// }

// // Function to update the total amount
// function updateTotalAmount() {
//     let totalAmount = 0;
//     const rows = document.getElementById('bill-table').getElementsByTagName('tr');
//     for (let row of rows) {
//         totalAmount += parseFloat(row.cells[4].textContent);
//     }
//     document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
// }

// // Function to remove a product from the bill
// function removeProduct(button) {
//     const row = button.parentNode.parentNode;
//     row.parentNode.removeChild(row);
//     updateTotalAmount();
// }

// // Function to print the bill
// function printBill() {
//     window.print();
// }

// // Save products to localStorage when the page unloads
// window.addEventListener('beforeunload', () => {
//     localStorage.setItem('products', JSON.stringify(products));
// });

// // Load bill details if they exist in localStorage
// document.addEventListener('DOMContentLoaded', () => {
//     const storedProducts = localStorage.getItem('products');
//     if (storedProducts) {
//         products = JSON.parse(storedProducts);
//     }
// });
// function printBill() {
//     const billItems = [];
//     const rows = document.getElementById('bill-table').getElementsByTagName('tr');
//     for (let row of rows) {
//         const item = {
//             name: row.cells[0].textContent,
//             price: parseFloat(row.cells[1].textContent),
//             quantity: parseInt(row.cells[2].textContent),
//             discount: parseFloat(row.cells[3].textContent),
//             total: parseFloat(row.cells[4].textContent)
//         };
//         billItems.push(item);
//     }
//     localStorage.setItem('billItems', JSON.stringify(billItems));
//     localStorage.setItem('totalAmount', document.getElementById('total-amount').textContent);
//     window.location.href = 'print.html';
// }


let products = JSON.parse(localStorage.getItem('products')) || [
    { name: 'Product 1', price: 5, discount: 0 },
    { name: 'Product 2', price: 10, discount: 0 },
    { name: 'PVC Pipe 1', price: 150, discount: 0 },
    // More products...
];

function searchProducts() {
    const query = document.getElementById('product-search').value.toLowerCase();
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';

    if (query) {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        filteredProducts.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = product.name;
            listItem.onclick = () => selectProduct(product);
            suggestionsList.appendChild(listItem);
        });
    }
}

function selectProduct(product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-quantity').value = 1;
    document.getElementById('product-discount').value = product.discount;
    document.getElementById('suggestions-list').innerHTML = '';
}

function addProduct() {
    const name = document.getElementById('product-name').textContent;
    if (!name) {
        alert('No product selected.');
        return;
    }

    const price = parseFloat(document.getElementById('product-price').textContent);
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const discount = parseFloat(document.getElementById('product-discount').value);
    const total = (price * quantity) - ((price * quantity) * discount / 100);

    const billTable = document.getElementById('bill-table');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>${discount}%</td>
        <td>${total}</td>
        <td><button onclick="removeProduct(this)">Remove</button></td>
    `;
    billTable.appendChild(row);

    updateTotalAmount();
}

function updateTotalAmount() {
    let totalAmount = 0;
    const rows = document.getElementById('bill-table').getElementsByTagName('tr');
    for (let row of rows) {
        totalAmount += parseFloat(row.cells[4].textContent);
    }
    document.getElementById('total-amount').textContent = totalAmount;
}

function removeProduct(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotalAmount();
}

function printBill() {
    const rows = document.getElementById('bill-table').getElementsByTagName('tr');

    if (rows.length === 0) {
        alert('No products in the bill. Please add products before printing.');
        return;
    }

    const customerName = document.getElementById('customer-name-input').value;
    const customerMobile = document.getElementById('customer-mobile-input').value;

    if (!customerName || !customerMobile) {
        alert('Please enter customer details before printing.');
        return;
    }

    const billItems = [];
    for (let row of rows) {
        const item = {
            name: row.cells[0].textContent,
            price: parseFloat(row.cells[1].textContent),
            quantity: parseInt(row.cells[2].textContent),
            discount: parseFloat(row.cells[3].textContent),
            total: parseFloat(row.cells[4].textContent)
        };
        billItems.push(item);
    }

    const currentTime = new Date().toLocaleString();

    localStorage.setItem('billItems', JSON.stringify(billItems));
    localStorage.setItem('totalAmount', document.getElementById('total-amount').textContent);
    localStorage.setItem('customerName', customerName);
    localStorage.setItem('customerMobile', customerMobile);
    localStorage.setItem('currentTime', currentTime);
    window.location.href = 'print.html';
}
