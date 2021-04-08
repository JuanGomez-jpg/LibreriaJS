
const contentBook = document.querySelector(".content");
const bookDOM = document.querySelector('.card');
window.onload = booksDetails;


function VolverInicio () {
    location.href ="http://localhost/node-libreria/";
}

function booksDetails() {
    var image = localStorage.getItem("image");
    var id = localStorage.getItem("idLibro");
    var title = localStorage.getItem("title");
    var price = localStorage.getItem("price");
    var author = localStorage.getItem("author");
    var year = localStorage.getItem("year");
    var description = localStorage.getItem("description");
    var subgender = localStorage.getItem("subgender");
    var categorie = localStorage.getItem("categorie");
    var amount = localStorage.getItem("amount");
    //localStorage.clear();
    book({amount ,subgender ,categorie ,description ,year ,author ,price,title, image});
}

 function book ({amount ,subgender ,categorie ,description ,year ,author ,price,title, image}) {
    let results = '';
    results += `
    <img src=${image} alt="" style="width:50%" />
    <div class="container">
        <h4>Título: </h4><p>${title}</p>
        <h4>Autor: </h4><p>${author}</p>
        <h4>Año: </h4><p>${year}</p>
        <h4>Categoría: </h4><p>${categorie}</p>
        <h4>Subgénero: </h4><p>${subgender}</p>
        <h4>Cantidad dishponible: </h4><p>${amount}</p>
        <h4>Precio: </h4><p>$${price}</p>
        <h4>Descripción: </h4><p>${description}</p>
    </div>`;

    bookDOM.innerHTML = results;
  }




