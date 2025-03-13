function generatePassword() {
    fetch("/generate")
        .then(response => response.json())
        .then(data => {
            document.getElementById("password").textContent = "Generated Password: " + data.password;
        })
        .catch(error => console.error("Error:", error));
}
