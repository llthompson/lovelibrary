// fetch(`https://www.googleapis.com/books/v1/volumes?q=search-terms&key=your-API-key)
//   .then(response => response.json())
//   .then(result => {
// this.setState({ books: result.items})
// })}

// search book semiosis

const button = document.getElementById('btn');
const input = document.getElementById('input');
const ul = document.getElementById('items');

let arrayOfBooks = [];


button.addEventListener('click', () => {

    let search = input.value;
    fetchBooks(search);

})


async function fetchBooks(search) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`);
    const data = await response.json();
    arrayOfBooks = data.items;
    displayBooks();
}

const displayBooks = () => {
    ul.innerHTML = '';
    arrayOfBooks.forEach(book => {
        const li = document.createElement('li');
        li.className = 'bookItem';
        li.textContent = book.volumeInfo.title;
        // console.log(book.volumeInfo);
        ul.appendChild(li);
    });

}

console.log(fetchBooks)