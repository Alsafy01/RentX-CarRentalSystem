const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const carNameElement = document.querySelector(".payments .details span:nth-child(2)");
const carPriceElement = document.querySelector(".payments .details span:last-child");
const priceLabelElement = document.querySelector(".checkout .footer .price");

const carName = urlParams.get("name") || "N/A";
const carPrice = urlParams.get("price") ? `$${parseFloat(urlParams.get("price")).toFixed(2)}` : "N/A";
var totalPrice = carPrice;

// Retrieve the additional parameters
const carId = urlParams.get("carId") || "N/A";
const globalID = urlParams.get("globalID") || "N/A";

// Use the retrieved values as needed
console.log("Car ID:", carId);
console.log("Global ID:", globalID);

carNameElement.textContent = carName;
carPriceElement.textContent = carPrice;
priceLabelElement.textContent = totalPrice;

// Add event listener for return date change
//document.getElementById("returndate").addEventListener("change", proceedCheckout);
const params = new URLSearchParams();

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

  // Construct URL with all card details as query parameters

  params.append("name", carName);
  params.append("price", totalPrice); // Assign the calculated price
  params.append("mainPrice", originalPrice); // Assign the calculated price
  params.append("bodyType", bodyType);
  params.append("imageUrl", imageUrl);
  
  const formData = new FormData();
  formData.append("price", totalPrice); // Assign the calculated price
  formData.append("customer_id", globalID);
  formData.append("car_id", carId);
  formData.append("pickupDate", pickupDate);
  formData.append("returnDate", returnDate);

  // Add the selected payment method to the formData
  formData.append("payment_method", document.getElementById('pay').value);
  formData.append("paypalnum", document.getElementById('paypalNumber').value);
  formData.append("creditnum", document.getElementById('creditCardNumber').value);
  formData.append("creditExp", document.getElementById('creditCardExp').value);
  formData.append("location", document.getElementById('location').value);
  
  fetch("checkout.php", {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from PHP (if needed)
      
      console.log("Checkout response:", data);
    })
    .catch(error => {
      // Handle errors
      console.error("Error during checkout:", error);
    });

  window.location.href = `checkout.html?${params.toString()}`;




}

function updateTotalPrice() {
	const originalPrice = parseFloat(urlParams.get("price")) || 0; // Parse price as float
	
	const pickupDateValue = document.getElementById('pickdate').value;
    const returnDateValue = document.getElementById('returndate').value;

	// Calculate the price based on the dates
	const returnDate = new Date(returnDateValue);
	const pickupDate = new Date(pickupDateValue);

	const daysDiff = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
	
	totalPrice = originalPrice * daysDiff;

	console.log('Total Price:', totalPrice); // You can adjust this based on how you want to handle the total price
	// Update the label with the new total price
	if(pickupDateValue && returnDateValue){
		const priceLabel = document.querySelector('.price');
		priceLabel.textContent = `$${totalPrice}`;
	}
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

document.getElementById('pickdate').addEventListener('change', function () {
	const pickupDate = this.value;
	document.getElementById('returndate').min = pickupDate;
	updateTotalPrice(); // Call the function to update total price
});

document.getElementById('returndate').addEventListener('change', function () {
	const returnDate = this.value;
	document.getElementById('pickdate').max = returnDate;
	updateTotalPrice(); // Call the function to update total price
});












