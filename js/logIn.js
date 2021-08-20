
//Login

document.querySelector('#login-form').addEventListener('submit', async (ev)=>{
    ev.preventDefault();

    let email = document.getElementById("loginEmail").value;
	let clave = document.getElementById("loginPass").value;

    let Loginheaders = new Headers();
    Loginheaders.append('Content-Type',"application/json");

    let rawBody = JSON.stringify({
        "email": email,
        "clave": clave
    });
    

    var requestOptions = {
        method: 'POST',
        headers: Loginheaders,
        body: rawBody,
        redirect: 'follow'
        };

    const responseLogin = await fetch('http://localhost:3000/logIn', requestOptions);

    const responseObject = await responseLogin.json();

    if(responseLogin.status != 200){
        alert(responseObject.error);
    }else{
        localStorage.setItem('token',responseObject.token);
        location.replace("./destination.html");
    }
})

