const myLibrary = [];

const form = document.getElementById('library-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.toggleReadStatus = function() {
        this.read = !this.read;
    }

    this.removeFromLibrary = function() {
        const index = myLibrary.indexOf(this);
        myLibrary.splice(index, 1);
    }
}

function addBookToLibrary() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const readInput = document.getElementById('read');
    
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;
    
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayLibrary();
}

function displayLibrary() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = ''; // Clear the container before adding new books

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        const titleElement = document.createElement('p');
        titleElement.textContent = `Title: ${book.title}`;
        bookCard.appendChild(titleElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;
        bookCard.appendChild(authorElement);

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pagesElement);

        const readElement = document.createElement('p');
        readElement.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
        bookCard.appendChild(readElement);

        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-read-btn');
        toggleButton.textContent = 'Read/Unread';
        toggleButton.addEventListener('click', () => {
            const index = bookCard.getAttribute('data-index');
            myLibrary[index].toggleReadStatus();
            displayLibrary();
        });
        bookCard.appendChild(toggleButton);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            const index = bookCard.getAttribute('data-index');
            myLibrary[index].removeFromLibrary();
            displayLibrary();
        });
        bookCard.appendChild(removeButton);

        libraryContainer.appendChild(bookCard);
    });
}


document.addEventListener('DOMContentLoaded', () => {
  displayLibrary();
});

