const savedBooks = [];

const hideItem = function (e) {
  const card = e.target.closest('[class*="col-"]');
  if (card) {
    card.style.display = "none";
  }
};

const getBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "Qualcosa è andato storto con la comunicazione al server"
        );
      }
    })
    .then((books) => {
      console.log(books);
      const cardsArea = document.getElementById("cardsArea");
      for (let i = 0; i < books.length; i++) {
        cardsArea.innerHTML += `<div class="col-6 col-md-4 col-lg-2">
        <div class="card border border-primary" style="height: 685px">
        <img src="${books[i].img}" class="card-img-top">
        <div class="card-body">
        <div class="d-flex flex-column justify-content-between" style="height:100%">
        <div><h5 class="card-title">Title: ${books[i].title}</h5>
        <p class="card-text">Price: ${books[i].price}</p>
        <p class="card-text">Category: ${books[i].category}</p>
        <p class="card-text">Asin: ${books[i].asin}</p>
        </div>
        <div class="text-center">
        <button type="button" class="btn btn-success" data-index="${i}"><i class="bi bi-cart-plus-fill"></i></button>
        <button type="button" class="btn btn-danger"  onclick="hideItem(event)"><i class="bi bi-trash-fill"></i></button>
        </div>
        </div>
        </div>
        </div>
        </div>`;
      }
      const addButtons = document.querySelectorAll(".btn-success");
      addButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.currentTarget.getAttribute("data-index");
          const item = books[index];
          savedBooks.push(item);
          localStorage.setItem("items", JSON.stringify(savedBooks));
        });
      });
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

getBooks();
