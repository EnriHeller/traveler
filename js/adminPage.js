//chequear primero si el usuario es administrador con endpoint checkadmin
const token = localStorage.getItem("token");

/*funcion asincrona checkAdmin, hace un get al endpoint
checkAdmin
*/

const loginHeaders = new Headers();
loginHeaders.append("Content-Type", "application/json");
loginHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
    method: "GET",
    headers: loginHeaders
}

const checkAdmin = async () => {
    const response = await fetch("http://localhost:3000/checkAdmin", requestOptions);
    const result = await response.json();
    if (result.error || !result.welcome) {
        alert(result.error);
        window.location.replace("./login.html")
    } else if (result.welcome) {
        const welcomeText = document.querySelector(".welcome");
        welcomeText.textContent = result.welcome;
    }
}

//primero, si no existe el token, redireccionar al login
if (!token) {
    window.location.replace("./login.html");
} else if (token) {
    //funcion que se encarga de revisar si el usuario es administrador
    checkAdmin();
}

