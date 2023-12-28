const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const carName = urlParams.get("name");
const carPrice = urlParams.get("price");

const carNameElement = document.querySelector(
  ".payments .details span:nth-child(2)"
);
const carPriceElement = document.querySelector(
  ".payments .details span:last-child"
);
const priceLabelElement = document.querySelector(".checkout .footer .price");

carNameElement.textContent = carName || "N/A";
carPriceElement.textContent = carPrice
  ? `$${parseFloat(carPrice).toFixed(2)}`
  : "N/A";
priceLabelElement.textContent = carPrice
  ? `$${parseFloat(carPrice).toFixed(2)}`
  : "N/A";

function proceedCheckout() {
  var locationInput = document.getElementById("location");
  var inputValue = inputElement.locationInput;
  alert("The value entered is: " + inputValue);
  // continue the same with rest of the input data to put in the schema @safy @daabis @alygamal
}
