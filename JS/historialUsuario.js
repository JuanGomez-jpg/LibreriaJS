
window.onload = obtenerHistorial;
const historialDOM = document.querySelector('.historial__center');
const innerDOM = document.querySelector('.bottomB');


let historial = [];
let historialUsuario = [];
let user;
let results = '';
let resultsBook = '';

function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}

function displayHistorial(obj){
    results += `<div class="historial">
                        <div class="historial__footer">
                        <div class="historial__header">
                            <h1>${obj[0].nombreUsuario}</h1>
                            <br>
                        </div>
                            <h1>Libros</h1>
                            <br>
                            <h2 class="status">Estatus de envio: ${obj[1].status}</h2>
                            <div class="bottom">`;
        let curr = obj[2];
        //console.log(curr);
        let currB = curr["libros"];
        console.log(currB);
        for (let j = 0; j < currB.length ; ++j) {
            displayBook(currB[j]);
            //console.log(currB[j]);
        }
        results+=`          
                        </div>           
                    </div>
                </div>`;
    historialDOM.innerHTML = results;
  }


function displayBook (obj) {
    resultsBook = '';
    resultsBook += `</br>
            <div class="image__container">
                <img src=${obj.url} alt="${obj.id}" />
            </div>
            <div class="historialContainer">                                
                <br>
                ${obj.tittle}
                </br>
                ${obj.autor}
                </br>
                ${obj.editorial}
                </br>
                ${obj.anio}
                </br>
                <b>Cantidad: ${obj.cantidad}</b>
                </br>
            </div>`;
    results += resultsBook;
}

function obtenerHistorial () {
    firebase.database().ref('/checkOut/').once('value').then(function (snapshot) {
        let historial = snapshot.val();
        localStorage.setItem("historialCompras", JSON.stringify(historial));
    });

    historial = localStorage.getItem("historialCompras")
    ? JSON.parse(localStorage.getItem("historialCompras"))
    : [];
 
    user = localStorage.getItem("activeUser")
    ? JSON.parse(localStorage.getItem("activeUser"))
    : [];

    let keys = Object.keys(historial);

    //console.log(keys);

    for (let i = 0 ; i < keys.length; ++i) {
        let currentObj = historial[keys[i]];
        //let currentRootObj = historial[i];
        for (let j = 0; j < currentObj.length ; ++j) {
            let currentRoot = currentObj[j];
            if (user.eventId == currentRoot.idUser) {
                //console.log(currentObj);
               // historialUsuario.push(currentRootObj);
               displayHistorial(currentObj);
            }
        }
    }
}
