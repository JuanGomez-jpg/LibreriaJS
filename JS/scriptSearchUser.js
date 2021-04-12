
const LogOut = document.querySelector(".login");

function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}

function authUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            alert("Has iniciado sesión como "+ email);

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    alert("Active user " + email);
                } else {
                    alert("No active user");
                }
            })

            VolverInicio();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

function loadData () {

}


