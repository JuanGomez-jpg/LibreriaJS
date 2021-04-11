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
const isbnE = document.getElementById('isbnE');
const imagen = document.getElementById('imagen');


function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}


let file;
let fileName;
let id;
let url;

function chooseFile (e) {
    file = e.target.files[0];
    fileName = file.name;
    //console.log(fileName);
    id = 0;
    var allBooks;
    allBooks = JSON.parse(localStorage.getItem("products"));
    console.log(allBooks);
    var keys = Object.keys(allBooks);

    for (let i = 0 ; i < keys.length ; ++i) {
        var currentObj = allBooks[keys[i]];
        id = currentObj.id;
    }
    id = id + 1;

}

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

formE.addEventListener('submit', e => {
    e.preventDefault();

    EliminarLibro();
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
                    url: downloadURL,
                    id: id
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



function EliminarLibro () {
    let booksDel;
    booksDel = JSON.parse(localStorage.getItem("products"));
    //console.log(booksDel);
    var keys = Object.keys(booksDel);
    //console.log(keys);
    let keyBook;
    let valid = false;

    for (let i = 0 ; i < keys.length ; ++i) {
        var currentObj = booksDel[keys[i]];
        if (currentObj.isbn == isbnE.value) {
            keyBook = currentObj.eventId;
            url = currentObj.url;
            valid = true;
            //console.log(keyBook);
            break;
        }
    }

    if (valid) {

        var query = firebase.database().ref("Books").orderByChild("eventId").equalTo(keyBook);
        query.on('child_added', (snapshot) => {
        snapshot.ref.remove();

        });

        var deleteB = firebase.storage().refFromURL(url);
        deleteB.delete();

        //window.location.reload();

        }

        document.getElementById('formE').reset();
}
