//checking if document is still loading
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}
 

function ready(){
    var removeCartItemButtons = document.getElementsByClassName("btn-cart") //getting elements from HTML document and changing their content(DOM)
    for(var i=0; i < removeCartItemButtons.length; i++){ //for loop starting at 0 and listing all elements from array incrementing by 1
        var button = removeCartItemButtons[i]  //button being whichever iteration we are in
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

//When clicking PURCHASE button deleting all the items from the list, setting total to 0$ and getting a message
function purchaseClicked(){
    alert("Thank you for your purchase!")
    let cartItems = document.getElementsByClassName("cart-items")[0]

    //while continues to execute code as long as whatever is inside () is true - if there is any children inside of the item(true) take the item and remove child
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal() //updating total to 0$ when PURCHASE button is clicked
}

//function for removing items when pressing REMOVE button
function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove() //removing parents parent element from HTML with function remove()
    updateCartTotal() 
}

//updating TOTAL price every time we add new item or change quantity - have to check if numbers are >0
function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <=0){  //checking to see if it is a number or less then 0
        input.value = 1 
    } 
    updateCartTotal()
}

//adding new items to cart
function addToCartClicked(event){
    var button = event.target
    let shopItem = button.parentElement.parentElement //
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText //getting text
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText //getting price
    let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src //getting image- src instead of innerText for images
    addItemToCart(title,price,imageSrc)
    updateCartTotal()
}

//creating new div element so we can add it to the cart
function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement("div") //creating new div element
    cartRow.classList.add("cart-row")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    
    //getting a msg if we click the same item twice
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
    for(let i = 0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title) {
            alert("This item is already added!")
            return 
        }
    }
    //creating new div element from HTML file, ${} signs are so we can put variables directly in our code
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
        cartRow.innerHTML = cartRowContents //innerHTML because we are using HTML code
    cartItems.append(cartRow) //append is adding cart item as the last member of the array

    //removing a cart item, without this doesnt work because we added event listeners as soon as the document loaded and this remove button was added later
    cartRow.getElementsByClassName("btn-cart")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
}

//updating total price of the purchased items - getting all the cart-row elements from cart-items parent (we need price and quantity of the items and we want to multiply them to get our result)

function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName("cart-items")[0] //getting only first of cart items
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0  //setting total price to be equal to 0
    for(let i=0; i < cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat(priceElement.innerText.replace("$", " ")) //turning $ into empty string because we dont want multiplying $ signs only numbers
        let quantity = quantityElement.value //doing .value instead of .innerText because inputs have value and not text
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100 //2 decimal places max
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total 
}