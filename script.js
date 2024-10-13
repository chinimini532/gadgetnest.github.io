// Sample product data
const products = {
    headphone1: { name: 'Sony WH-CH720N', price: 50 },
    headphone2: { name: 'Beats Solo 4', price: 35 },
    headphone3: { name: 'Galaxy A12 Nacho', price: 49 },
    headphone4: { name: 'Tronsmart Onyx Free True Wireless Earphones', price: 43 },
    headphone5: { name: 'Beats Flex', price: 50 },
    powerbank1: { name: 'Xiaomi 20000mAh', price: 30 },
    powerbank2: { name: 'BENKS Magnetic Wireless', price: 35 },
    powerbank3: { name: 'NEXT ONE Power Bank MagSafe Compatible', price: 40 },
    powerbank4: { name: 'Xiaomi 22.5W Power Bank 10000 - Xiaomi UK', price: 33 },
    powerbank5: { name: 'Xiaomi Pocket Power Bank 10000mAh', price: 39 },
    speaker1: { name: 'Audioengine HD3 Wireless Speaker - 60W Powered', price: 50 },
    speaker2: { name: 'PSB Alpha IQ BluOS Active Speakers', price: 50 },
    speaker3: { name: 'Kanto Ora Powered Reference Desktop', price: 50 },
};

// Initialize cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    if (!cartItemsList) return; // Check if cart-items is available

    cartItemsList.innerHTML = ''; // Clear current cart items

    let totalPrice = 0;

    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(li);
        totalPrice += item.price;
    });

    const deliveryFee = 10; // Set the delivery fee
    const totalAmount = totalPrice + deliveryFee; // Calculate total amount

    document.getElementById('total-price').innerText = `$${totalPrice}`;
    document.getElementById('delivery-fee').innerText = `$${deliveryFee}`;
    document.getElementById('amount-to-pay').innerText = `$${totalAmount}`;
}

// Function to add product to the cart
function addToCart(productId) {
    const product = products[productId]; // Get the product details from the products object
    if (product) {
        cart.push(product); // Add product to the cart
        updateCart(); // Update cart display
        saveCart(); // Save the updated cart to local storage
        alert(`${product.name} has been added to the cart.`); // Notify user
    }
}

// Function to save the cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to clear the cart
function clearCart() {
    cart = []; // Clear the cart array
    updateCart(); // Update cart display
    localStorage.removeItem('cart'); // Remove the cart from local storage
}

// Call this function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Update the cart display
    updateCart();

    // Initialize event listeners for product buttons
    const addToCartButtons = document.querySelectorAll('.product-button'); // Use the correct selector for your buttons

    // Make sure to remove any existing event listeners to prevent duplicate
    addToCartButtons.forEach(button => {
        button.removeEventListener('click', addToCart); // Remove existing listeners
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId; // Get the product ID from the button
            addToCart(productId); // Add the product to the cart
        });
    });

    // Add event listener for clearing the cart
    const clearCartButton = document.createElement('button');
    clearCartButton.textContent = 'Empty your cart';
    clearCartButton.style.display = 'inline-block'; // Change to inline-block for side-by-side layout
    clearCartButton.style.margin = '0 10px'; // Add margin for spacing
    clearCartButton.addEventListener('click', clearCart); // Call clearCart function on click

    // Append both buttons to the button container
    const buttonContainer = document.querySelector('.button-container'); // Ensure to get the container
buttonContainer.appendChild(clearCartButton); // Append to the button container
});
