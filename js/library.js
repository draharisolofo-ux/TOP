const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const btn = document.querySelector(".btn-add");
const tbody = document.querySelector("tbody");

let myLibrary = [];

function Book() {
  // the constructor...
}

Book.prototype.create = function(title, author, page, read = false) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = page;
  this.read = read;
  myLibrary.push({
    id: this.id,
    title: this.title,
    author: this.author,
    pages: this.pages,
    read: this.read
  });
}

Book.prototype.check = function(id) {
  myLibrary = myLibrary.map(b => {
    if(b.id === id) {
      b.read = !b.read;
    }
    return b;
  });

  showBooks();
}

function showBooks()
{
  tbody.innerHTML = "";
  for(let book of myLibrary) {
    addRow(book);
  }
}

function removeBook(id) {
  myLibrary = myLibrary.filter(b => b.id != id);
}

function addRow(book) {
  const tr = document.createElement("tr");
  const idRow = document.createElement("td");
  const titleRow = document.createElement("td");
  const authorRow = document.createElement("td");
  const pagesRow = document.createElement("td");
  const readRow = document.createElement("td");
  const actionRow = document.createElement("td");
  const removeBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  checkBtn.type = "button";
  checkBtn.textContent = "Toggle";
  checkBtn.classList.add("btn-check");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("btn-remove");
  removeBtn.addEventListener('click', () => {
    tr.remove();
    removeBook(tr.cells[0].textContent);
  });
  checkBtn.addEventListener('click', function() {
    Book.prototype.check(tr.cells[0].textContent);
  })
  actionRow.append(checkBtn, removeBtn);
  idRow.textContent = book.id;
  titleRow.textContent = book.title;
  authorRow.textContent = book.author;
  pagesRow.textContent = book.pages;
  readRow.textContent = book.read ? "Already" : "Not yet";
  tr.append(idRow, titleRow, authorRow, pagesRow, readRow, actionRow);
  tbody.append(tr);
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const book = new Book();
  book.create(title.value, author.value, pages.valueAsNumber, read.value);
  title.value = author.value = pages.value = read.value = "";
  addRow(book);
})