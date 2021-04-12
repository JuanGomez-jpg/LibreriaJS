
function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}

function addUser() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let address = document.getElementById("address").value;
    let zipCode = document.getElementById("zipCode").value;


    var newUser = {
        username: username,
        address: address,
        zipCode: zipCode,
        email: email,
        password: password
    };
    var dataBase = firebase.database();
    var ref = dataBase.ref("users");
    ref.push(newUser);

}


