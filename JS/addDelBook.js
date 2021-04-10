const form = document.getElementById('form');

const username = document.getElementById('username');

const titulo = document.getElementById('titulo');
const autor = document.getElementById('autor');
const anio = document.getElementById('año');
const categoria = document.getElementById('categoria');
const subgenero = document.getElementById('subgenero');
const editorial = document.getElementById('editorial');
const cant = document.getElementById('cDisponible');
const precio = document.getElementById('precio');
const isbn = document.getElementById('isbn');
const descripcion = document.getElementById('descripcion');
const imagen = document.getElementById('imagen');


function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}

let file = {};

function chooseFile (e) {
    file = e.target.files[0];
}

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    validar = true;
    // trim to remove the whitespaces
    const tituloValue = titulo.value;
    const autorValue = autor.value;

    const anioValue = anio.value;
    const categoriaValue = categoria.value;

    const subgeneroValue = subgenero.value;
    const editorialValue = editorial.value;

    const cantValue = cant.value;
    const precioValue = precio.value;

    const isbnValue = isbn.value;
    const descripcionValue = descripcion.value;
    
    const imagenValue = imagen.value;
    

  

    if(tituloValue === '') {
        setErrorFor(titulo, 'Titulo cannot be blank');
        validar = false;
    } else {
        setSuccessFor(titulo);
    }


    if(autorValue === '') {
        setErrorFor(autor, 'Autor cannot be blank');
        validar = false;
    } else {
        setSuccessFor(autor);
    }
    
    if(anioValue === '') {
        setErrorFor(anio, 'Año cannot be blank');
        validar = false;
    } else {
        setSuccessFor(anio);
    }
    
    if(categoriaValue === '') {
        setErrorFor(categoria, 'Categoria cannot be blank');
        validar = false;
    } else {
        setSuccessFor(categoria);
    }
    
    if(subgeneroValue === '') {
        setErrorFor(subgenero, 'Subgenero cannot be blank');
        validar = false;
    } else {
        setSuccessFor(subgenero);
    }
    
    if(editorialValue === '') {
        setErrorFor(editorial, 'Editorial cannot be blank');
        validar = false;
    } else {
        setSuccessFor(editorial);
    }
    
    if(cantValue === '') {
        setErrorFor(cant, 'Cantidad cannot be blank');
        validar = false;
    } else {
        setSuccessFor(cant);
    }
    
    if(precioValue === '') {
        setErrorFor(precio, 'Precio cannot be blank');
        validar = false;
    } else {
        setSuccessFor(precio);
    }
    
    if(isbnValue === '') {
        setErrorFor(username, 'ISBN cannot be blank');
        validar = false;
    } else {
        setSuccessFor(username);
    }

    if(descripcionValue === '') {
        setErrorFor(descripcion, 'Descripción cannot be blank');
        validar = false;
    } else {
        setSuccessFor(descripcion);
    }



    if (validar) {

      /*  let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        const auth = firebase.auth();
    
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch( e => alert(e.message));
    
        alert("Se ha creado tu cuenta " + email);

        document.getElementById('form').reset();*/

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

