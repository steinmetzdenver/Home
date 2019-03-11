document.addEventListener("DOMContentLoaded", function(){
    //*************load item photos from file*******
    producePhotos.forEach(function(item){
      let container = document.getElementById("item-list");
      let imageRow = '<div class="img-row"> <img src="' + item.url +  '" class="row-image"></div>';
      let spanDescription = '<span class="item-description">' + item.description + '</span>' + '<br>';
      let spanId = '<span class="item-id">Item# ' + item.id + ' </span>' + '<br>';
      let spanPrice = '<span>$</span>' + '<span class="item-price">' + item.price + ' </span>' + '<br>';
      let addToCartButton = '<button class="add-to-cart-button" type="button"> Add To Cart </button>';
      let spanGroup = '<div class="span-group">' +  spanDescription + spanId + spanPrice + addToCartButton + '</div>';
      let divRow = document.createElement("div");
      divRow.setAttribute("class","item-row");
      divRow.innerHTML =  imageRow + spanGroup;
      container.appendChild(divRow); 
    })

    // end load item photos from file************

    // ************begin item image mouseover event*************
    let itemRows = document.getElementsByClassName("row-image");
    for (let i=0;i<itemRows.length;i++){
      let itemRow=itemRows[i];
      itemRow.addEventListener("mouseover",
      function(){
        this.style="height:400px;width:400px;transition-duration:4s"});
        itemRow.addEventListener("mouseout",
      function(){
        this.style="height:100px;width:100px;transition:4s"});       
        }

    // **************end item image mouseover event*****************

    //*****check if item is already in cart***************
      function checkCartItemExists(newItem){
        let cartRows = document.getElementsByClassName("cart-item-row");
        let proceed = true;
      for (let i=0;i<cartRows.length;i++)
      {   
          let cartRow = cartRows[i];
          let rowID = cartRow.getElementsByClassName("cart-item-id")[0].innerText;
          if (rowID == newItem) {proceed = false}
      } return proceed;}

    // ****************** begin add to shopping cart **************
        let addToCartButtons = document.getElementsByClassName("add-to-cart-button");
        for (let i=0;i<addToCartButtons.length;i++)
        {
          let addToCartButton = addToCartButtons[i];
          addToCartButton.addEventListener("click", addToShoppingCart);
        }

      function addToShoppingCart(event)
      {
        let buttonClicked = event.target;
        let rowGroup = buttonClicked.parentElement.parentElement;
        let price = rowGroup.getElementsByClassName("item-price")[0].innerText;
        let itemID = rowGroup.getElementsByClassName("item-id")[0].innerText;
        let description = rowGroup.getElementsByClassName("item-description")[0].innerText;
        let imageURL = rowGroup.getElementsByClassName("row-image")[0].src;
              //****if item already in shopping cart send alert*****
              if(checkCartItemExists(itemID)){
              let imageRow = '<div class="cart-img-row"> <img src="' + imageURL +  '" class="cart-row-image"></div>';
              let spanDescription = '<span class="cart-item-description">' + description + '</span>' + '<br>';
              let spanId = '<span class="cart-item-id">' + itemID + ' </span>' + '<br>';
              let spanPrice = '<span>$</span>' + '<span class="cart-price">' + price + '</span>' + '<span>, Quantity: </span>' + '<input class="quantity" " type="number" value="1" style="width:30px;font-size:12px;text-align:right"/> <br>';
              let removeButton = '<button class="remove-button" type="button"> Remove </button>';
              let spanGroup = '<div class="cart-span-group">' +  spanDescription + spanId + spanPrice + removeButton + '</div>';

              let divRow = document.createElement("div");
              divRow.setAttribute("class","cart-item-row");
              divRow.innerHTML =  imageRow + spanGroup;
              document.getElementById("shopping-cart").append(divRow);
              updateTotal();
              let removeCartButtons = document.getElementsByClassName("remove-button");
              for (let i=0;i<removeCartButtons.length;i++)
              {
                let removeCartButton = removeCartButtons[i];
                removeCartButton.addEventListener("click", removeCartItem);
              }
              let quantityChanges = document.getElementsByClassName("quantity");
              for (let i=0;i<quantityChanges.length;i++)
                {
                  let quantityChange = quantityChanges[i];
                  quantityChange.addEventListener("click", changeQuantity);
                }
              }
              else {alert("You have already added this item to your shopping cart")}
              //******end if item already in shopping cart alert****
      } 
      // ************* end add to shopping cart****************
      //**************** begin remove item from shopping cart*************8         
    function removeCartItem(event){
      let removeButton = event.target;
      let removeItem = removeButton.parentElement.parentElement;
      removeItem.remove();
      updateTotal();
      }
      //****************** end remove item from shopping cart************
      //************** begin change quantity input event handler*********
      function changeQuantity(event)
      {   input = event.target;
          if ((input.value==" ") || (input.value <=0))
          {   alert("Please select a quantity greater than 0")
              input.value = 1;
          }
          updateTotal()
      }
      //**************** end change quantity input event handler*********
      //********** begin update total purchase price*******************
      function updateTotal(){
        let totalPrice = 0;
        let quantity = 1;
        let cartRows = document.getElementsByClassName("cart-item-row");
      for (let i=0;i<cartRows.length;i++)
      {   
          let cartRow = cartRows[i];
          let price = parseFloat(cartRow.getElementsByClassName("cart-price")[0].innerText);
          quantity = parseInt(cartRow.getElementsByClassName("quantity")[0].value);
          totalPrice = totalPrice + (price*quantity);  
          totalPrice = Math.round(totalPrice*100)/100;  
      }
      document.getElementById("total-purchase").innerHTML = totalPrice;}
      //************** end update total purchase price********
    });  //end document ready
