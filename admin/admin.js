var logTerminal = document.getElementById("logTerminal");

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
    // Object to store search parameters
    var searchParams = {};

    // Read values based on the selected search type
    if (searchType === "carInformation") {
      searchParams.carModel = document.getElementById("carModel").value;
      searchParams.carPlateId = document.getElementById("carPlateId").value;
    } else if (searchType === "customerInformation") {
      searchParams.customerName = document.getElementById("customerName").value;
      searchParams.phone = document.getElementById("phone").value;
      searchParams.customerEmail = document.getElementById("customerEmail").value;
    } else if (searchType === "reservationDay") {
      searchParams.reservationDate = document.getElementById("reservationDate").value;
    }

    $.ajax({
      url: 'search.php', // Replace with the actual server-side script URL
      type: 'POST',
      data: searchParams,
      success: function(response) {
          console.log(response);
          addLogToTerminal(response);
          downloadLogs();
          // Handle success response from the server (you can update the UI here)
      },
      error: function(error) {
          console.error(error);
          // Handle error response from the server
      }
  });


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
            addLogToTerminal(response);
            downloadLogs();
            // Handle success response from the server
        },
        error: function(error) {
            console.error(error);
            // Handle error response from the server
        }
    });
}


function addLogToTerminal(log, color = null) {
    const logTerminal = document.getElementById("logTerminal");
    
    // Set the text color if the color argument is provided
    if (color !== null) {
        logTerminal.innerHTML += `<span style="color: ${color};font-weight: bold;">${log}</span>\n`;
    } else {
        // Default color is black
        logTerminal.innerHTML += `<span style="color: black;font-weight: bold;">${log}</span>\n`;
    }
}


document.getElementById("downloadButton").addEventListener("click", downloadLogs);

function downloadLogs() {
    const logTerminal = document.getElementById("logTerminal");

    // Default file format is "txt"
    const format = "txt";

    const logs = logTerminal.innerText;

    // Create a Blob containing the logs
    const blob = new Blob([logs], { type: `text/${format}` });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `logs.${format}`;
    link.style.display = "none";

    // Append the link to the terminal container and trigger the download
    document.getElementById("terminalContainer").appendChild(link);
    link.click();

    // Remove the link from the terminal container
    document.getElementById("terminalContainer").removeChild(link);
}




function _openFilterSettings() {
	console.log("fuck");
  var filterModal = document.getElementById("filterModal");
  filterModal.style.display = "flex";
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

function closeFilterSettings() {
  var filterModal = document.getElementById("filterModal");
  filterModal.style.display = "none";
}

function saveFilters() {
    // Get filter values from your HTML elements
    const carIdFilter = document.querySelector('[name="car_id"]').value.trim().toLowerCase();
    const selectedBrands = Array.from(document.querySelectorAll('[name="brand"]:checked')).map(checkbox => checkbox.value);
    const selectedYear = document.querySelector('[name="year"]').value;
    const selectedStatus = document.querySelector('[name="status"]:checked') ? document.querySelector('[name="status"]:checked').value : null;
    const pricePerDayFilter = document.querySelector('[name="price_per_day"]').value;
    const selectedBodyShapes = Array.from(document.querySelectorAll('[name="body_shape"]:checked')).map(checkbox => checkbox.value);
    const selectedColors = Array.from(document.querySelectorAll('[name="color"]:checked')).map(checkbox => checkbox.value);

    // Prepare data to send to the server
    const filtersData = {
        carIdFilter,
        selectedBrands,
        selectedYear,
        selectedStatus,
        pricePerDayFilter,
        selectedBodyShapes,
        selectedColors
    };

    // Send an AJAX request to the PHP file
    $.ajax({
        type: "POST",
        url: "advancedSearch.php", // Replace with the actual path to your PHP file
        data: JSON.stringify(filtersData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            // Handle the response and display results on the page
            if (response.length > 0) {
                // Assuming you have a function to display the results, modify accordingly
                console.log(response);
            } else {
                // No matching data found
                console.log("No matching data found.");
            }
        },
        error: function(error) {
            console.error("Error fetching filtered data:", error);
        }
    });
}