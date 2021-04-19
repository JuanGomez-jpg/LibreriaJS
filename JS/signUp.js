const form = document.getElementById('form');
const username = document.getElementById('username');
const address = document.getElementById('address');
const zipCode = document.getElementById('zipCode');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    validar = true;
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const addressValue = address.value;
    const zipCodeValue = zipCode.value;

    if(usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        validar = false;
    } else {
        setSuccessFor(username);
    }

    if(addressValue === '') {
        setErrorFor(address, 'Address cannot be blank');
        validar = false;
    } else {
        setSuccessFor(address);
    }

    if(zipCodeValue === '') {
        setErrorFor(zipCode, 'Zip Code cannot be blank');
        validar = false;
    } else {
        setSuccessFor(zipCode);
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        validar = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        validar = false;
    } else {
        setSuccessFor(email);
    }

    if(passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        validar = false;
    } else {
        setSuccessFor(password);
    }

    if(password2Value === '') {
        setErrorFor(password2, 'Password2 cannot be blank');
        validar = false;
    } else if(passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
        validar = false;
    } else{
        setSuccessFor(password2);
    }

    if (validar) {
        addUser();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        const auth = firebase.auth();
    
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Se ha creado la cuenta");

            auth.currentUser.sendEmailVerification()
            .then(() => {
                console.log("Se ha enviado un correo de verificacion");
            })
            .catch(error => {
                console.error(error);
            })
            
        })
        .catch(error => {
            console.error(error);
        })

       // promise.catch( e => alert(e.message));


       // promise2.catch( e => alert(e.message));
    
        //alert("Se ha creado tu cuenta " + email);


        document.getElementById('form').reset();

    }

}



function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


