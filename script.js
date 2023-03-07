const add_book_btn = document.querySelector(".add-book-btn");
const modal_section = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const close_button = document.querySelector(".close-btn");

add_book_btn.addEventListener("click", () => {
  console.log("modal open");
  modal_section.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

close_button.addEventListener("click", () => {
  console.log("modal close");
  modal_section.classList.add("hidden");
  overlay.classList.add("hidden");
});
