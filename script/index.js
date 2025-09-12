const loadAllPlant = (e = "") => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => diplayLoadPlant(json.plants));

  if (e.tagName == "BUTTON") {
    const elements = e.parentNode.children;

    for (const element of elements) {
      element.classList.remove("active");
    }

    e.classList.add("active");
  }
};

const diplayLoadPlant = (plants) => {
  const allplanContainer = document.getElementById("allPlantContainer");
  allplanContainer.innerHTML = "";

  for (let plant of plants) {
    allplanContainer.innerHTML += `
           
      <div class="bg-white rounded-lg shadow-lg p-2">
        <img class="h-60 w-full rounded-lg"  src="${plant.image}"> 
        <h2 class="text-xl font-semibold">${plant.name}</h2>
        <p class="">${plant.description}</p>
          <div class="flex justify-between mt-2">
            <p class="font-semibold">${plant.category}</p>
            <p class="font-semibold">${plant.price}</p>
            </div>
            <button class="bg-green-900 p-1 rounded-2xl w-full mt-2 text-white hover:bg-sky-300">Add to Cart</button>
          </div>
       
      `;
  }
};

loadAllPlant();









const loadCategories = () => {
  fetch(" https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displyCategory(json.categories));
};

const displyCategory = (categories) => {
  const categoryContainer = document.getElementById("category-level");

  categoryContainer.innerHTML = `<button onclick="loadAllPlant(this)" class="btn active">All Plants</button>`;

  for (category of categories) {
    categoryContainer.innerHTML += `<button onclick="loadLevelCard(${category.id},this)" class="btn">${category.category_name}</button>
    `;
  }
};

loadCategories();

const loadLevelCard = (id, e) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => diplayLoadPlant(data.plants));

  const elements = e.parentNode.children;

  for (const element of elements) {
    element.classList.remove("active");
  }

  e.classList.add("active");
};
