const getId = (id) => document.getElementById(id);

function menuFunction() {
  const toggleMenu = getId("toggleMenu");
  toggleMenu.classList.toggle("flex");
  toggleMenu.classList.toggle("hidden");
}

function showSmallCart() {
  getId("smallCartSec").classList.toggle("hidden");
}

const loadAllCategory = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCategory(data.categories));

  // e.classList.add("active");
};

const showCategory = datas => {
  const categoryDiv = getId("categoryDiv");

  categoryDiv.innerHTML = `<span onclick="loadAllProducts(this)" class="text-lg hover:bg-green-800 hover:text-white px-3 py-1 rounded-sm block cursor-pointer active">All Trees</span>`;

  datas.forEach((data) => {
    categoryDiv.innerHTML += `<span onclick="loadCategoryProduct(${data.id},this)" class="text-lg hover:bg-green-800 hover:text-white px-3 py-1 rounded-sm block cursor-pointer">${data.category_name}</span>`;
  });
};

const loadingFun = status => {
  if(status === true){
    getId("productsDiv").innerHTML = `
    <div class="col-span-full text-center p-10">
            <span class="text-2xl">Loading<span class="loading loading-dots loading-xl"></span></span>
          </div>
    `;
  }
}

const loadAllProducts = (e = "") => {
  loadingFun(true);
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((datas) => showProducts(datas.plants));

  if (e.tagName == "SPAN") {
    const elements = e.parentNode.children;

    for (const element of elements) {
      element.classList.remove("active");
    }

    e.classList.add("active");
  }  
};

const loadCategoryProduct = (catId, e) => {
  loadingFun(true);
  const url = `https://openapi.programming-hero.com/api/category/${catId}`;
  fetch(url)
    .then((res) => res.json())
    .then((datas) => showProducts(datas.plants));

  const elements = e.parentNode.children;

  for (const element of elements) {
    element.classList.remove("active");
  }

  e.classList.add("active");
};

const showProducts = datas => {
  loadingFun(false);
  const productsDiv = getId("productsDiv");
  productsDiv.innerHTML = "";

  datas.forEach((data) => {
    productsDiv.innerHTML += `
    <div class="bg-white p-2 rounded-lg grid gap-2">
          <div class="">
            <img class="rounded-lg h-56 w-full object-cover object-center"
              src="${data.image}"
              alt=""
            />
          </div>  
            <div class="flex flex-col gap-3">
              <h2 onclick="loadProductDetails(${data.id})" class="font-semibold text-base cursor-pointer">${data.name}</h2>
              <p class="text-sm line-clamp-3">${data.description}</p>
              <div class="flex justify-between items-center">
                <span class="bg-green-200 text-green-950 px-3 py-1 rounded-3xl"
                  >${data.category}</span
                >
                <span
                  ><i class="fa-solid fa-bangladeshi-taka-sign text-sm"></i
                  >${data.price}</span
                >
              </div>
              <button onclick="addToCart(${data.id})" class="btn bg-green-800 rounded-4xl border-none py-1">
                Add to Cart
              </button>
            </div>
          </div>
    `;
  });
};

const loadProductDetails = id =>{
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url).then(res=>res.json()).then(item=>showProductDetails(item.plants))
}

const showProductDetails = plant => {

  const productDetails = getId("productDetails");

  productDetails.innerHTML = `
        <h3 class="text-lg font-bold">${plant.name}</h3>
        <img class="rounded-lg h-60 md:h-80 w-full object-cover object-center"
              src="${plant.image}"
              alt=""
            />
        <h3 class="text-base font-medium">Category: <span class="text-sm font-normal">${plant.category}</span></h3>
        <h3 class="text-base font-medium">Price: <span class="text-sm font-normal"><i class="fa-solid fa-bangladeshi-taka-sign text-sm"></i><span>${plant.price}</span></span></h3>
        <h3 class="text-base font-medium">Description: <span class="text-sm font-normal">${plant.description}</span></h3>
        `
        
  getId("my_modal_5").showModal()

}


let cart = [];

const addToCart = async id => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const plant = await fetch(url).then(res=>res.json()).then(plant=>plant.plants)
  cart.push(plant);
  showCart(cart);
}

const showCart = carts => {
  let totalPrice = 0;

  const cartDivs = document.querySelectorAll(".cartDiv");
  const totalPriceSpan = document.querySelectorAll(".totalPrice");

  cartDivs.forEach(cartDiv => {

    cartDiv.innerHTML = "";

    carts.forEach(plant => {

      cartDiv.innerHTML += `
    <div class="flex justify-between items-center">
          <div class="">
            <h2 class="text-lg font-medium">${plant.name}</h2>
            <span class="text-gray-500 text-base"
              ><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span
            >
          </div>
          <i onclick="removeFromCart(${plant.id})" class="fa-solid fa-xmark text-gray-500 text-sm cursor-pointer"></i>
        </div>
    `
    })
    
  })

  carts.forEach(item => totalPrice += item.price)

  totalPriceSpan.forEach(span => span.innerHTML = totalPrice)

}

const removeFromCart = id => {
  cart = cart.filter(item => item.id != id)
  showCart(cart);
}


loadAllCategory();
loadAllProducts();
showCart(cart);
