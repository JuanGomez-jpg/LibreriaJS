const form = document.getElementById('form');
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

let file;
let fileName;

function chooseFile (e) {
    file = e.target.files[0];
    fileName = file.name;
    console.log(fileName);
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
        setErrorFor(isbn, 'ISBN cannot be blank');
        validar = false;
    } else {
        setSuccessFor(isbn);
    }

    if(descripcionValue === '') {
        setErrorFor(descripcion, 'Descripción cannot be blank');
        validar = false;
    } else {
        setSuccessFor(descripcion);
    }



    if (validar) {

        var storageRef = firebase.storage().ref('/bookImages/' + fileName);
        var uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', function(snapshot) {

        }, function(error) {

        }, function() {

            var postKey = firebase.database().ref('Books/').push().key;
            var downloadURL1;

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                var updates = {};

                var newBook = {
                    eventId: postKey,
                    tittle: tituloValue,
                    autor: autorValue,
                    anio: anioValue,
                    categoria: categoriaValue,
                    subgenero: subgeneroValue,
                    editorial: editorialValue,
                    cantidad: cantValue,
                    precio: precioValue,
                    isbn: isbnValue,
                    descripcion: descripcionValue,
                    url: downloadURL
                };
    
                var book = JSON.parse(JSON.stringify(newBook));
    
                updates[`/Books/ ${postKey}`] = book;
    
                firebase.database().ref().update(updates);
    

              });
              
              document.getElementById('form').reset();


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

