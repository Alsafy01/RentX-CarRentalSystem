function openFilterSettings() {
  var filterModal = document.getElementById("filterModal");
  filterModal.style.display = "flex";
}

function closeFilterSettings() {
  var filterModal = document.getElementById("filterModal");
  filterModal.style.display = "none";
}

function selectOption(selectedOption) {
  var circleRow = selectedOption.parentNode;
  var circles = circleRow.getElementsByClassName("circle");
  for (var i = 0; i < circles.length; i++) {
    circles[i].classList.remove("active");
  }

  selectedOption.classList.add("active");
}

function toggleCategory(categoryId) {
  var selectedCategory = document.getElementById(categoryId);
  var isActive = selectedCategory.classList.contains("active");

  var categories = document.querySelectorAll(".category-settings");
  categories.forEach(function (category) {
    if (category.id !== categoryId) {
      category.classList.remove("active");
    }
  });

  if (!isActive) {
    selectedCategory.classList.add("active");
  } else {
    selectedCategory.classList.remove("active");
  }
}

const cardsData = [
  {
    name: "Toyota",
    price: 1000,
    bodyType: "sedan",
    imageUrl:
      "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-gray-transportation-reception-sports-car-png-image_6561593.png",
  },
  {
    name: "Toyota",
    price: 500,
    bodyType: "SUV",
    imageUrl:
      "https://png.pngtree.com/png-clipart/20210725/original/pngtree-mobility-tool-for-car-transportation-png-image_6561561.png",
  },
  {
    name: "Tesla",
    price: 600,
    bodyType: "hatchback",
    imageUrl:
      "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-tool-transport-car-sports-car-png-image_6561566.png",
  },
  {
    name: "Audi",
    price: 800,
    bodyType: "SUV",
    imageUrl:
      "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-white-transport-car-sports-car-png-image_6561580.png",
  },
  {
    name: "Audi",
    price: 900,
    bodyType: "sedan",
    imageUrl:
      "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-transportation-transportation-transportation-wheels-png-image_6561550.png",
  },
  {
    name: "Ferrari",
    price: 450,
    bodyType: "sedan",
    imageUrl:
      "https://png.pngtree.com/png-clipart/20230426/original/pngtree-fashion-car-private-car-orange-red-car-simulation-illustration-picture-image_4484916.png",
  },
  {
    name: "Ferrari",
    price: 600,
    bodyType: "sedan",
    imageUrl:
      "https://png.pngtree.com/png-clipart/20230426/original/pngtree-fashion-car-private-car-orange-red-car-simulation-illustration-picture-image_4484916.png",
  },
  {
    name: "Renault",
    price: 1000,
    bodyType: "hatchback",
    imageUrl:
      "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-transportation-transportation-transportation-wheels-png-image_6561550.png",
  },
  {
    name: "Renault",
    price: 500,
    bodyType: "sedan",
    imageUrl:
      "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-tool-transport-car-sports-car-png-image_6561566.png",
  },
];

function renderCards(cards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  cards.forEach((cardData) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
	  <div class="card-img" style="background-image: url(${
      cardData.imageUrl
    });"></div>
      <div class="card-title">${cardData.name}</div>
	  <div class="card-subtitle">Product description. Lorem ipsum dolor sit amet,
      <hr class="card-divider">
      <div class="card-footer">
          <div class="card-price"><span>$</span> ${cardData.price.toFixed(
            2
          )}</div>
          <button class="card-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path><path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path><path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path><path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path></svg>
          </button>
      </div>
    `;

    const addButton = card.querySelector(".card-btn");
    addButton.addEventListener("click", function () {
      addToCards(cardData.name, cardData.price);
    });

    cardsContainer.appendChild(card);
  });
}

renderCards(cardsData);

let filteredCards = []; // Store searched cars globally to perform the filter on them directly

function performSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();

  filteredCards = cardsData.filter((card) =>
    card.name.toLowerCase().includes(searchTerm)
  );
  renderCards(filteredCards);
}

function saveFilters() {
  const selectedBodyType = document.querySelector(
    'input[name="radioSedan"]:checked'
  )
    ? "sedan"
    : document.querySelector('input[name="radioSuv"]:checked')
    ? "SUV"
    : document.querySelector('input[name="radioHatch"]:checked')
    ? "hatchback"
    : null;

  const selectedPrice = document.querySelector('input[name="radio1"]:checked')
    ? "under 500$"
    : document.querySelector('input[name="radio2"]:checked')
    ? "500$-800$"
    : document.querySelector('input[name="radio3"]:checked')
    ? "above 800$"
    : null;

  let newlyFilteredCards = filteredCards.slice(); //copy the searched cars performed

  if (selectedBodyType) {
    newlyFilteredCards = newlyFilteredCards.filter(
      (card) =>
        card.bodyType &&
        card.bodyType.toLowerCase() === selectedBodyType.toLowerCase()
    );
  }

  if (selectedPrice === "under 500$") {
    newlyFilteredCards = newlyFilteredCards.filter((card) => card.price < 500);
  } else if (selectedPrice === "500$-800$") {
    newlyFilteredCards = newlyFilteredCards.filter(
      (card) => card.price >= 500 && card.price <= 800
    );
  } else if (selectedPrice === "above 800$") {
    newlyFilteredCards = newlyFilteredCards.filter((card) => card.price > 800);
  }

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((button) => {
    button.checked = false;
  });

  renderCards(newlyFilteredCards);
  closeFilterSettings();
}
let originalCardsData = cardsData.slice(); // Create a copy of the original data

function returnToOriginal() {
  filteredCards = [];
  renderCards(originalCardsData);
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((button) => {
    button.checked = false;
  });
  const searchInput = document.getElementById("searchInput");
  searchInput.value = "";
}

function addToCards(cardName, cardPrice) {
  window.location.href = `checkout.html?name=${encodeURIComponent(
    cardName
  )}&price=${encodeURIComponent(cardPrice)}`;
}
