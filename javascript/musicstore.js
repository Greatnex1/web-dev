
console.log("Hey");
//function ready(){

var removeCartItemButtons = document.getElementsByClassName("btn-danger")
console.log(removeCartItemButtons);

for(var i = 0;  i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    //add a function removeCartItem
    //button.addEventListener('click', removeCartItem)
    //or
 button.addEventListener('click', function(event){
    console.log('clicked');
      var buttonClicked = event.target

        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    
 })
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

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()

}
function  quantityChanged(event){
    var input  = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}
function addToCartClicked(event){
    var button = event.target
    var  shopItem =  button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price= shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title);
addItemToCart(title,price.imgSrc)
}
function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.innerText = title
    var cartItems =document.getElementsByClassName('cart-items')[0]
    var cartRowContent =  `  <div class="container content-section">
    <h2  class="section-header">Cart</h2>
    <div class="cart-row">
        <span class="cart-item cart-header cart-column">ITEM</span>
    
        <span class="cart-price cart-header cart-column">PRICE</span>
    
        <span class="cart-quantity cart-header cart-column">QUANTITY</span>
    </div>
    <div class="class-items">
    <div class="cart-row" >
        <div class="cart-item cart-column">
        <img class="cart-item-image"src="./../images/people/smile.jpg " width="100" height="100">
        <span  class="cart-item-title">half naked </span>
        </div>
        <span class="cart-price cart-column">$19.99</span>
        <div class="cart-quantity cart-column"> 
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" role="button">REMOVE</button>
    </div>`
cartRow.innerHTML=cartRowContent
    cartItems.append(cartRow)
}



function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for(var i = 0; i <cartRows.length; i++){
        var priceElement = cartRows.getElementsByClassName('cart-price')[0]
        var quantityElement =cartRow.getElementsByClassName('cart-quantity-input')[0]

        var price = parseFloat(priceElement.innerText.replace('$', ""))

        var  quantity = quantityElement.value
        total = total + (price + quantity)
    }
    total  = Math.round(total * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText  = '$' + total
}
