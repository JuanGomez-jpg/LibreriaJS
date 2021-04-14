
window.onload = returnActiveUser;
const addressDOM = document.querySelector('.direccion');
var btn = document.querySelector('.btn');

var newCart = [];

function updateCart (allCart, keys, allBooks, postKey) {
    /* ALLGORITMO IMPORTANTE!! ALGORITMO QUE ACTUALIZA LA
    KEYVALUE DE LOS LIBROS DEL CARRITO CON EL NUEVO QUE SE LE
    ASIGNARÁ */
    valid = true;
    for(let j =0 ; j < allCart.length ; ++j) {

      var curretnCart = allCart[j];

      for (let i = 0 ; i <  keys.length ; ++i) {

        var currentObjBook = allBooks[keys[i]];
        //console.log(curretnCart);

        if (allCart[j].eventId == currentObjBook.eventId) {
          allCart[j].eventId = postKey;
          valid = false;
          break;

        }
      }
      if (!valid) 
        break;
    }

    //console.log("Informacion del libro actualizada");
    //console.log(allCart);
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
    //console.log(librosDelCarrito);

    /* Algoritmo para obtener todos los libros disponibles para despues */
    /* compararlos y hacer la actualización de reducir la cantidad de libros
    /* disponibles en la base de datos */
    let allBooks = JSON.parse(localStorage.getItem("products"));
    allBooks = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
    //console.log(allBooks);

    var keys = Object.keys(allBooks);
    var newBooksUpdatedVendidos = [];
    /* ALLGORITMO IMPORTANTE!! ALGORITMO QUE REDUCE LA CANTIDAD DE STOCK
    DEL LIBRO QUE VAYA A COMPRAR EL CLIENTE */
    for(let j =0 ; j < librosDelCarrito.length ; ++j) {

      var curretnCart = librosDelCarrito[j];

      for (let i = 0 ; i <  keys.length ; ++i) {

        var currentObjBook = allBooks[keys[i]];

        if (curretnCart.eventId == currentObjBook.eventId) {
         
          let newAmount = (currentObjBook.cantidad - curretnCart.cantidad);


        /* ELIMINAR VIEJO LIBRO */
          var query = firebase.database().ref("Books").orderByChild("eventId").equalTo(currentObjBook.eventId);
          query.on('child_added', (snapshot) => {
          snapshot.ref.remove();

          });

        /* ELIMINAR VIEJO LIBRO */
          var query = firebase.database().ref("masVendidos").orderByChild("eventId").equalTo(currentObjBook.eventId);
          query.on('child_added', (snapshot) => {
          snapshot.ref.remove();
          });
          

          /* AGREGAR LIBRO NUEVO CON INFORMACIÓN ACTUALIZADA */
          var postKey = firebase.database().ref().child('Books').push().key;
          var updates = {};

          var newBookUpdated = {
            eventId: postKey,
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

        updateCart(allCart, keys, allBooks, postKey);

        /* PROCEDE A ACTUALIZAR EL LIBRO EN LA BASE DE DATOS CON LA
        NUEVA CANTIDAD EN STOCK */
        updates[`/Books/ ${postKey}`] = newBookUpdated;
        firebase.database().ref().update(updates);


        firebase.database().ref('/masVendidos/').once('value').then(function (snapshot) {
          let masVendidos = snapshot.val();
          localStorage.setItem("masVendidos", JSON.stringify(masVendidos));
        });



        let masVendidos = JSON.parse(localStorage.getItem("masVendidos"));
        masVendidos = localStorage.getItem("masVendidos")
        ? JSON.parse(localStorage.getItem("masVendidos"))
        : [];

        let keysVendidos = Object.keys(masVendidos);
        console.log(masVendidos);

        let validarVendidoNuevo = true;

        for ( let k = 0 ; k < keysVendidos.length ; ++k ) {
          let currentObjVend = masVendidos[keysVendidos[k]];
          console.log(currentObjVend.id);
          if (currentObjVend.id == newBookUpdated.id) {
              newBookUpdated = {
                eventId: postKey,
                tittle: currentObjBook.tittle,
                autor: currentObjBook.autor,
                anio: currentObjBook.anio,
                categoria: currentObjBook.categoria,
                subgenero: currentObjBook.subgenero,
                editorial: currentObjBook.editorial,
                cantidad: curretnCart.cantidad + currentObjVend.cantidad,
                precio: currentObjBook.precio,
                isbn: currentObjBook.isbn,
                descripcion: currentObjBook.descripcion,
                url: currentObjBook.url,
                id: currentObjBook.id
              };
              updates[`/masVendidos/ ${postKey}`] = newBookUpdated;
              firebase.database().ref().update(updates);
              validarVendidoNuevo = false;
              break;
          }
        }

        /* EN CASO DE QUE NO HAYA HISTORIAL DE COMPRAS DE UN LIBRO...
        AGREGA ESE LIBRO A LA BASE DE DATOS PARA QUE COMIENCE A TENER HISTORIAL */
        if (validarVendidoNuevo) {
            newBookUpdated = {
              eventId: postKey,
              tittle: currentObjBook.tittle,
              autor: currentObjBook.autor,
              anio: currentObjBook.anio,
              categoria: currentObjBook.categoria,
              subgenero: currentObjBook.subgenero,
              editorial: currentObjBook.editorial,
              cantidad: curretnCart.cantidad,
              precio: currentObjBook.precio,
              isbn: currentObjBook.isbn,
              descripcion: currentObjBook.descripcion,
              url: currentObjBook.url,
              id: currentObjBook.id
            };
            updates[`/masVendidos/ ${postKey}`] = newBookUpdated;
            firebase.database().ref().update(updates);
        }


         break;

        }
      }
    }


    /* ALGORITMO PARA GENERAR LA COMPRA DEL CLIENTE */

    let active = JSON.parse(localStorage.getItem("activeUser"));
    active = localStorage.getItem("activeUser")
    ? JSON.parse(localStorage.getItem("activeUser"))
    : [];


    let noTarjeta = document.getElementById("noTarjeta").value;
    let nombreUsuario = active.username;
    let direccion = active.address;
    let idUser = active.eventId;
    var total = localStorage.getItem("subtotal");

    var postKey = firebase.database().ref().child('checkOut').push().key;
    var updates = {};
    
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

    updates[`/checkOut/ ${postKey}`] = checkOutP;
    firebase.database().ref().update(updates);


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




