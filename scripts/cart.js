const generateItem = function (obj, i) {
  const cartArea = document.getElementById("cartList");
  cartArea.insertAdjacentHTML(
    "beforeEnd",
    `<div
                class="d-flex align-items-center my-2 border border-secondary p-3"
              >
                <div class="w-25">${obj.title}</div>
                <div class="w-25 text-center">${obj.category}</div>
                <div class="w-25 text-center">${obj.asin}</div>
                <div class="w-25 text-end"><i class="bi bi-trash-fill text-danger" style="cursor:pointer" data-index="${i}"></i>${obj.price} $</div>
              </div>`
  );
};
const calculatePrice = function (price) {
  const priceArea = document.getElementById("priceArea");
  priceArea.innerHTML = `<div class="d-flex justify-content-end">
                    <div>Total: ${price} $</div>
                    </div>`;
};

if (localStorage.getItem("items")) {
  const books = JSON.parse(localStorage.getItem("items"));
  let total = 0;
  books.forEach((element, index) => {
    generateItem(element, index);
    total += parseFloat(element.price);
  });
  const deleteButtons = document.querySelectorAll(".bi-trash-fill");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index");
      const item = books[index];
      total = total - item.price;
      calculatePrice(total);
      e.target.closest(".d-flex").remove();
      books.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(books));
    });
  });
  calculatePrice(total);
} else {
  const cartArea = document.getElementById("cartList");
  cartArea.innerHTML += `You don't have any items in your cart, go back to shopping!`;
}
