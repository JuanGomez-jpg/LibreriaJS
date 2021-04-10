
function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}

function addUser() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    console.log(username);
    console.log(email);
    console.log(password);

    var newUser = {
        username: username,
        email: email,
        password: password
    };
    var dataBase = firebase.database();
    var ref = dataBase.ref("users");
    ref.push(newUser);

}


