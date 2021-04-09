
window.onload = obtenerLibrosCarrito;
const bookDOM = document.querySelector('.product__center');

var libros = [];

function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
} 

function displayProducts(obj){
    let results = '';
    let img = '.';
    obj.forEach(({title,image,id,price, amount}) => {
    let subtotal = 0.0;
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
                        Subtotal: $${subtotal}
                        </div>
                      </div>
                    </div>
                  </div>`;
    });

    bookDOM.innerHTML = results;
  }

function obtenerLibrosCarrito () {
    libros = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
    console.log(libros);
    displayProducts(libros);
}

