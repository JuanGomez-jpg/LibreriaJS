
window.onload = obtenerLibrosCarrito;
const bookDOM = document.querySelector('.product__center');
const subTotalDOM = document.querySelector('.subtotal__books');


var libros = [];
let subtotal = 0.0;
let precio = 0.0;
let cantidad = 0;
let total = 0.0;
tipo = true;

function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
} 

function setPrecioEnviarN () {
  console.log("Normal");
  tipo = true;
  displaySubTotal();
}

function setPrecioEnviarR () {
  console.log("Rapido");
  tipo = false;
  displaySubTotal();
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

    let iva, totalCE;
    iva = 0.0;
    totalCE = 0.0;
    iva = total * .16;
    total += iva;
    total = parseFloat(total.toFixed(2));

    bookDOM.innerHTML = results;

    displaySubTotal();
  }

  function displaySubTotal(){
    let tipoE = 0.00;
    if (tipo) {
      totalCE = total + 20.00;
      tipoE = 20.00;
    } else {
      totalCE = total + 100.00
      tipoE = 100.00;
    }
    let results = '';
    results = `<div>
        <br>
        Subtotal: $${total}
        <br>
        Envío: $${tipoE}
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

