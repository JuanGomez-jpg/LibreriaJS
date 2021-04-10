const openCart = document.querySelector('.cart__icon');
const openRecommended = document.querySelector('.recommended__icon');

const closeCart = document.querySelector('.close__cart');
const closeRecommended = document.querySelector('.close__recommended');

const productDOM = document.querySelector('.product__center');
const bookDOM = document.querySelector('.recommended__center');

const cartDOM = document.querySelector('.cart');
const recommendedDOM = document.querySelector('.recommended__cart');

const cartContent = document.querySelector(".cart__centent");
const recommendedContent = document.querySelector('.recommended__centent');

const itemTotals = document.querySelector('.item__total');
const cartTotal = document.querySelector('.cart__total');

const overlay = document.querySelector(".cart__overlay");
const overlayRecommended = document.querySelector('.recommended__overlay');

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
    obj.forEach(({title,image,id,price}) => {
      results += `<div class="product">
                    <div class="image__container">
                      <img src=${image} alt="" />
                    </div>
                    <div class="product__footer">
                      <h1>${title}</h1>
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
                            <use xlink:href="./img/sprite.svg#icon-star-empty"></use>
                          </svg>
                        </span>
                      </div>
                      <div class="bottom">
                        <div class="btn__group">
                           <button class="btn addToCart" data-id= ${id} >Añadir al carrito</button>
                           <button class="btn view" data-id=${id} >Ver</button>
                        </div>
                        <div class="price">$${price}</div>
                      </div>
                    </div>
                  </div>`;
    });

    productDOM.innerHTML = results;
  }

  displayRecommended(obje){

    let diva = document.createElement("div");

    diva.classList.add('recommended__item');

    obje.forEach(({title,image,id,price}) => {
      diva.innerHTML += `<img src=${image}>
            <div>
              <h3>${title}</h3>
              <h3 class="price">$${price}</h3>
            </div>
          </div>`;

        });

    recommendedContent.appendChild(diva);

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

        //Get product from products
        const cartItem = {...Storage.getProduct(id),amount: 1};
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
        
      });

    });

    viewButtons.forEach(buttonV => {
      const id = buttonV.dataset.id;

      buttonV.addEventListener('click', e=> {
        e.preventDefault();
        //Get product from products
        const cartItem = {...Storage.getProduct(id),amount: 1};
        //display the items in the cart
        this.viewProduct(cartItem);

      });

    });



  }

  setItemValues(cart) {
    let tempTotal = 0;
    let itemTotal = 0;

    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    itemTotals.innerText = itemTotal;
  }

  addToCart ({title, price, image, id}) {
    let div = document.createElement("div");
    div.classList.add('cart__item');

    div.innerHTML = `<img src=${image}>
          <div>
            <h3>${title}</h3>
            <h3 class="price">$${price}</h3>
          </div>
          <div>
            <span class="increase" data-id=${id}>
              <svg>
                <use xlink:href="./img/sprite.svg#icon-angle-up"></use>
              </svg>
            </span>
            <p class="item__amount">1</p>
            <span class="decrease" data-id=${id}>
              <svg>
                <use xlink:href="./img/sprite.svg#icon-angle-down"></use>
              </svg>
            </span>
          </div>
            <span class="remove__item" data-id=${id}>
              <svg>
                <use xlink:href="./img/sprite.svg#icon-trash"></use>
              </svg>
            </span>
        </div>`;

    cartContent.appendChild(div);
  }

  BookDetails ({amount ,subgender ,categorie ,description ,year ,author ,price,title, image, id}) {
    var imageP = image;
    var imageP2 = "." + imageP;
    localStorage.setItem("idLibro",id);
    localStorage.setItem("image",imageP2);
    localStorage.setItem("title",title);
    localStorage.setItem("price",price);
    localStorage.setItem("author",author);
    localStorage.setItem("year",year);
    localStorage.setItem("description",description);
    localStorage.setItem("categorie",categorie);
    localStorage.setItem("subgender",subgender);
    localStorage.setItem("amount",amount);


    location.href ="http://localhost/node-libreria/pages/productDetails.html";
  }

  viewProduct ({amount ,subgender ,categorie ,description ,year ,author ,price,title, image, id}) {
    this.BookDetails({amount ,subgender ,categorie ,description ,year ,author ,price,title, image, id});
  }

  recommendBook ({amount ,subgender ,categorie ,description ,year ,author ,price,title, image, id}) {
    //Tomo el libro por el cual se recomendarán más libros
    const librosR = libros;
    var imageP = image;
    var imageP2 = "." + imageP;
    localStorage.setItem("id",id);
    localStorage.setItem("imag",imageP2);
    localStorage.setItem("tit",title);
    localStorage.setItem("pri",price);
    localStorage.setItem("auth",author);
    localStorage.setItem("ye",year);
    localStorage.setItem("des",description);
    localStorage.setItem("cat",categorie);
    localStorage.setItem("gender",subgender);
    localStorage.setItem("am",amount);

    //Comparo cada uno de los libros por el subgénero literario con el añadido al carrito
    //para así guardar en un arreglo todas las coincidencias con el que está
    //en el carrito

    recomendados = null;
    recomendados = [];


    for (let i = 0 ; i < booksObj.length; ++i) {
      if (booksObj[i].subgender === subgender) {
        recomendados.push(booksObj[i]);
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

  hide() {
    cartDOM.classList.remove("show");
    overlay.classList.remove("show");

  }

  hideR () {
    recommendedDOM.classList.remove("show");
    overlayRecommended.classList.remove("show");
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

  populate(cart) {
    cart.forEach(item => this.addToCart(item));
  }

  populateR(reco) {
    reco.forEach(item => this.addToRecommended(item));
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

        const id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount++;
        Storage.saveCart(cart);
        this.setItemValues(cart);
        target.nextElementSibling.innerText = tempItem.amount;

      } else if (target.classList.contains("decrease")) {

        const id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount--;

        if (tempItem.amount > 0) {

          Storage.saveCart(cart);
          this.setItemValues(cart);
          target.previousElementSibling.innerText = tempItem.amount;

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
    return products.find(product => product.id === parseFloat(id, 10));
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
    try{
      const results = await fetch('./JSON/books.json');
      const data = await results.json();
      const products = data.items;
      return products;
    }catch (err){
      console.log(err);
    }

  }
}

class Books{

  async getBooks(){
    try{
      const results = await fetch('./JSON/books.json');
      const data = await results.json();
      const products = data.items;
      return products;
    }catch (err){
      console.log(err);
    }

  }
}

document.addEventListener('DOMContentLoaded',async () =>{
  const ui = new UI();
  const products = new Products();
  const books = new Books();

  ui.setAPP();
  ui.setAPPR();

  const productsObj = await products.getProducts();
  booksObj = await books.getBooks();

  ui.displayProducts(productsObj);

  Storage.saveProduct(productsObj);
  ui.getButtons();
  ui.cartLogic();
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    //alert("Active user " + user.email);
    ReturnUser(user.email);
    //activeUser = user.email;
  } else {
    //alert("No active user");
  }
})

function hideLogin() {
  document.getElementById("login").style.visibility = "hidden";
  document.getElementById("signup").style.visibility = "hidden";
  document.getElementById("logout").style.visibility = "visible";
  document.getElementById("proceed__ToCheck").style.visibility = "visible";

  if (activeUser === "admin@admin.com") {
    document.getElementById("agregarLibro").style.visibility = "visible";
    document.getElementById("proceed__ToCheck").style.visibility = "hidden";
  }

}

function showLogin() {
  document.getElementById("login").style.visibility = "visible";
  document.getElementById("signup").style.visibility = "visible";
  document.getElementById("logout").style.visibility = "hidden";
  document.getElementById("proceed__ToCheck").style.visibility = "hidden";
  document.getElementById("agregarLibro").style.visibility = "hidden";
}

function ReturnUser (user) {
  alert("¡Hola de nuevo " + user + "!");
  activeUser = user;
  hideLogin();
}

function LogOut () {
  firebase.auth().signOut();
  alert("Se ha cerrado sesión");
  showLogin();
}



