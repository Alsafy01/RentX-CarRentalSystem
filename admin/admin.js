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
  //insert code to register the car to the query use getelementbyid for ech input text or date dont forget to take the status from
  //   <select id="status">
  //   <option value="active">Active</option>
  //   <option value="out_of_service">Out of Service</option>
  //   <option value="rented">Rented</option>
  // </select>
}
