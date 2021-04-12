
window.onload = returnActiveUser;
const addressDOM = document.querySelector('.direccion');
var btn = document.querySelector('.btn');


function addAll(){
    let allCart = JSON.parse(localStorage.getItem("cart"));
    allCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

    let active = JSON.parse(localStorage.getItem("activeUser"));
    active = localStorage.getItem("activeUser")
    ? JSON.parse(localStorage.getItem("activeUser"))
    : [];

    console.log(allCart);

    let noTarjeta = document.getElementById("noTarjeta").value;
    let nombreUsuario = active.username;
    let direccion = active.address;
    var total = localStorage.getItem("subtotal").value;


   /* let total = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let address = document.getElementById("address").value;
    let zipCode = document.getElementById("zipCode").value;*/

    
    let checkOut = {
      noTarjeta: noTarjeta,
      nombreUsuario: nombreUsuario,
      address: direccion,
      IdCheck: 1,
      IdPedido: 1,
      total: total
    };
    console.log(checkOut);
  /*
    let pedido = {
      IdPedido: 1,
      status: "En proceso"
    };
  
    let librosP = {
      IdPedido: 1,
      libros: allCart
    };
  
    let checkOutP = [checkOut,pedido,librosP];
  
    console.log(checkOutP);*/



  /*  var newUser = {
        username: username,
        address: address,
        zipCode: zipCode,
        email: email,
        password: password
    };*/
   // var dataBase = firebase.database();
    //var ref = dataBase.ref("users");
  //  ref.push(newUser);

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






