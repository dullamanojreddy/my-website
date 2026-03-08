function validateForm() {
  let name = document.getElementById("name").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let email = document.getElementById("email").value.trim();
  let namePattern = /^[A-Za-z ]+$/;
  let mobilePattern = /^[0-9]{10}$/;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  if (name === "") {
    alert("Please enter your Name.");
    return false;
  }
  if (!namePattern.test(name)) {
    alert("Name should contain alphabets only.");
    return false;
  }
  if (mobile === "") {
    alert("Please enter your Mobile Number.");
    return false;
  }
  if (!mobilePattern.test(mobile)) {
    alert("Mobile number must contain exactly 10 digits.");
    return false;
  }
  if (email === "") {
    alert("Please enter your Email.");
    return false;
  }
  if (!emailPattern.test(email)) {
    alert("Please enter a valid Email address.");
    return false;
  }
  alert("Form Submitted Successfully!");
  document.getElementById("contactForm").reset();
  return false;
}