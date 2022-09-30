//a major step to follow when creating element in js
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}  else {
    ready()
}

function ready(){ 
    var removeCartItemButtons = document.getElementsByClassName("btn-danger")
console.log(removeCartItemButtons);

for(var i = 0;  i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
 button.addEventListener('click', removeCartItem)
}

}
function removeCartItem(event){


    var buttonClicked = event.target

    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()

}



function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement =cartRow.getElementsByClassName('cart-quantity-input')[0]

        var price = parseFloat(priceElement.innerText.replace('$', ""))
console.log(price);
        var  quantity = quantityElement.value
        console.log(price*quantity);
        total = total + (price * quantity)
    }
    total  = Math.round(total * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText  = '$' + total
}

//users won't be aablbe to  demand for quantity less than 1
function  quantityChanged(event){
    var input  = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

var quantityInputs = document.getElementsByClassName('cart-quantity-input')

for(var i = 0;  i < quantityInputs.length; i++){
    var button = quantityInputs[i]
    button.addEventListener('click', quantityChanged)
}
var addToCartButton = document.getElementsByClassName('shop-item-button')

for(var i = 0;  i <addToCartButton.length; i++){
    var button = addToCartButton[i]
    button.addEventListener('click', addToCartClicked)

}
 document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)



function addToCartClicked(event){
    var button = event.target
    var  shopItem =  button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price= shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title,price);
addItemToCart(title,price,imageSrc)
updateCartTotal()
}
function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.innerText = title
    
    var cartItems =document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
for(var i = 0; i < cartItemNames.length; i++){
    if(cartItemNames[i].innerText == title){
        alert("Item already exists in the cart")
    }
}
    var cartRowContent =  ` <div class="cart-item cart-column">
    <img  class="cart-item-image" src="${imageSrc}" width="100" height="100">

<span  class="cart-item-title">${title} </span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column"> 
<input class="cart-quantity-input" type="number" value="1">
<button class="btn btn-danger" type="button">REMOVE</button>
</div> `
cartRow.innerHTML=cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

function  purchaseClicked(){
    alert("Purchase made! Thank you")

    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}




