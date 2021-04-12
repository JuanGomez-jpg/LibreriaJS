
function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}

function addUser() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let address = document.getElementById("address").value;
    let zipCode = document.getElementById("zipCode").value;

    var postKey = firebase.database().ref().child('users').push().key;
    var updates = {};


    var newUser = {
        eventId: postKey,
        username: username,
        address: address,
        zipCode: zipCode,
        email: email,
        password: password
    };
    updates[`/users/ ${postKey}`] = newUser;
    firebase.database().ref().update(updates);

    //var dataBase = firebase.database();
    //var ref = dataBase.ref("users");
   // ref.push(newUser);

}


