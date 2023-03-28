let token = "";

const formLogin = document.querySelector(".form-test");
formLogin.addEventListener("submit", async function(event) {
    event.preventDefault();
    const errorMessage0 = document.getElementById("401");
    errorMessage0.style.display = "none";
    const errorMessage1 = document.getElementById("404");
    errorMessage1.style.display = "none";
    const login = {
        email: document.getElementById("email").value, 
        password: document.getElementById("password").value,
    };
    const payload = JSON.stringify(login);

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: payload,
    });
    
    if (response.status === 200) {
        const data = await response.json();
        token = data.token;
        window.localStorage.setItem("token", token);
        document.location.href = "index.html";
    } else if (response.status === 401) { //good email wrong pwd
        const errorMessage = document.getElementById("401");
        errorMessage.style.display = "block";
    } else { //all wrong
        const errorMessage = document.getElementById("404");
        errorMessage.style.display = "block";
    }
});

