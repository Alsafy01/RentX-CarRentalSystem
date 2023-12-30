document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission
  
      // Get email and password values
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Make AJAX request to check credentials
      const xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // Handle the response from the PHP file
          const response = xhr.responseText;
          if (response === "success") {
            // Redirect to a certain HTML page
            window.location.href = "rent.html"; // Replace with your desired page
          } else {
            alert("Invalid email or password"); // You can customize this part
          }
        }
      };
  
      // Replace 'checkCredentials.php' with your PHP file name
      xhr.open("POST", "checkCredentials.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send("email=" + email + "&password=" + password);
    });
  });
  