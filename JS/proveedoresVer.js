
window.onload = obtenerProveedores;
const proveedoresDOM = document.querySelector('.proveedores__center');


let proveedores = [];

function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
} 


function displayProveedores(obj){
    let results = '';
    var keys = Object.keys(obj);

    for(let i =0 ; i < keys.length; ++i) {
      var currentObj = obj[keys[i]];

        results += `<div class="proveedor">
                        <div class="proveedor__footer">
                        <div class="proveedor__header">
                            <h1>${currentObj.rfc}</h1>
                            <br>
                        </div>
                            <h1>${currentObj.nComercial}</h1>
                            <div class="bottom">
                                <br>
                                ${currentObj.curp}
                                </br>
                                ${currentObj.nombres}
                                </br>
                                ${currentObj.pApellido}
                                </br>
                                ${currentObj.sApellido}
                                </br>
                                ${currentObj.email}
                                </br>
                                ${currentObj.cPostal}
                                </br>
                                ${currentObj.nVialidad}
                                </br>
                                ${currentObj.tVialidad}
                                </br>
                                ${currentObj.nLocalidad}
                                </br>
                                ${currentObj.nExterior}
                                </br>
                                ${currentObj.eCalle}
                                </br>
                                ${currentObj.yCalle}
                                </br>
                                ${currentObj.numero}
                            </div>
                        </div>
                    </div>`;
    }
    proveedoresDOM.innerHTML = results;
  }


function obtenerProveedores () {
    firebase.database().ref('/Proveedor/').once('value').then(function (snapshot) {
        let proveedores = snapshot.val();
        localStorage.setItem("Proveedores", JSON.stringify(proveedores));
    });

    proveedores = localStorage.getItem("Proveedores")
    ? JSON.parse(localStorage.getItem("Proveedores"))
    : [];
    console.log(proveedores);
    displayProveedores(proveedores);
}


