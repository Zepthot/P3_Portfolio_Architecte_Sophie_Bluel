let token = "";

const formLogin = document.querySelector(".form-test");
formLogin.addEventListener("submit", async function(event) {
    event.preventDefault();
    const errorMessage = document.getElementById("error");
    errorMessage.style.display = "none";
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
    } else { //all wrong
        errorMessage.style.display = "block";
    }
});

