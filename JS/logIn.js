const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

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

        firebase.database().ref('/users/').once('value').then(function (snapshot) {
            var userObj = snapshot.val();
            console.log(userObj);
        
            var keys = Object.keys(userObj);

            for(let i =0 ; i < keys.length; ++i) {

                var currentObj = userObj[keys[i]];

                if (currentObj.email == emailValue) {
                    let user = {
                        username: currentObj.username,
                        address: currentObj.address,
                        zipCode: currentObj.zipCode,
                        email: currentObj.zipCode,
                        eventId: currentObj.eventId
                    };
                    localStorage.setItem("activeUser", JSON.stringify(user));
                    
                }
        
            }
    
        });
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


