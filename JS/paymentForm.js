
window.onload = returnActiveUser;
const addressDOM = document.querySelector('.direccion');
var btn = document.querySelector('.btn');


function addBook (newBookUpdated, id) {

  var updates = {};

  updates[`/Books/ ${id}`] = newBookUpdated;
  firebase.database().ref().update(updates);

}


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

    /* ALLGORITMO IMPORTANTE!! ALGORITMO QUE REDUCE LA CANTIDAD DE STOCK
    DEL LIBRO QUE VAYA A COMPRAR EL CLIENTE */
    for(let j =0 ; j < librosDelCarrito.length ; ++j) {

      var curretnCart = librosDelCarrito[j];

      for (let i = 0 ; i <  keys.length ; ++i) {

        var currentObjBook = allBooks[keys[i]];
        //console.log(curretnCart);

       if (curretnCart.eventId == currentObjBook.eventId) {

         console.log("Si jala");
         
         let newAmount = (currentObjBook.cantidad - curretnCart.cantidad);
         let id = currentObjBook.eventId;

        /*  var newBookUpdated = {
            eventId: currentObjBook.eventId,
            tittle: currentObjBook.tittle,
            autor: currentObjBook.autor,
            anio: currentObjBook.anio,
            categoria: currentObjBook.categoria,
            subgenero: currentObjBook.subgenero,
            editorial: currentObjBook.editorial,
            cantidad: newAmount,
            precio: currentObjBook.precio,
            isbn: currentObjBook.isbn,
            descripcion: currentObjBook.descripcion,
            url: currentObjBook.url,
            id: currentObjBook.id
        };

        var updates = {};
        updates['/Books/' + currentObjBook.eventId] = newBookUpdated;
      
        firebase.database().ref().update(updates);*/

        var query = firebase.database().ref("Books").orderByChild("eventId").equalTo(currentObjBook.eventId);
        query.on('child_added', (snapshot) => {
        snapshot.ref.remove();

        });
        

        var newBookUpdated = {
          eventId: currentObjBook.eventId,
          tittle: currentObjBook.tittle,
          autor: currentObjBook.autor,
          anio: currentObjBook.anio,
          categoria: currentObjBook.categoria,
          subgenero: currentObjBook.subgenero,
          editorial: currentObjBook.editorial,
          cantidad: newAmount,
          precio: currentObjBook.precio,
          isbn: currentObjBook.isbn,
          descripcion: currentObjBook.descripcion,
          url: currentObjBook.url,
          id: currentObjBook.id
      };

      var postKey = firebase.database().ref().child('Books').push().key;
      var updates = {};
  
    
  
      updates[`/Books/ ${id}`] = newBookUpdated;
      firebase.database().ref().update(updates);

        //addBook(newBookUpdated, currentObjBook.eventId);


         break;

        }
      }
    }






    let active = JSON.parse(localStorage.getItem("activeUser"));
    active = localStorage.getItem("activeUser")
    ? JSON.parse(localStorage.getItem("activeUser"))
    : [];


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






