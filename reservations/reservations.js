function saveCardData(cards) {
  sessionStorage.setItem("savedCards", JSON.stringify(cards));
}

function getSavedCardData() {
  const savedCards = sessionStorage.getItem("savedCards");
  return savedCards ? JSON.parse(savedCards) : [];
}

function renderCard(cardData) {
  const cardsContainer = document.getElementById("cardsContainer");

  const card = document.createElement("div");
  card.className = "card";

  const cardImg = document.createElement("div");
  cardImg.className = "card-img";
  cardImg.style.backgroundImage = `url(${cardData.imageUrl})`;

  const cardTitle = document.createElement("div");
  cardTitle.className = "card-title";
  cardTitle.textContent = cardData.name;

  const cardSubtitle = document.createElement("div");
  cardSubtitle.className = "card-subtitle";
  cardSubtitle.textContent = `Type: ${cardData.bodyType}`;

  const cardDivider = document.createElement("hr");
  cardDivider.className = "card-divider";

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";

  const cardPrice = document.createElement("div");
  cardPrice.className = "card-price";
  cardPrice.innerHTML = `<span>$</span> ${cardData.price.toFixed(2)}`;

  const cardButton = document.createElement("button");
  cardButton.className = "card-btn";
  cardButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"/></svg>`;
  cardButton.addEventListener("click", function () {
    card.remove(); // Remove the card when the button is clicked
    const savedCards = getSavedCardData().filter(
      (savedCard) => savedCard.name !== cardData.name
    ); // Remove the card from saved cards
    saveCardData(savedCards);
  });

  cardFooter.appendChild(cardPrice);
  cardFooter.appendChild(cardButton);

  card.appendChild(cardImg);
  card.appendChild(cardTitle);
  card.appendChild(cardSubtitle);
  card.appendChild(cardDivider);
  card.appendChild(cardFooter);

  cardsContainer.appendChild(card);
}

function renderSavedCards() {
  const savedCards = getSavedCardData();
  savedCards.forEach((card) => renderCard(card));
}

// Get the new card data from URL params or other sources
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const newCardData = {
  name: urlParams.get("name") || "N/A",
  price: parseFloat(urlParams.get("price")) || 0,
  bodyType: urlParams.get("bodyType") || "N/A",
  imageUrl: urlParams.get("imageUrl") || "https://via.placeholder.com/150", // Placeholder image if not available
};

// Render existing saved cards
renderSavedCards();

// Render and save the new card
renderCard(newCardData);
const updatedCards = [...getSavedCardData(), newCardData];
saveCardData(updatedCards);
