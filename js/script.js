document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let mobile = document.getElementById("mobile").value.trim();
        let reason = document.getElementById("address").value.trim();

        let namePattern = /^[A-Za-z ]+$/;
        let mobilePattern = /^[0-9]{10}$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

        if (name === "" || email === "" || mobile === "" || reason === "") {
            alert("All fields are required");
            return;
        }

        if (!namePattern.test(name)) {
            alert("Name must contain only alphabets");
            return;
        }

        if (!mobilePattern.test(mobile)) {
            alert("Mobile must be exactly 10 digits");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Enter valid email address");
            return;
        }

        alert("Form submitted successfully");
        form.reset();
    });
});