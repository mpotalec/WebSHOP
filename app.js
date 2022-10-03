if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}
 

function ready(){
    var removeCartItemButtons = document.getElementsByClassName("btn-cart")  //getting elements from HTML document and changing their content(DOM)
    for(var i=0; i < removeCartItemButtons.length; i++){ //for loop starting at 0 and listing all elements from array incrementing by 1
        var button = removeCartItemButtons[i] //button being whichever element we are in
        button.addEventListener("click", removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName("shop-item-btn")
    for(var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCartClicked)
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked)
}

function purchaseClicked(){
    alert("Thank you for your purchase!")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event){//adding listener for click event
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove() //removing parents parent element from HTML with function remove()
    updateCartTotal() //updating total price when we remove items
}

function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <=0){  //checking to see if it is a number or less then 0
        input.value = 1 //setting input number to 1
    } 
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
    addItemToCart(title,price,imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement("div") //creating new div element
    cartRow.classList.add("cart-row")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
    for(let i = 0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title) {
            alert("This item is already added!")
            return 
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" alt="bagel">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-cart" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-cart")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
}

function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName("cart-items")[0] //getting only first of cart items
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0
    for(let i=0; i < cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat(priceElement.innerText.replace("$", " "))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100 //2 decimal places max
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total
}