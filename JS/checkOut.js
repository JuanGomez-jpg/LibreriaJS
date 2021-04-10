
window.onload = obtenerLibrosCarrito;
const bookDOM = document.querySelector('.product__center');
const subTotalDOM = document.querySelector('.subtotal__books');


var libros = [];
let tipoEnvio = '';
let subtotal = 0.0;
let precio = 0.0;
let cantidad = 0;
let total = 0.0;
let totalFinal = 0.0;
let iva = 0.0;
let costoEnvioR = 0.0;
tipo = true;

function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
} 

function setPrecioEnviarN () {
  console.log("Normal");
  tipo = true;
  document.getElementById("form__r").style.visibility = "hidden";
  displaySubTotal();
}


function realizarOperacionesR () {
  if (tipoEnvio === "UPS") {
    costoEnvioR = 175;
  } else if (tipoEnvio === "DHL") {
    costoEnvioR = 200;
  } else if (tipoEnvio === "Estafeta") {
    costoEnvioR = 245;
  } else {
    costoEnvioR = 220;
  }

  totalCE = total + costoEnvioR + iva;

  totalCE = parseFloat(totalCE.toFixed(2));
}


function setPrecioEnviarR () {
  tipo = false;
  tipoEnvio = "UPS";
  document.getElementById("form__r").style.visibility = "visible";
  document.getElementById('form__r').reset();
  realizarOperacionesR ();
  displaySubTotalR();
}

function setPrecioUPS() {
  tipoEnvio = "UPS";
  realizarOperacionesR ();
  displaySubTotalR();
}

function setPrecioDHL() {
  tipoEnvio = "DHL";
  realizarOperacionesR ();
  displaySubTotalR();
}

function setPrecioEst() {
  tipoEnvio = "Estafeta";
  realizarOperacionesR ();
  displaySubTotalR();
}

function setPrecioFedex() {
  tipoEnvio = "Fedex";
  realizarOperacionesR ();
  displaySubTotalR();
}


function displayProducts(obj){
    let results = '';
    let img = '.';
    total = 0.0;
    obj.forEach(({title,image,id,price, amount}) => {
    subtotal = 0.0;
    precio = parseFloat(price, 2);
    cantidad = parseInt(amount);
    subtotal = parseFloat(price, 2) * parseInt(amount);  
    img = '.';
    img += image;
      results += `<div class="product">
                    <div class="image__container">
                      <img src=${img} alt="${id}" />
                    </div>
                    <div class="product__footer">
                      <h1>${title}</h1>
                      <div class="bottom">
                        <div class="price">$${price}
                        </br>
                        Cantidad: ${amount}
                        </br>
                        </br>
                        Total: $${subtotal}
                        </div>
                      </div>
                    </div>
                  </div>`;
      total += parseFloat(price, 2) * parseInt(amount);  
    });

    let totalCE;
    iva = 0.0;
    totalCE = 0.0;
    iva = total * .16;
    totalFinal += iva;
    total = parseFloat(total.toFixed(2));
    totalFinal = parseFloat(totalFinal.toFixed(2));
    iva = parseFloat(iva.toFixed(2));

    bookDOM.innerHTML = results;

    displaySubTotal();
  }

  function displaySubTotal(){
    let tipoE = 0.00;
    if (tipo) {
      totalCE = total + costoEnvioR + iva;
      tipoE = 60.00;
    } else {
      totalCE = total + costoEnvioR + iva
      tipoE = 100.00;
    }

    totalCE = parseFloat(totalCE.toFixed(2));
    let results = '';
    results = `<div>
          <br>
          Subtotal: $${total}
          <br>
          IVA: $${iva}
          <br>
          Envío: $${tipoE}
          <br>
          Total: $${totalCE}
        </div>`;

    subTotalDOM.innerHTML = results;
  }


  function displaySubTotalR(){
    let results = '';
    results = `<div>
          <br>
          Subtotal: $${total}
          <br>
          IVA: $${iva}
          <br>
          Envío: $${costoEnvioR}
          <br>
          Total: $${totalCE}
        </div>`;

    subTotalDOM.innerHTML = results;
  }


function obtenerLibrosCarrito () {
    libros = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
    console.log(libros);
    displayProducts(libros);
}

