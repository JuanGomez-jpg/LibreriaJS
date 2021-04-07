const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

function VolverInicio () {
    location.href ="http://localhost:63342/node-libreria/index.html?_ijt=2v8pfu4os2lf22j56m1i1liiur";
}

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    validar = true;
    // trim to remove the whitespaces

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

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


    if (validar) {
        authUser();
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


