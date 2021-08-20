const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const nacimiento = document.getElementById("nacimiento");
const email = document.getElementById("email");
const user = document.getElementById("user");
const pais = document.getElementById("pais");
const pass = document.getElementById("pass");

const signButton = document.getElementById("signButton");


signButton.addEventListener("click",()=>{
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
	"userId": user.value,
	"clave": pass.value,
	"email": email.value,
	"nombre": firstname.value,
	"apellido": lastname.value,
	"fechaNac": nacimiento.value,
	"paisResidencia": pais.value,
	});

	var requestOptions = {
	method: 'POST',
	headers: myHeaders,
	body: raw,
	redirect: 'follow'
	};

	fetch("http://localhost:3000/signUp", requestOptions)
	.then(response => response.json())
	.then(result => window.location.replace("./login.html"))
	.catch(error => console.log('error', error));
});