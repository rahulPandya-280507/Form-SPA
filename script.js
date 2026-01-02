const form = document.getElementById("registrationForm");
const successMsg = document.getElementById("successMsg");
const submitBtn = document.getElementById("submitBtn");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyiTqFjIXdbybpSh85JGMT-f3LTA2DP4DUN6yPequ0VlK2qwPNNjo0ZC5WxLjmFQuJk/exec";

/* 🔒 Check on page load */
if (localStorage.getItem("hackathonRegistered") === "true") {
    lockForm();
}

/* Submit handler */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch(SCRIPT_URL, {
        method: "POST",
        body: formData
    })
    .then(() => {
        localStorage.setItem("hackathonRegistered", "true");
        lockForm();
    })
    .catch(() => {
        alert("Network error. Please try again.");
        submitBtn.textContent = "Submit Registration";
        submitBtn.disabled = false;
    });
});

/* 🔒 Lock function */
function lockForm() {
    successMsg.style.display = "block";
    submitBtn.textContent = "Registered ✓";
    submitBtn.disabled = true;

    form.querySelectorAll("input").forEach(input => {
        input.disabled = true;
    });
}
