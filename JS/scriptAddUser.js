
function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}


function addAccount () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch( e => alert(e.message));

    alert("Se ha creado tu cuenta" + email);
    VolverInicio();
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


