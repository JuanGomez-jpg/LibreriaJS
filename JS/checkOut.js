
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
    img = '.';
    img += image;
      results += `<div class="product">
                    <div class="image__container">
                      <img src=${img} alt="${id}" />
                    </div>
                    <div class="product__footer">
                      <h1>${title}</h1>
                      <div class="rating">
                        <span>
                          <svg>
                            <use xlink:href="../img/sprite.svg#icon-star-full"></use>
                          </svg>
                        </span>
                        <span>
                          <svg>
                            <use xlink:href="../img/sprite.svg#icon-star-full"></use>
                          </svg>
                        </span>
                        <span>
                          <svg>
                            <use xlink:href="../img/sprite.svg#icon-star-full"></use>
                          </svg>
                        </span>
                        <span>
                          <svg>
                            <use xlink:href="../img/sprite.svg#icon-star-full"></use>
                          </svg>
                        </span>
                        <span>
                          <svg>
                            <use xlink:href="../img/sprite.svg#icon-star-empty"></use>
                          </svg>
                        </span>
                      </div>
                      <div class="bottom">
                        <div class="price">$${price}</div>
                        <div class="amount">Cantidad: ${amount}</div>
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

