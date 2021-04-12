
window.onload = returnActiveUser;
const addressDOM = document.querySelector('.direccion');
var btn = document.querySelector('.btn');


function addAll(){
    let allCart = JSON.parse(localStorage.getItem("cart"));
    allCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

    /* Algoritmo para obtener la cantidad de libros a comprar por el cliente y su id de cada libro */
    let librosDelCarrito = [];
    let cantidadLibroCompra;
    let idLibroCompra;
    for (let i = 0 ; i < allCart.length ; ++i) {
      cantidadLibroCompra = allCart[i].cantidad;
      idLibroCompra = allCart[i].eventId;
      var newBookCart = {
        cantidad: cantidadLibroCompra,
        eventId: idLibroCompra
      };
      librosDelCarrito.push(newBookCart);
    }
    console.log(librosDelCarrito);

    /* Algoritmo para obtener todos los libros disponibles para despues */
    /* compararlos y hacer la actualización de reducir la cantidad de libros
    /* disponibles en la base de datos */
    let allBooks = JSON.parse(localStorage.getItem("products"));
    allBooks = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
    console.log(allBooks);

    var keys = Object.keys(allBooks);

    for(let i =0 ; i < keys.length; ++i) {
      var currentObj = allBooks[keys[i]];

      if (librosDelCarrito[i].eventId == currentObj.eventId) {
        console.log("Si jala");
        break;
      }

    }
/*
    var newBookUpdated = {
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
  };*/



    let active = JSON.parse(localStorage.getItem("activeUser"));
    active = localStorage.getItem("activeUser")
    ? JSON.parse(localStorage.getItem("activeUser"))
    : [];

    //console.log(allCart);

   /* let noTarjeta = document.getElementById("noTarjeta").value;
    let nombreUsuario = active.username;
    let direccion = active.address;
    let idUser = active.eventId;
    var total = localStorage.getItem("subtotal");



    var postKey = firebase.database().ref().child('checkOut').push().key;
    var updates = {};


    console.log(postKey);
    
    let checkOut = {
      idUser: idUser,
      noTarjeta: noTarjeta,
      nombreUsuario: nombreUsuario,
      address: direccion,
      idPedido: postKey,
      totalPagar: total
    };
  
    let pedido = {
      idPedido: postKey,
      status: "En proceso"
    };
  
    let librosP = {
      IdPedido: postKey,
      libros: allCart
    };
  
    let checkOutP = [checkOut,pedido,librosP];

    updates[`/checkOut/ ${idUser}`] = checkOutP;
    firebase.database().ref().update(updates);*/

}

function returnActiveUser (){
    let activeUser = JSON.parse(localStorage.getItem("activeUser"));
    activeUser = localStorage.getItem("activeUser")
    ? JSON.parse(localStorage.getItem("activeUser"))
    : [];

    let results = '';
    results = `<div>
        <div class="username">
            Nombre de usuario
        </div>
        <br> <b>${activeUser.username} </b>  
        <br>
        <br>
        <div class="address">
            Dirección
        </div>
        <br> <b> ${activeUser.address} </b>
        <br>
        <br>
        <div class="zip">
            Código postal
        </div>
        <br> <b> ${activeUser.zipCode} </b>
        </div>`;

    addressDOM.innerHTML = results;
  }


  btn.addEventListener('click', e => {
    e.preventDefault();

    addAll();


});






