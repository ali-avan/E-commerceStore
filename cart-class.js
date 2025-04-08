import { rendercartsummary } from "/amazonjsfiles/orderSummary.js";

//class is basically an object generator

class Cart {
    cartItems=undefined;
    #localStoragekey=undefined; //private property

    constructor(localStoragekey)
    {
        
        this.localStoragekey=localStoragekey;
        this.#loadfromlocalstorage();
    }


    #loadfromlocalstorage()
    {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStoragekey));
    if (!Array.isArray(this.cartItems)) {
        this.cartItems = [
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

    savetolocalstorage() {
        localStorage.setItem(this.#localStoragekey, JSON.stringify(this.cartItems));
    }
    
    addToCart(productId, realvalue) {
        const matchingItem = this.cartItems.find(item => item.productId === productId);
    
        if (matchingItem) {
            matchingItem.quantity += realvalue;
        } else {
            cart.push({
                productId: productId,
                quantity: realvalue,
                deliveryOptionId: '1'
            });
        }
        this.savetolocalstorage();
    }
    removefromcart(productId) {
        this.cartItems = this.cartItems.filter(item => item.productId !== productId);
        this.savetolocalstorage();
    }
    
    updateQuantity(productId, newQuantity) {
        // Find the item in the cart
        const cartItem = this.cartItems.find(item => item.productId === productId);
        
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
    
    updateCartDisplay() {
        let cartQuantity = 0;
        this.cartItems.forEach(item => {
            cartQuantity += item.quantity;
        });
        
        // Check if the element with class .cquan exists
        const cartQuantityElement = document.querySelector('.cquan');
        if (cartQuantityElement) {
            cartQuantityElement.innerHTML = cartQuantity;
        } else {
            console.error('Element with class ".cquan" not found in the DOM.');
        }
        this.savetolocalstorage();
    }
    
    updatedeliveryoptions(productId,deliveryOptionId)
    {
        let matchingItem;
        this.cartItems.forEach((cartItem)=>
        {
            if(productId===cartItem.productId)
                {
                    matchingItem=cartItem
                }
    
        });
        matchingItem.deliveryOptionId=deliveryOptionId;
        this.savetolocalstorage();
    
    
    }





}


const cart= new Cart('cart-oop'); //for constructor




