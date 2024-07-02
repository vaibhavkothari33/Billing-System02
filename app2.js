let products = JSON.parse(localStorage.getItem('products')) || [
    { name: 'Product 1', price: 5, discount: 0 },
    { name: 'Product 2', price: 10, discount: 0 },
    // Initial products
];

function addInventoryProduct() {
    const name = document.getElementById('inventory-name').value;
    const price = parseFloat(document.getElementById('inventory-price').value);
    const discount = parseFloat(document.getElementById('inventory-discount').value);
    
    products.push({ name, price, discount });
    localStorage.setItem('products', JSON.stringify(products));
    
    displayInventory();
    document.getElementById('inventory-form').reset();
}

function removeInventoryProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    
    displayInventory();
}

function displayInventory() {
    const table = document.getElementById('inventory-table');
    table.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = product.name;
        row.insertCell(1).innerText = product.price;
        row.insertCell(2).innerText = product.discount;
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeInventoryProduct(index);
        row.insertCell(3).appendChild(removeButton);
    });
}

window.onload = displayInventory;
