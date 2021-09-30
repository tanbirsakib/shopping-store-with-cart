const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product cardstyle m-3 rounded-3">
      <div>
       <img class="product-image" src=${image}></img>
      </div>
      <div class="card-body">
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <h5 class="text-success">Rating: ${product.rating.rate}</h5>
      <h6> Rated By ${product.rating.count} prople</h6>
      </div>
      <div class="card-footer bg-transparent border-0">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
      <button onclick="details()" id="details-btn" class="btn btn-danger">Details</button>
      </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element).toFixed(2);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  let total = parseFloat(convertedOldPrice) + convertPrice;
  total = total.toFixed(2);
  document.getElementById(id).innerText = total;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = parseFloat(getInputValue("price"));
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    parseFloat(getInputValue("price")) + parseFloat(getInputValue("delivery-charge")) +
    parseFloat(getInputValue("total-tax"));

  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


//details button 
const details = () => console.log('details clciked')