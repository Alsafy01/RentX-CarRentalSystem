var flag = false;
var flagA = false;
var ID = 0;


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

const cardsData_1 = [
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

const cardData_2 = [
  {
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    plate_id: "ABC123",
    status: "active",
    price_per_day: 1000,
    body_shape: "sedan",
    color: "blue",
    car_image: "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-tool-transport-car-sports-car-png-image_6561566.png",
  },
  {
    brand: "Toyota",
    model: "Rav4",
    year: 2023,
    plate_id: "XYZ456",
    status: "active",
    price_per_day: 500,
    body_shape: "SUV",
    color: "black",
    car_image: "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-gray-transportation-reception-sports-car-png-image_6561593.png",
  },
  {
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    plate_id: "DEF789",
    status: "active",
    price_per_day: 600,
    body_shape: "hatchback",
    color: "white",
    car_image: "https://png.pngtree.com/png-clipart/20210725/original/pngtree-mobility-tool-for-car-transportation-png-image_6561561.png",
  },{
    brand: "Audi",
    model: "Q5",
    year: 2022,
    plate_id: "GHI123",
    status: "active",
    price_per_day: 800,
    body_shape: "SUV",
    color: "silver",
    car_image: "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-tool-transport-car-sports-car-png-image_6561566.png",
  },
  {
    brand: "Audi",
    model: "A4",
    year: 2023,
    plate_id: "JKL456",
    status: "active",
    price_per_day: 900,
    body_shape: "sedan",
    color: "red",
    car_image: "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-white-transport-car-sports-car-png-image_6561580.png",
  },];
  
var cardData=[];

function fetchData() {
// Make an AJAX request to fetchData.php
fetch('fetchData.php')
	.then(response => response.json())
	.then(fetchedData => {
	  cardData = fetchedData
	  console.log(cardData);
	  renderCards(fetchedData); // Update the global variable with the fetched data
	})
}

var reserves=[];

function fetchReservations() {
  // Assuming ID is a global variable
  
  
  $.ajax({
    url: "../login/checkLoginAdmin.php", // Create a new PHP file for checking login status
    type: "GET",
    success: function (response) {
        if (response === "true") { 
                  fetch('getAllReservations.php')
                  .then(response => response.json())
                  .then(reserved => {
                      reserves = reserved;
                      console.log(reserved);
                  })

        } 
        else {
          $.ajax({
            url: "../login/ID.php", // Create a new PHP file for checking login status
            type: "GET",
            success: function (response) {
                if (response >0) {
                    variableToSend = response;
                    console.log(variableToSend);
                    fetch('getReservations.php', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json', // Set content type to JSON
                      },
                      body: JSON.stringify({ variable: variableToSend }), // Convert variable to JSON and send in the request body
                  })
                  .then(response => response.json())
                  .then(reserved => {
                      reserves = reserved;
                      console.log(reserved);
                  })
                    
                } 
            }
        });
        }
    }
}); 
  
  
 
  

}
fetchReservations();



function renderCards(cards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  cards.forEach((cardData) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
      <div class="card-img" style="background-image: url(${
          cardData.car_image
      });"></div>
      <div class="card-title">${cardData.brand} ${cardData.model}</div>
      <div class="card-subtitle">${cardData.year} | Plate ID: ${
          cardData.plate_id
      } | Status: ${cardData.status}</div>
      <hr class="card-divider">
      <div class="card-footer">
          <div class="card-price" style="background-color: ${
              cardData.status === "reserved" ? "lightyellow" : "lightgreen"
          };"><span>$</span> <strong>${cardData.price_per_day.toFixed(2)}</strong></div>
          <button class="card-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path><path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path><path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path><path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path></svg>
          </button>
      </div>
    `;

      const addButton = card.querySelector(".card-btn");
      addButton.addEventListener("click", function () {
          // flag = false the user isn't logged in navigate to login
          // flag = true the user logged in navigate to check out 
          if (flag) {
              addToCards(cardData.brand + " " + cardData.model, cardData.price_per_day, cardData.car_id, cardData.status);
          } else {
              window.location.href = `../login/login.html`;
          }
      });

      const carImage = card.querySelector(".card-img");
      carImage.addEventListener("click", function () {
          // Call the click_image function when the car image is clicked
          click_image(cardData);
      });

      cardsContainer.appendChild(card);
  });
}
//fetchData();


  



let filteredCards = []; // Store searched cars globally to perform the filter on them directly

function performSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();

  const filteredCardData = cardData.filter((card) =>
    card.brand.toLowerCase().includes(searchTerm) ||
    card.model.toLowerCase().includes(searchTerm) ||
    card.color.toLowerCase().includes(searchTerm) ||
    card.body_shape.toLowerCase().includes(searchTerm)
  );
  renderCards(filteredCardData);
}

function saveFilters() {
  // Get filter values from HTML elements
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

  // Send AJAX request to the PHP file
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'filterCars.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            const cars = JSON.parse(xhr.responseText);
            console.log(cars);
			renderCards(cars);
        }
    }
  
  // After filtering, you can update the UI with the merged result
  closeFilterSettings();
  // Clear form inputs
  const formInputs = document.querySelectorAll(
    'input[type="text"], input[type="checkbox"], input[type="radio"], input[type="range"]'
  );
  formInputs.forEach((input) => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked = false;
    } else {
      input.value = '';
    }
  });
};

  // Convert the filtersData object to JSON and send it
  xhr.send(JSON.stringify(filtersData));
}
  



let originalCardsData = cardData.slice(); // Create a copy of the original data


// Declare a global variable to store ID
var globalID;

function addToCards(cardName, cardPrice, carId, status) {
    // Set the global variable
     // Assuming you have jQuery included in your project

     if (status === "active"){
     $.ajax({
      url: "../login/ID.php", // Create a new PHP file for checking login status
      type: "GET",
      success: function (response) {
          if (response >0) {
              globalID = response;
              console.log(ID);
              
  
              window.location.href = `../checkout/checkout.html?name=${encodeURIComponent(
        cardName
    )}&price=${encodeURIComponent(cardPrice)}&carId=${encodeURIComponent(carId)}&globalID=${encodeURIComponent(globalID)}`;
          } else {
          }
      }
  });
}else alert("Sorry you can't reserve this car for now :(");
}


// Function to handle the click event on the car image
function click_image(cardData) {
  
  if (flag){
  $.ajax({
    url: "../login/checkLoginAdmin.php", // Create a new PHP file for checking login status
    type: "GET",
    success: function (response) {
        if (response === "true") { 
            // If the user is logged in
            var userConfirmed = window.confirm("Do you want to update the status?");
            if (userConfirmed) {
            fetch('updateStatus.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify({ 
                    car_id: cardData.car_id,
                    status: cardData.status
                }), // Convert cardData to JSON and send in the request body
            })
            
            .then(data => {
                // Handle the response from the server if needed
                console.log(data);
                fetchData();
            })
          }

        } 
    }
});
}
 

  console.log("Car image clicked:", cardData);


}


function toggleDropdown() {
  var dropdown = document.getElementById("notificationDropdown");
  var reservationsButton = document.querySelector('.filter');

  var rect = reservationsButton.getBoundingClientRect();
  dropdown.style.position = 'absolute';
  dropdown.style.top = rect.bottom + 'px';  // Position below the button
  dropdown.style.left = rect.left + 'px';  // Align with the left edge of the button
  dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';
  loadNotifications()
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.filter')) {
    var dropdown = document.getElementById("notificationDropdown");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    }
  }
}

//const reserves = [
//  {
//    name: "Toyota",
//    price: 1000,
//    reservationId: 48,
//    status: "reserved",
//    imageUrl:
//      "https://png.pngtree.com/png-clipart/20210725/original/pngtree-car-gray-transportation-reception-sports-car-png-image_6561593.png",
//  },
//  {
//    name: "Ford",
//    price: 500,
//    reservationId: 32,
//    status: "picked_up",
//    imageUrl:
//      "https://png.pngtree.com/png-clipart/20210725/original/pngtree-mobility-tool-for-car-transportation-png-image_6561561.png",
//  },
//  // Add more card data as needed
//];

function loadNotifications() {
  const dropdown = document.getElementById("notificationDropdown");
  dropdown.innerHTML = ""; // Clear previous content

  reserves.forEach(card => {
    const notificationItem = document.createElement("div");
    notificationItem.className = "notification-item";

    // Car picture, ID, and name container
    const carInfoContainer = document.createElement("div");
    carInfoContainer.className = "car-info";

    // Car picture (icon)
    const icon = document.createElement("div");
    icon.className = "notification-icon";
    icon.style.backgroundImage = `url(${card.imageUrl})`;

  


    carInfoContainer.appendChild(icon);

    // Car ID and name
    const carDetails = document.createElement("div");
    carDetails.className = "car-details";
    const carIdName = document.createElement("p");
    carIdName.textContent = `ID: ${card.reservationId} - ${card.name}`;
    carDetails.appendChild(carIdName);
    carInfoContainer.appendChild(carDetails);

    // Status
    const status = document.createElement("p");
    status.textContent = `${card.status}`;
	status.style.borderRadius = "5px";
    status.style.color = card.status === "reserved" ? "darkkhaki" : "green";
    status.style.background = card.status === "reserved" ? "lightyellow" : "lightgreen";
    notificationItem.appendChild(carInfoContainer);
    notificationItem.appendChild(status);

    // Price
    const price = document.createElement("p");
    price.textContent = `$${card.price.toFixed(2)}`;
    price.style.fontWeight = "bold";
    price.style.color = "black";
    notificationItem.appendChild(price);
	notificationItem.addEventListener("click", function () {
      handleNotificationClick(card);
    });

    dropdown.appendChild(notificationItem);
  });
}


function handleNotificationClick(card) {
  // Handle the click event for the notification item
  // You can navigate to a specific page or perform any other action
  $.ajax({
    url: "../login/checkLoginAdmin.php", // Create a new PHP file for checking login status
    type: "GET",
    success: function (response) {
        if (response === "true") { 
          
          fetch('handelReservation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({ variable: card.reservationId }), // Convert variable to JSON and send in the request body
        })
        .then(response => response.json())
        fetchData();
        } else {
          console.log(`Clicked on ${card.name} (ID: ${card.reservationId})`);
        }
    }
}); 

  // Add your logic here
}


function login() {
  // Navigate to the login page
  window.location.href = "../login/login.html"; // Update the path accordingly
}

function debug() {
  // Navigate to the signup page
  window.location.href = "../admin/admin.html"; // Update the path accordingly
}

function signup() {
  // Navigate to the signup page
  window.location.href = "../login/signup.html"; // Update the path accordingly
}

function logout() {
    $.ajax({
        url: "../login/logout.php", // Create a new PHP file for handling logout
        type: "POST",
        success: function () {
            // After successful logout, update the login status
            checkLoginStatus();
        }
    });
}


function checkUserLoggedIn() {
	console.log("checkUserLoggedIn: ",flag);
	return flag; // Change this to true if the user is logged in
}
// Assume there's a function to check if the user is an admin
function isAdmin() {
    // Assuming you have jQuery included in your project
    $.ajax({
      url: "../login/checkLoginAdmin.php", // Create a new PHP file for checking login status
      type: "GET",
      success: function (response) {
          if (response === "true") { 
            flagA = true;
            return flagA;
          } else {
              flagA = false;
              return flagA;
          }
      }
  }); 

  return flagA; // The user is not logged in
  
}


// Function to render or hide login/signup buttons based on user login status
function renderAuthButtons() {
const authButtonsContainer = document.getElementById("authButtons");

// Check if the user is logged in
const isLoggedIn = checkUserLoggedIn();
console.log("renderAuthButtons: ",isLoggedIn);

// Clear existing buttons
authButtonsContainer.innerHTML = "";


if (!isLoggedIn) {
	// Render buttons only if the user is not logged in
	const loginButton = document.createElement("button");
	loginButton.textContent = "Login";
	loginButton.className = "filter";
	loginButton.style = "background: none; color: white";
	loginButton.addEventListener("click", login);

	const signupButton = document.createElement("button");
	signupButton.textContent = "Signup";
	signupButton.className = "filter";
	signupButton.style = "border-radius: px";
	signupButton.addEventListener("click", signup);

	// Append buttons to the container
	authButtonsContainer.appendChild(loginButton);
	authButtonsContainer.appendChild(signupButton);
	// Append the "Reservations" button to the container
	
}else{		
// If the user is logged in, render the "Reservations" button
	const reservationsButton = document.createElement("button");
	reservationsButton.textContent = "Reservations";
	reservationsButton.className = "filter reservations-button";
	reservationsButton.style = "width: 100px;";
	reservationsButton.addEventListener("click", toggleDropdown);
	
	const notificationDropdown = document.createElement("div");
	notificationDropdown.className = "notification-dropdown";
	notificationDropdown.id = "notificationDropdown";
// Append the "Reservations" button to the container
	authButtonsContainer.appendChild(reservationsButton);
	authButtonsContainer.appendChild(notificationDropdown);
	
	// Check if the user is an admin
  $.ajax({
    url: "../login/checkLoginAdmin.php", // Create a new PHP file for checking login status
    type: "GET",
    success: function (response) {
        if (response === "true") { 
            // If the user is an admin, render the "Debug" button
            const debugButton = document.createElement("button");
            debugButton.textContent = "Debug";
            debugButton.className = "filter";
            debugButton.style = "background: none; color: white";
            debugButton.addEventListener("click", debug);
            
            // Append the "Debug" button to the container
            authButtonsContainer.appendChild(debugButton);
        } 
    }
}); 
 
	const logoutButton = document.createElement("button");
	logoutButton.textContent = "logout";
	logoutButton.className = "filter";
	logoutButton.style = "border-radius: px";
	logoutButton.addEventListener("click", logout);
	
	// Append the "Debug" button to the container
	authButtonsContainer.appendChild(logoutButton);
}
}


// Check if the user is logged in
function checkLoginStatus() {
    // Assuming you have jQuery included in your project
    $.ajax({
        url: "../login/checkLoginStatus.php", // Create a new PHP file for checking login status
        type: "GET",
        success: function (response) {
            if (response === "true") {
                flag = true;
				console.log(flag);
            } else {
                flag = false;
				console.log(flag);
            }
			renderAuthButtons();
        }
    });
}


function getID() {
  // Assuming you have jQuery included in your project
  $.ajax({
      url: "../login/ID.php", // Create a new PHP file for checking login status
      type: "GET",
      success: function (response) {
          if (response >0) {
              ID = response;
              console.log(ID);
              
          } else {
            ID = response;
            console.log(ID);
          
          }
      }
  });
}

// Call the function when the page loads
$(document).ready(function () {
  //getID(); 
  checkLoginStatus();
  
	// Initial render when the page loads
	// Attach click event to logout button
    $("#logoutButton").click(function () {
        logout();
    });
});
