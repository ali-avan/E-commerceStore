import { rendercartsummary } from "/amazonjsfiles/orderSummary.js";

export let cart;
loadfromlocalstorage();
export function loadfromlocalstorage()
{
  cart = JSON.parse(localStorage.getItem('cart'));
if (!Array.isArray(cart)) {
    cart = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId:'1'
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId:'2'
        },
    ];
}
}
function savetolocalstorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, realvalue) {
    const matchingItem = cart.find(item => item.productId === productId);

    if (matchingItem) {
        matchingItem.quantity += realvalue;
    } else {
        cart.push({
            productId: productId,
            quantity: realvalue,
            deliveryOptionId: '1'
        });
    }
    savetolocalstorage();
}

export function removefromcart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    savetolocalstorage();
}

export function updateQuantity(productId, newQuantity) {
    // Find the item in the cart
    const cartItem = cart.find(item => item.productId === productId);
    
    if (cartItem) {
        // Update the quantity
        cartItem.quantity = parseInt(newQuantity, 10);
        
        // Save the updated cart to localStorage
        savetolocalstorage();
        
        // Update the specific item's quantity display in the DOM
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) {
            container.querySelector('.quantity-label').textContent = cartItem.quantity;
        }
        
        // Update the total cart quantity display
        updateCartDisplay();
        rendercartsummary();
    }
}

function updateCartDisplay() {
    let cartQuantity = 0;
    cart.forEach(item => {
        cartQuantity += item.quantity;
    });
    
    // Check if the element with class .cquan exists
    const cartQuantityElement = document.querySelector('.cquan');
    if (cartQuantityElement) {
        cartQuantityElement.innerHTML = cartQuantity;
    } else {
        console.error('Element with class ".cquan" not found in the DOM.');
    }
}

export function updatedeliveryoptions(productId,deliveryOptionId)
{
    let matchingItem;
    cart.forEach((cartItem)=>
    {
        if(productId===cartItem.productId)
            {
                matchingItem=cartItem
            }

    });
    matchingItem.deliveryOptionId=deliveryOptionId;
    savetolocalstorage();


}