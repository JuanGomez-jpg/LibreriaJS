

window.onload = returnActiveUser;
const addressDOM = document.querySelector('.direccion');

function returnActiveUser (){
    let activeUser = JSON.parse(localStorage.getItem("activeUser"));
    activeUser = localStorage.getItem("activeUser")
    ? JSON.parse(localStorage.getItem("activeUser"))
    : [];
    console.log(activeUser.address);

   
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