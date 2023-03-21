let myLibrary = [];
let index = -1;

// book constructor
function Book(data) {
  index = index + 1;
  this.index = index;
  this.number_of_pages = data.inputNumber;

  // handle empty book title
  if (!data.inputBookName) {
    this.title = "Book Title";
  } else {
    this.title = data.inputBookName;
  }

  // handle empty author field
  if (!data.inputAuthor) {
    this.author = "Author";
  } else {
    this.author = data.inputAuthor;
  }

  if (data.read_status === "") {
    this.read_status = true;
  } else {
    this.read_status = false;
  }
}

function getData(form) {
  let formData = new FormData(form);
  let book = new Book(Object.fromEntries(formData));

  addBook(book);
  myLibrary.push(book);
}

function addBook(book) {
  let template = document.querySelector("template");
  let clone = template.content.cloneNode(true);

  let card = clone.getElementById("card_book");
  card.id = `card_book_${book.index}`;

  let card_book_name = clone.getElementById("card_book_name");
  card_book_name.textContent = book.title;

  let card_author = clone.getElementById("card_author");
  card_author.textContent = book.author;

  let card_pages = clone.getElementById("card_pages");
  card_pages.textContent = `Number of Pages - ${book.number_of_pages}`;

  let read_status = clone.getElementById("card_read_status");
  read_status.id = `card_read_status_${book.index}`;

  let remove_btn = clone.getElementById("remove_card");
  remove_btn.id = `remove_card_${book.index}`;

  if (book.read_status) {
    read_status.classList.add("btn-success");
    read_status.textContent = "READ";
  } else {
    read_status.classList.add("btn-danger");
    read_status.textContent = "UNREAD";
  }

  let grid = document.getElementById("row");

  grid.appendChild(clone);

  change_status(document.querySelectorAll(".change_status")); //dont like it but works for some reason
  remove_book();
}

function remove_book() {
  let all_remove_buttons = document.querySelectorAll(".remove_card");
  let remove_btn_id = -1;
  if(all_remove_buttons === null || myLibrary === null){
    return null;
  }
  all_remove_buttons.forEach((remove_button) => {
    remove_button.addEventListener("click", (event) => {
      let remove_btn_id = getIndex(event.target.id);
      console.log(remove_btn_id);
      let to_be_removed_card = document.getElementById(
        `card_book_${remove_btn_id}`
      );
      to_be_removed_card.remove();
      to_be_removed_card.replaceChildren();
      

      myLibrary.forEach((book) => {
        if (book.index == remove_btn_id) {
          myLibrary.splice(myLibrary.indexOf(book), 1);
        }
      });
    });
  });
}

function toggle_read_status(read_switch) {
  if (read_switch === true) {
    read_switch = false;
  } else {
    read_switch = true;
  }
  return read_switch;
}

function getIndex(string) {
  return string.charAt(string.length - 1);
}

function change_status(all_buttons) {
  all_buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let btn_id = getIndex(event.target.id);
      let btn = document.getElementById(`card_read_status_${btn_id}`);
      let read_switch = null;

      // change status in mylibrary
      myLibrary.forEach((book) => {
        if (book.index == btn_id) {
          book.read_status = toggle_read_status(book.read_status);
          read_switch = book.read_status;
        }
      });

      // change buttin ui
      if (read_switch === true) {
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-success");
        btn.textContent = "READ";
      } else {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-danger");
        btn.textContent = "UNREAD";
      }
    });
  });
}

document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();
  getData(e.target);
  this.reset();
  document.getElementById("closeModal").click();
});
