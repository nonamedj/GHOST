 var removeButtons = document.getElementsByClassName('btn-danger');

 for(var i=0; i < removeButtons.length; i++) {
   var button = removeButtons[i];
   button.addEventListener('click', removeCartItem)
 }

 var quantityInputs = document.getElementsByClassName('cart-quantity-input');
 for(var i=0; i < quantityInputs.length; i++) {
   var input = quantityInputs[i];
   input.addEventListener('change', quantityChanged);
 }

var addToCartButton = document.getElementsByClassName('shop-item-btn');
for(var i=0; i < addToCartButton.length; i++) {
  var button = addToCartButton[i];
  button.addEventListener('click', addToCartClicked);
}


 function quantityChanged(event){
   var input = event.target;
   if(isNaN(input.value) || input.value <= 0) {
     input.value = 1;
   }
   updateCartTotal();
 }


 /*tour buttons */
 var tourButtons = document.getElementsByClassName('tour-btn');
 for(var i=0; i < tourButtons.length; i++) {
   var button = tourButtons[i];
   button.addEventListener('click', funDelay);
 }
 function funDelay(){
  alert("Canceled Events Due to the Coronavirus");
 }
/*tour buttons */


 document.getElementsByClassName('buy-btn')[0].addEventListener('click', purchaseClicked)

 function purchaseClicked(){
   alert('Thank you for your purchase');
   var cartItems = document.getElementsByClassName('cart-items')[0];
   while(cartItems.hasChildNodes()){
     cartItems.removeChild(cartItems.firstChild);
   }
   updateCartTotal();
 }

function removeCartItem (event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function addToCartClicked(event){
  alert("Add to cart")
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var  cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for(var i = 0 ; i < cartItemNames.length; i++){
    if(cartItemNames[i].innerText == title) {
      alert('This item is already added to your cart');
      return;
    }
  }
  var cartRowContent = `
  <div class="cart-row">
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
    </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
  </div>
  `;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for(var i=0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

    var price = parseFloat(priceElement.innerText.replace('$',''));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  total = Math.round(total * 100) / 100; //round the total to two decimal
  document.getElementsByClassName('cart-total-price')[0].innerText =  '$' + total;
}
