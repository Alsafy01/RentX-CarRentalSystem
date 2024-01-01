const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const carNameElement = document.querySelector(".payments .details span:nth-child(2)");
const carPriceElement = document.querySelector(".payments .details span:last-child");
const priceLabelElement = document.querySelector(".checkout .footer .price");

const carName = urlParams.get("name") || "N/A";
const carPrice = urlParams.get("price") ? `$${parseFloat(urlParams.get("price")).toFixed(2)}` : "N/A";

// Retrieve the additional parameters
const carId = urlParams.get("carId") || "N/A";
const globalID = urlParams.get("globalID") || "N/A";

// Use the retrieved values as needed
console.log("Car ID:", carId);
console.log("Global ID:", globalID);

carNameElement.textContent = carName;
carPriceElement.textContent = carPrice;
priceLabelElement.textContent = carPrice;

// Add event listener for return date change
document.getElementById("returndate").addEventListener("change", proceedCheckout);

function proceedCheckout() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Retrieve the necessary card details from URL or wherever available
  const carName = urlParams.get("name") || "N/A";
  const originalPrice = parseFloat(urlParams.get("price")) || 0; // Parse price as float
  const bodyType = urlParams.get("bodyType") || "N/A";
  const imageUrl = urlParams.get("imageUrl") || "https://via.placeholder.com/150"; // Placeholder image if not available

  // Retrieve pickup and return dates
  const pickupDate = document.getElementById("pickdate").value;
  const returnDate = document.getElementById("returndate").value;

  // Calculate the price based on the dates
  const daysDifference = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
  const calculatedPrice = originalPrice * daysDifference;

  // Construct URL with all card details as query parameters
  const params = new URLSearchParams();
  params.append("name", carName);
  params.append("price", calculatedPrice); // Assign the calculated price
  params.append("mainPrice", originalPrice); // Assign the calculated price
  params.append("bodyType", bodyType);
  params.append("imageUrl", imageUrl);

  window.location.href = `checkout.html?${params.toString()}`;
}

// Function to toggle payment fields based on selected payment method
function togglePaymentFields() {
  var selectedPayment = document.getElementById('pay').value;

  // Hide all input fields initially
  document.getElementById('creditCardInput').style.display = 'none';
  document.getElementById('paypalInput').style.display = 'none';

  // Show the input field based on the selected payment method
  if (selectedPayment === 'credit_card') {
    document.getElementById('creditCardInput').style.display = 'block';
  } else if (selectedPayment === 'paypal') {
    document.getElementById('paypalInput').style.display = 'block';
  }
}
