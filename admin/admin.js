function openFilterSettings() {
  var filterDropdown = document.getElementById("actionType");
  if (filterDropdown.style.display === "none") {
    filterDropdown.style.display = "block";
  } else {
    filterDropdown.style.display = "none";
  }
}

var actionDropdown = document.getElementById("actionType");

var registerCarContent = document.getElementById("registerCarContent");
var searchContent = document.getElementById("searchContent");
var generateReportContent = document.getElementById("generateReportContent");

actionDropdown.addEventListener("change", function () {
  registerCarContent.style.display = "none";
  searchContent.style.display = "none";
  generateReportContent.style.display = "none";

  var selectedOption = actionDropdown.value;
  if (selectedOption === "registerCar") {
    registerCarContent.style.display = "block";
  } else if (selectedOption === "search") {
    searchContent.style.display = "block";
  } else if (selectedOption === "generateReport") {
    generateReportContent.style.display = "block";
  }
});

//dropdown element
var searchTypeDropdown = document.getElementById("searchType");

//input field divs for each option
var carInfoFields = document.getElementById("carInfoFields");
var customerInfoFields = document.getElementById("customerInfoFields");
var reservationFields = document.getElementById("reservationFields");

//event listener to the dropdown
searchTypeDropdown.addEventListener("change", function () {
  carInfoFields.style.display = "none";
  customerInfoFields.style.display = "none";
  reservationFields.style.display = "none";

  //select which to show
  var selectedOption = searchTypeDropdown.value;
  if (selectedOption === "carInformation") {
    carInfoFields.style.display = "block";
  } else if (selectedOption === "customerInformation") {
    customerInfoFields.style.display = "block";
  } else if (selectedOption === "reservationDay") {
    reservationFields.style.display = "block";
  }
});

function getreport() {
  //insert code to get the reports from query use getelementbyid for ech input text or date
}
function advancedSearch() {
  //insert code to get the search desired from query use getelementbyid for ech input text or date
}

function registerCar() {
// Gather data from form fields
var model = document.getElementById('model').value;
var brand = document.getElementById('brand').value;
var year = document.getElementById('year').value;
var plateId = document.getElementById('plateId').value;
var status = document.getElementById('status').value;
var pricePerDay = document.getElementById('pricePerDay').value;
var bodyShape = document.getElementById('bodyShape').value;
var color = document.getElementById('color').value;
var carImageInput = document.getElementById('carImage');

// Create an object to hold the data
var carData = {
  model: model,
  brand: brand,
  year: year,
  plateId: plateId,
  status: status,
  pricePerDay: pricePerDay,
  bodyShape: bodyShape,
  color: color,
};

// Append the file input to the FormData object
var formData = new FormData();
formData.append('carData', JSON.stringify(carData));
formData.append('carImage', carImageInput.files[0]);

console.log('Car Data:', carData);
console.log('Car Image:', carImageInput.files[0]);

// Send FormData to PHP file using AJAX
var xhr = new XMLHttpRequest();
xhr.open('POST', 'registerCar.php', true);

xhr.onload = function () {
  if (xhr.status === 200) {
	// Handle successful response
	console.log(xhr.responseText);
	// Add a delay of 2 seconds before additional logic
	setTimeout(function () {
	  // You can add additional logic here based on the response from the server
	  console.log('Additional logic after delay');
	}, 2000);
  } else {
	// Handle error
	console.error('Error:', xhr.statusText);
  }
};

// Send FormData
xhr.send(formData);
}

function registerCar() {
    // Gather data from form fields
    var model = document.getElementById('model').value;
    var brand = document.getElementById('brand').value;
    var year = document.getElementById('year').value;
    var plateId = document.getElementById('plateId').value;
    var status = document.getElementById('status').value;
    var pricePerDay = document.getElementById('pricePerDay').value;
    var bodyShape = document.getElementById('bodyShape').value;
    var color = document.getElementById('color').value;
    var carImageInput = document.getElementById('carImage');

    // Create FormData object to send files
    var formData = new FormData();
    formData.append('model', model);
    formData.append('brand', brand);
    formData.append('year', year);
    formData.append('plateId', plateId);
    formData.append('status', status);
    formData.append('pricePerDay', pricePerDay);
    formData.append('bodyShape', bodyShape);
    formData.append('color', color);
    formData.append('carImage', carImageInput.files[0]);

    // Make AJAX request to the server
    $.ajax({
        url: 'registerCar.php', // Replace with the actual server-side script URL
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            // Handle success response from the server
        },
        error: function(error) {
            console.error(error);
            // Handle error response from the server
        }
    });
}