const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const carNameElement = document.querySelector(
  ".payments .details span:nth-child(2)"
);
const carPriceElement = document.querySelector(
  ".payments .details span:last-child"
);
const priceLabelElement = document.querySelector(".checkout .footer .price");

const carName = urlParams.get("name") || "N/A";
const carPrice = urlParams.get("price")
  ? `$${parseFloat(urlParams.get("price")).toFixed(2)}`
  : "N/A";

carNameElement.textContent = carName;
carPriceElement.textContent = carPrice;
priceLabelElement.textContent = carPrice;
function proceedCheckout() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Retrieve the necessary card details from URL or wherever available
  const carName = urlParams.get("name") || "N/A";
  const carPrice = parseFloat(urlParams.get("price")) || 0; // Parse price as float
  const bodyType = urlParams.get("bodyType") || "N/A";
  const imageUrl =
    urlParams.get("imageUrl") || "https://via.placeholder.com/150"; // Placeholder image if not available

  // Construct URL with all card details as query parameters
  const params = new URLSearchParams();
  params.append("name", carName);
  params.append("price", carPrice); // Assign the numeric price directly without formatting
  params.append("bodyType", bodyType);
  params.append("imageUrl", imageUrl);

  window.location.href = `reservations.html?${params.toString()}`;
}
