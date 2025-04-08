import { cart,addToCart } from '/amazonjsfiles/cart.js';
import { products } from '/amazonjsfiles/products.js';
//import{updatecartquantitydisplay} from '/amazonjsfiles/orderSummary.js';
    

    


   function updatecartquantity()
    {
        let cartQuantity=0;
       cart.forEach((item)=>
    {
        cartQuantity+=item.quantity;


    });
    document.querySelector('.cquan')
    .innerHTML=cartQuantity;
}



    
    function rendercartsummary()
    {

    let productHTML='';
    products.forEach((product)=>{

        productHTML+=`<div class="grid-item">

                <img class="img" src=${product.image}>
                ${product.name}
                <div >stars:
                <span class="rating"> ${product.getstars()}
                      ${product.getcount()}
                      </span>
                </div> 
                <span>${product.getprice()}</span>  
                <span>quantity: 
                    <select class="quantity-selector" data-product-id="${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</op tion>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
                    
                </span>
                
                
                <button class="addbutton js-addtocart" data-product-id="${product.id}">add to cart</button>          
            </div>`;

            
    });
 
    //console.log(productHTML);     
    document.querySelector('.js-product-grid')
    .innerHTML=productHTML;
    

    document.querySelectorAll('.js-addtocart')
    .forEach((button)=>{
         button.addEventListener('click',()=>
    {
       const pid=button.dataset.productId;
       const quantityselected=document.querySelector(`.quantity-selector[data-product-id="${pid}"]`);
       const realvalue=parseInt(quantityselected.value);

       addToCart(pid,realvalue);
       updatecartquantity();
       rendercartsummary();

    })}); 

    

updatecartquantity();
}
rendercartsummary();

