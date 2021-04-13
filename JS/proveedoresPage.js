
const form = document.getElementById('form');
const rfcE = document.getElementById('rfcE');

form.addEventListener('submit', e => {
    e.preventDefault();

    agregarProveedor();
});

formE.addEventListener('submit', e => {
    e.preventDefault();

    eliminarProveedor();
});

function agregarProveedor () {

    const rfc = document.getElementById('rfc').value;
    const curp = document.getElementById('curp').value;
    const nombres = document.getElementById('nombres').value;
    const pApellido = document.getElementById('pApellido').value;
    const sApellido = document.getElementById('sApellido').value;
    const nComercial = document.getElementById('nComercial').value;
    const cPostal = document.getElementById('cPostal').value;
    const nVialidad = document.getElementById('nVialidad').value;
    const nLocalidad = document.getElementById('nLocalidad').value;
    const tVialidad = document.getElementById('tVialidad').value;
    const nExterior = document.getElementById('nExterior').value;
    const eCalle = document.getElementById('eCalle').value;
    const yCalle = document.getElementById('yCalle').value;
    const email = document.getElementById('email').value;
    const numero = document.getElementById('numero').value;


    var postKey = firebase.database().ref('Proveedor/').push().key;

    var updates = {};

    var newProveedor = {
        eventId: postKey,
        rfc: rfc,
        curp: curp,
        nombres: nombres,
        pApellido: pApellido,
        sApellido: sApellido,
        nComercial: nComercial,
        cPostal: cPostal,
        nVialidad: nVialidad,
        nLocalidad: nLocalidad,
        tVialidad: tVialidad,
        nExterior: nExterior,
        eCalle: eCalle,
        yCalle: yCalle,
        email: email,
        numero: numero
    };
    console.log(newProveedor);
    var proveedor = JSON.parse(JSON.stringify(newProveedor));

    updates[`/Proveedor/ ${postKey}`] = proveedor;

    firebase.database().ref().update(updates);

    document.getElementById('form').reset();

}

function eliminarProveedor () {
    let provDel;
    provDel = JSON.parse(localStorage.getItem("Proveedores"));
    //console.log(booksDel);
    var keys = Object.keys(provDel);
    //console.log(keys);
    let keyProveedor;
    let valid = false;

    for (let i = 0 ; i < keys.length ; ++i) {
        var currentObj = provDel[keys[i]];

        if (currentObj.rfc == rfcE.value) {

            keyProveedor = currentObj.eventId;
            valid = true;
            console.log(currentObj.rfc);
            break;

        }
    }

    if (valid) {

        var query = firebase.database().ref("Proveedor").orderByChild("eventId").equalTo(keyProveedor);
        query.on('child_added', (snapshot) => {
        snapshot.ref.remove();

        });

        //window.location.reload();

        }

        document.getElementById('formE').reset();

}

