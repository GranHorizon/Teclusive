function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn btn-danger')
for (var i = 0; i <removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
       }

       var quantityInputs = document.getElementsByClassName('cart-quantity-input')
       for (var i = 0; i < quantityInputs.length; i++) {
           var input = quantityInputs[i]
           input.addEventListener('change', quantityChanged)
       }

       var addToCartbuttons = document.getElementsByClassName('addcart')
       for (var i = 0; i < addToCartbuttons.length; i++) {
        var button = addToCartbuttons[i]
        button.addEventListener('click', addToCartClicked)
    }
    var purchase = document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    
    if (window.location.pathname.split("/").pop() === "cart.html")
        {
            addItemToCart()
            updateCartTotal()
        }
}
// THANK YOU FOR YOUR PURCHASE ALERT //
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    var shopItem = buttonClicked.parentElement.parentElement
    var title = shopItem.getElementsByClassName('cart-item-title')[0].innerText
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    for (var i = 0; i < cartItems.length; i++) {
        if (title === cartItems[i].title) {
            cartItems.splice(i, 1)
        }
    }
    if (cartItems.length < 1) {
        localStorage.setItem("cartItems", null)
    }
    else {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <=0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var imageSrc = document.getElementsByClassName('shop-item')[0].src
    // Get existing data from localStorage and convert to JSON
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    // Make sure cartItems is not null
    if (cartItems) {
        for (var i = 0; i < cartItems.length; i++) {
            if (title === cartItems[i].title) {
                alert("You have already added this product. Please change the quantity from the cart page!")
                return
            }
        }
        cartItems.push({'title': title, 'price': price, 'imageSrc': imageSrc})
    }
    else {

        var cartItems = []
        cartItems.push({'title': title, 'price': price, 'imageSrc': imageSrc})
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}
// ADDS ITEMS TO ADD TO CART BY USING CART ITEMS, IMAGE SOURCE AND PRICE
function addItemToCart() {
    cart = document.getElementsByClassName("cart-items")[0]
    cartItems = JSON.parse(localStorage.getItem("cartItems"))
    for (var i = 0; i < cartItems.length; i++) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        
        var cartRowContents =
            `  <div class="cart-item cart-column">
            <img class="cart-item-image" src="${cartItems[i].imageSrc}" width="100" height="100">
            <span class="cart-item-title">${cartItems[i].title}</span>
        </div>
        <span class="cart-price cart-column">${cartItems[i].price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
        cartRow.innerHTML = cartRowContents
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',
        removeCartItem)
            cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
            cart.appendChild(cartRow)
    }
}
// UPDATING THE CART ITEMS WHICH CHANGES QUANTITY AND PRICE
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i <cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
        [0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function myFunction() {
    document.getElementsByClassName("container").reset();
}
ready()