const openCart = document.querySelector('.cart__icon');
const openRecommended = document.querySelector('.recommended__icon');
const openVendidos = document.querySelector('.vendidos__icon');

const closeCart = document.querySelector('.close__cart');
const closeRecommended = document.querySelector('.close__recommended');
const closeVendidos = document.querySelector('.close__vendidos');

const productDOM = document.querySelector('.product__center');
const bookDOM = document.querySelector('.recommended__center');
//const vendidosDOM = document.querySelector('.vendidos__center');

const cartDOM = document.querySelector('.cart');
const recommendedDOM = document.querySelector('.recommended__cart');
const vendidosDOM = document.querySelector('.vendidos__cart');

const cartContent = document.querySelector(".cart__centent");
const recommendedContent = document.querySelector('.recommended__centent');
const vendidosContent = document.querySelector('.vendidos__centent');

const itemTotals = document.querySelector('.item__total');
const cartTotal = document.querySelector('.cart__total');
const vendidosTotal = document.querySelector('.vendidos__total');

const overlay = document.querySelector(".cart__overlay");
const overlayRecommended = document.querySelector('.recommended__overlay');
const overlayVendidos = document.querySelector('.vendidos__overlay');

const clearCartBtn = document.querySelector(".clear__cart");

const btnSignUp = document.querySelector(".signup");
const btnLogOut = document.querySelector(".logout");
const btnComprar = document.querySelector(".proceed__ToCheck");

window.onload =   showLogin();

let activeUser = '';

let cart = [];
let reco = [];
let buttonDOM = [];
let buttonDOM2 = [];
var libros = [];
var booksObj;
let recomendados = [];

//UI
class UI {
  displayProducts(obj){
    let results = '';
    //console.log(obj);

    var keys = Object.keys(obj);
    //console.log(keys);

    for(let i =0 ; i < keys.length; ++i) {

      var currentObj = obj[keys[i]];

      results += `<div class="product">
                    <div class="image__container">
                      <img src=${currentObj.url} alt="" />
                    </div>
                    <div class="product__footer">
                      <h1>${currentObj.tittle}</h1>
                      <div class="rating">
                        <span>
                          <svg>
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                          </svg>
                        </span>
                        <span>
                          <svg>
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                          </svg>
                        </span>
                        <span>
                          <svg>
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                          </svg>
                        </span>
                        <span>
                          <svg>
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                          </svg>
                        </span>
                        <span>
                          <svg>
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                          </svg>
                        </span>
                      </div>
                      <div class="bottom">
                        <div class="btn__group">
                           <button class="btn addToCart" data-id= ${currentObj.id} >Añadir al carrito</button>
                           <button class="btn view" data-id=${currentObj.id} >Ver</button>
                        </div>
                        <div class="price">$${currentObj.precio}</div>
                      </div>
                    </div>
                  </div>`;
    }

    productDOM.innerHTML = results;
  }

  displayRecommended(obje){
    let diva = document.createElement("div");
    diva.classList.add('recommended__item');

    var keys = Object.keys(obje);

    for(let i =0 ; i < keys.length; ++i) {
      var currentObj = obje[keys[i]];
      diva.innerHTML += `<img src=${currentObj.url}>
            <div>
              <h3>${currentObj.tittle}</h3>
              <h3 class="price">$${currentObj.precio}</h3>
            </div>
          </div>`;

    }
    recommendedContent.appendChild(diva);
    //vendidosContent.appendChild(diva);
  }

  displayMasVendidos(obje){
    let diva = document.createElement("div");
    diva.classList.add('vendidos__item');

    var keys = Object.keys(obje);

    for(let i =0 ; i < keys.length; ++i) {
      var currentObj = obje[keys[i]];
      if (currentObj.cantidad > 5) {

        diva.innerHTML += `<img src=${currentObj.url}>
              <div>
                <h3>${currentObj.tittle}</h3>
                <h3 class="price">$${currentObj.precio}</h3>
              </div>
            </div>`;

      }
  }
    vendidosContent.appendChild(diva);
    //vendidosContent.appendChild(diva);
  }

  getButtons() {
    const buttons = [...document.querySelectorAll(".addToCart")];
    const viewButtons = [...document.querySelectorAll(".view")];

    buttonDOM = buttons;
    buttonDOM2 = viewButtons;

    buttons.forEach(button => {
      const id = button.dataset.id;
      const inCart = cart.find(item => item.id === parseFloat(id, 10));
      if(inCart) {
        button.innerText = 'En carrito';
        button.disable = true;
      }

      button.addEventListener('click', e=> {
        e.preventDefault();
        e.target.innerText = 'En carrito';
        e.target.disable = true;

        let validarCantidadMaxima = true;

        //Get product from products
        const cartItem = {...Storage.getProduct(id),cantidad: 1};

        let allBooks = JSON.parse(localStorage.getItem("products"));
        allBooks = localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products"))
        : [];
    
        var keys = Object.keys(allBooks);

        for(let j = 0 ; j < keys.length ; ++j) {

            var currentObjBook = allBooks[keys[j]];

            if (cartItem.eventId == currentObjBook.eventId) {
              console.log(currentObjBook.cantidad - cartItem.cantidad);
              let newAmount = (currentObjBook.cantidad - cartItem.cantidad);
              
              if (newAmount <= -1) {
                validarCantidadMaxima = false;
              }
             break;
    
            }
        }

        if (!validarCantidadMaxima) {

          alert("No hay stock de este libro");
          e.target.innerText = 'Agregar al carrito';
          e.target.disable = false;

        } else {

          //Add the product to cart
          cart = [...cart, cartItem];
          //Store the product in local storage
          Storage.saveCart(cart);
          //setItemValues
          this.setItemValues(cart);
          //display the items in the cart
          this.addToCart(cartItem);

          //Obtain all recommended books
          this.recommendBook(cartItem);
          //display the recommended books on list
          this.displayRecommended(recomendados);

        }


        
      });

    });

    viewButtons.forEach(buttonV => {
      const id = buttonV.dataset.id;

      buttonV.addEventListener('click', e=> {
        e.preventDefault();
        //Get product from products
        const cartItem = {...Storage.getProduct(id)};
        //display the items in the cart
        this.BookDetails(cartItem);

      });

    });



  }

  setItemValues(cart) {
    let tempTotal = 0;
    let itemTotal = 0;

    cart.map(item => {
      tempTotal += item.precio * item.cantidad;
      itemTotal += item.cantidad;
    });

    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    itemTotals.innerText = itemTotal;

  }

  addToCart (obj) {
    let div = document.createElement("div");
    div.classList.add('cart__item');

      div.innerHTML = `<img src=${obj.url}>
      <div>
        <h3>${obj.tittle}</h3>
        <h3 class="price">$${obj.precio}</h3>
      </div>
      <div>
        <span class="increase" data-id=${obj.id}>
          <svg>
            <use xlink:href="./img/sprite.svg#icon-angle-up"></use>
          </svg>
        </span>
        <p class="item__amount">1</p>
        <span class="decrease" data-id=${obj.id}>
          <svg>
            <use xlink:href="./img/sprite.svg#icon-angle-down"></use>
          </svg>
        </span>
      </div>
        <span class="remove__item" data-id=${obj.id}>
          <svg>
            <use xlink:href="./img/sprite.svg#icon-trash"></use>
          </svg>
        </span>
    </div>`;

  cartContent.appendChild(div);

    
  }

  BookDetails (obj) {
    localStorage.setItem("idLibro",obj.id);
    localStorage.setItem("image",obj.url);
    localStorage.setItem("title",obj.tittle);
    localStorage.setItem("price",obj.precio);
    localStorage.setItem("author",obj.autor);
    localStorage.setItem("year",obj.anio);
    localStorage.setItem("description",obj.descripcion);
    localStorage.setItem("categorie",obj.categoria);
    localStorage.setItem("subgender",obj.subgenero);
    localStorage.setItem("amount",obj.cantidad);

    location.href ="http://localhost/node-libreria/pages/productDetails.html";
  }

  recommendBook (obj) {
    //Tomo el libro por el cual se recomendarán más libros
    const librosR = libros;
    localStorage.setItem("id",obj.id);
    localStorage.setItem("imag",obj.url);
    localStorage.setItem("tit",obj.tittle);
    localStorage.setItem("pri",obj.precio);
    localStorage.setItem("auth",obj.autor);
    localStorage.setItem("ye",obj.anio);
    localStorage.setItem("des",obj.description);
    localStorage.setItem("cat",obj.categoria);
    localStorage.setItem("gender",obj.subgenero);
    localStorage.setItem("am",obj.cantidad);

    //Comparo cada uno de los libros por el subgénero literario con el añadido al carrito
    //para así guardar en un arreglo todas las coincidencias con el que está
    //en el carrito

    recomendados = null;
    recomendados = [];

    var keys = Object.keys(booksObj);
    //console.log(keys);

    for(let i =0 ; i < keys.length; ++i) {
      var currentObj = booksObj[keys[i]];
      if (currentObj.subgenero == obj.subgenero) {
        recomendados.push(currentObj);
      }
    }

  }

  

  show() {
    cartDOM.classList.add("show");
    overlay.classList.add("show");
  }

  showR() {
    recommendedDOM.classList.add("show");
    overlayRecommended.classList.add("show");
  }

  showV() {
    vendidosDOM.classList.add("show");
    overlayVendidos.classList.add("show");
  }

  hide() {
    cartDOM.classList.remove("show");
    overlay.classList.remove("show");

  }

  hideR () {
    recommendedDOM.classList.remove("show");
    overlayRecommended.classList.remove("show");
  }

  hideV () {
    vendidosDOM.classList.remove("show");
    overlayVendidos.classList.remove("show");
  }

  setAPP() {
    cart = Storage.getCart();
    this.setItemValues(cart);
    this.populate(cart);

    openCart.addEventListener("click", this.show);
    closeCart.addEventListener("click", this.hide);
  }

  setAPPR() {
   // reco = Storage.getCart();
   // this.setItemValues(reco);
   // this.populate(reco);

    openRecommended.addEventListener("click", this.showR);
    closeRecommended.addEventListener("click", this.hideR);
  }

  setAPPV() {
     openVendidos.addEventListener("click", this.showV);
     closeVendidos.addEventListener("click", this.hideV);
   }

  populate(cart) {
    cart.forEach(item => this.addToCart(item));
  }

  populateR(reco) {
    reco.forEach(item => this.addToRecommended(item));
  }

  populateV(ven) {
    ven.forEach(item => this.addToVendidos(item));
  }

  cartLogic() {
    // Clear Cart
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
      this.hide();
    });

    // Cart Functionality
    cartContent.addEventListener("click", e => {
      const target = e.target.closest("span");
      const targetElement = target.classList.contains("remove__item");
      if (!target) return;

      if (targetElement) {

        const id = parseInt(target.dataset.id);
        this.removeItem(id);
        cartContent.removeChild(target.parentElement);

      } else if (target.classList.contains("increase") ) {

        let validarCantidadMaxima = true;

        const id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);

        /* ALGORITMO PARA VALIDAR QUE EL CLIENTE NO PUEDA COMPRAR MÁS LIBROS
        DE LOS QUE HAY DISPONIBLES */
        let allCart = JSON.parse(localStorage.getItem("cart"));
        allCart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

        let allBooks = JSON.parse(localStorage.getItem("products"));
        allBooks = localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products"))
        : [];
    
        var keys = Object.keys(allBooks);
    
        for(let j = 0 ; j < allCart.length ; ++j) {

          for (let i = 0 ; i <  keys.length ; ++i) {
    
            var currentObjBook = allBooks[keys[i]];
    
            if (tempItem.eventId == currentObjBook.eventId) {
              console.log(currentObjBook.cantidad - tempItem.cantidad);
              let newAmount = (currentObjBook.cantidad - tempItem.cantidad);
              
              if (newAmount == 0) {
                validarCantidadMaxima = false;
              }
             break;
    
            }
          }
        }


        if (!validarCantidadMaxima) {
          alert("No hay más libros en stock");
        } else {
          tempItem.cantidad++;
          Storage.saveCart(cart);
          this.setItemValues(cart);
          target.nextElementSibling.innerText = tempItem.cantidad;
        }


      } else if (target.classList.contains("decrease")) {
        const id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        tempItem.cantidad--;

        if (tempItem.cantidad > 0) {

          Storage.saveCart(cart);
          this.setItemValues(cart);
          target.previousElementSibling.innerText = tempItem.cantidad;

        } else {

          this.removeItem(id);
          cartContent.removeChild(target.parentElement.parentElement);

        }
      }
    });
  }

  clearCart() {
    const cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }

  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.setItemValues(cart);
    Storage.saveCart(cart);

    let button = this.singleButton(id);
    button.disabled = false;
    button.innerText = "Añadir al carrito";
  }

  singleButton(id) {
    return buttonDOM.find(button => parseInt(button.dataset.id) === id);
  }

}

//Storage
class Storage{
  static saveProduct(obj) {
    localStorage.setItem("products", JSON.stringify(obj));
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /*- */

  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));

    var keys = Object.keys(products);
    var currentObj;
    for(let i = 0 ; i < keys.length; ++i) {
      currentObj = products[keys[i]];
      if (currentObj.id == id) 
        break;

  }

  return currentObj;

}

  static getCart() {
    return localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
  }

}

//Product
class Products{

  async getProducts(){
    /*try{
      const results = await fetch('./JSON/books.json');

      const data = await results.json();
      console.log(data);

      const products = data.items;
      console.log(products);

      return products;
    }catch (err){
      console.log(err);
    }*/
   /* var newBook = {
      eventId: postKey,
      tittle: tituloValue,
      autor: autorValue,
      anio: anioValue,
      categoria: categoriaValue,
      subgenero: subgeneroValue,
      editorial: editorialValue,
      cantidad: cantValue,
      precio: precioValue,
      isbn: isbnValue,
      descripcion: descripcionValue,
      url: downloadURL
  };*/
   /* firebase.database().ref('Books').once('value', function(snapshot){
      snapshot.forEach(
        function(ChildSnapshot) {
          let eventId = ChildSnapshot.val().eventId;
          let tittle  = ChildSnapshot.val().tittle;
          let autor  = ChildSnapshot.val().autor;
          let anio = ChildSnapshot.val().anio;
          let categoria = ChildSnapshot.val().categoria;
          let subgenero = ChildSnapshot.val().subgenero;
          let editorial = ChildSnapshot.val().editorial;
          let cantidad = ChildSnapshot.val().cantidad;
          let precio = ChildSnapshot.val().precio;
          let isbn = ChildSnapshot.val().isbn;
          let descripcion = ChildSnapshot.val().descripcion;
          let url = ChildSnapshot.val().url;

          var newBook = {
              eventId: eventId,
              tittle: tittle,
              autor: autor,
              anio: anio,
              categoria: categoria,
              subgenero: subgenero,
              editorial: editorial,
              cantidad: cantidad,
              precio: precio,
              isbn: isbn,
              descripcion: descripcion,
              url: url

          };

          var Book = JSON.parse(JSON.stringify(newBook));
          


          console.log(Book);

          return Book;


        }
      )
    });*/

  /*  var book = [];
    firebase.database().ref('Books').once('value', function(snapshot){
      snapshot.forEach(doc => {
        const data = doc.val();
        var newBook = {
          eventId: data.eventId,
          tittle: data.tittle,
          autor: data.autor,
          anio: data.anio,
          categoria: data.categoria,
          subgenero: data.subgenero,
          editorial: data.editorial,
          cantidad: data.cant,
          precio: data.precio,
          isbn: data.isbn,
          descripcion: data.descripcion,
          url: data.downloadURL
      };
      book.push(newBook);
        
    
      });
    });
   // const products = data;
   // console.log(products);
    console.log(book);

    return book;*/




    firebase.database().ref('/Books/').once('value').then(function (snapshot) {
      BookObj = snapshot.val();
      

      return booksObj;

    });

  }

}

class Books {

}

function getDataFromDB (data) {
  bookData = data;
  //.log(bookData);
}

function goData(data) {
  const results = data.val();
  //console.log(results);

  let products = JSON.parse(JSON.stringify(results));
  //console.log(products);

  return products;

}

function errData(err) {
  console.log("Error");
  console.log(err);
}


document.addEventListener('DOMContentLoaded',async () =>{
  const ui = new UI();
  const products = new Products();
  const books = new Books();

  ui.setAPP();
  ui.setAPPR();
  ui.setAPPV();

  var productsObj;
  firebase.database().ref('/Books/').once('value').then(function (snapshot) {
    productsObj = snapshot.val();
    booksObj = snapshot.val();
    

    ui.displayProducts(productsObj);

    Storage.saveProduct(productsObj);

    ui.getButtons();
    ui.cartLogic();

    /* OBTENER LOS PROVEEDORES DE LA BASE DE DATOS Y SETEARLOS */
    firebase.database().ref('/Proveedor/').once('value').then(function (snapshot) {
      let proveedores = snapshot.val();
      localStorage.setItem("Proveedores", JSON.stringify(proveedores));
    });

    /* OBTENER LOS LIBROS MÁS VENDOIDOS DE LA BASE DE DATOS Y SETEARLOS */
    firebase.database().ref('/masVendidos/').once('value').then(function (snapshot) {
      let masvend = snapshot.val();
      localStorage.setItem("masVendidos", JSON.stringify(masvend));
      ui.displayMasVendidos(masvend);
    });

    /*  */
  /*  firebase.database().ref('/checkOut/').once('value').then(function (snapshot) {
      let historialCompras = snapshot.val();
      localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
    });*/



});


  

});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    //alert("Active user " + user.email);
    ReturnUser(user.email);
    //activeUser = user.email;
  } else {
    //alert("No active user");
  }
});

function hideLogin() {
  document.getElementById("login").style.visibility = "hidden";
  document.getElementById("signup").style.visibility = "hidden";
  document.getElementById("logout").style.visibility = "visible";
  document.getElementById("proceed__ToCheck").style.visibility = "visible";

  if (activeUser ==  "admin@admin.com") {
    document.getElementById("agregarLibro").style.visibility = "visible";
    document.getElementById("proveedores").style.visibility = "visible";
    document.getElementById("proceed__ToCheck").style.visibility = "hidden";
  }

}

function showLogin() {
  document.getElementById("login").style.visibility = "visible";
  document.getElementById("signup").style.visibility = "visible";
  document.getElementById("logout").style.visibility = "hidden";
  document.getElementById("proceed__ToCheck").style.visibility = "hidden";
  document.getElementById("proveedores").style.visibility = "hidden";
  document.getElementById("agregarLibro").style.visibility = "hidden";
}

function ReturnUser (user) {
  alert("¡Hola de nuevo " + user + "!");
  activeUser = user;

  firebase.database().ref('/users/').once('value').then(function (snapshot) {
    let active = snapshot.val();
    localStorage.setItem("user", JSON.stringify(active));
  });
  let ultimo = JSON.parse(localStorage.getItem("user"));
  ultimo = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : [];


  var key = Object.keys(ultimo);
 // console.log(key);
  
  let us;
  for (let i = 0 ; i  < key.length; ++i) {
    var u = ultimo[key[i]];
    if (u.email == user) {
      us = u;
      break;
    }
  }

  //console.log("Bienvenido" + us.username);
  localStorage.setItem("activeUser", JSON.stringify(us));

  
  hideLogin();
}

function LogOut () {
  firebase.auth().signOut();
  localStorage.removeItem("activeUser");
  alert("Se ha cerrado sesión");
  showLogin();
}
