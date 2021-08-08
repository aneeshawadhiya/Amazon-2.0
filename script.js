function dropdown() {
  document.getElementById("category-dropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementById("category-dropdown");

    if (dropdowns.classList.contains("show")) {
      dropdowns.classList.remove("show");
    }
  }
};

// This function will fetch items from firebase

function getItems() {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          image: doc.data().image,
          name: doc.data().name,
          make: doc.data().make,
          rating: doc.data().rating,
          price: doc.data().price,
        });
      });

      generateItems(items);
    });
}


// Add to cart Function
 
function addToCart(item){
  
   let cartItem = db.collection("cart-items").doc(item.id);
   cartItem.get()
   .then(function(doc){
     if(doc.exists){
       cartItem.update({
         quantity : doc.data().quantity + 1
       })
     } else {
        cartItem.set({
          image: item.image,
          make: item.make,
          name: item.name,
          rating: item.rating,
          price:item.price,
          quantity: 1
        })
     }
   })
}

function generateItems(items) {
  let itemsHTML = "";

  items.forEach((item) => {


  let doc = document.createElement("div");

  doc.classList.add("main-product", "mr-5");
  doc.innerHTML = ` 
    <div class="w-48 h-52 bg-white flex rounded-lg items-center justify-center">
    <a href="item.html">
      <div class="product-image w-48 h-52 bg-white rounded-lg p-8 flex items-center justify-center">
          <img src="${item.image}">
      </div>
    </a>
    </div>

    <div class="product-name text-gray-700 font-bold mt-2 text-sm">
      ${item.name}
    </div>
    <div class="product-make text-green-700">
    ${item.make}
    </div>
    <div class="product-rating text-yellow-300 font-bold my-1">
      ⭐⭐⭐⭐  ${item.rating}
    </div>
    <div class="product-price font-bold text-gray-700 text-lg">
      $ ${item.price}
    </div>
    
`;


    // itemsHTML += `    
    // <div class="main-product bg-white rounded-xl p-3 shadow-xl  cursor-pointer mr-5">
                            
    // </div>
    
    // `;

    let addToCartEle = document.createElement("div");
    addToCartEle.classList.add(
      "hover:bg-yellow-600",
      "cursor-pointer",
      "product-add","mt-3",
      "h-8",
      "w-28",
      "rounded",
      "bg-yellow-500",
      "text-white",
      "text-md",
      "flex",
      "justify-center",
      "items-center"
    );

    addToCartEle.innerText = "Add to Cart";
addToCartEle.addEventListener("click", function(){
  addToCart(item);

})

    doc.appendChild(addToCartEle);
    document.querySelector(".main-section-products").appendChild(doc);
  });

}

getItems();
