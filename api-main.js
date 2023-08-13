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


button.addEventListener('click', async () => {

    let search = input.value;
    await fetchBooks(search);

})


async function fetchBooks(search) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`);
    const data = await response.json();
    arrayOfBooks = data.items;
    console.log(arrayOfBooks);
    displayBooks();
}

const displayBooks = () => {
    ul.innerHTML = '';
    arrayOfBooks.forEach(book => {
        const li = document.createElement('li');
        li.className = 'bookItem';
        li.textContent = `Title: ${book.volumeInfo.title} Author: ${book.volumeInfo.authors}`;
        // console.log(book.volumeInfo);
        const card = createCard(book);
        ul.appendChild(card);
    });

}

const createImage = (book) => {
    const cardImage = document.createElement('div');
    const img = document.createElement('img');
    img.className = 'activator';
    img.src = book.volumeInfo.imageLinks.thumbnail;
    cardImage.appendChild(img);
    cardImage.className = 'card-image waves-effect waves-block waves-light';
    return cardImage;
}

const createContent = (book) => {
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const span = document.createElement('span');
    span.className = 'card-title activator grey-text text-darken-4';
    const icon = document.createElement('i')
    icon.className = 'material-icons right';
    icon.innerText = 'expand_less';
    span.appendChild(icon);

    const p = document.createElement('p');
    p.className = 'titleP'
    const a = document.createElement('a');
    a.href = book.volumeInfo.infoLink;
    a.innerText = book.volumeInfo.title;
    p.appendChild(a);

    cardContent.appendChild(span);
    cardContent.appendChild(p);

    console.log('a title and link', cardContent);
    return cardContent;
}

// create author, publisher, genre


const createReveal = (book) => {
    const cardReveal = document.createElement('div');
    cardReveal.className = 'card-reveal'

    const span = document.createElement('span');
    span.className = 'card-title grey-text text-darken-4';
    const icon = document.createElement('i')
    icon.className = 'material-icons right';
    icon.innerText = 'expand_more';
    span.appendChild(icon);

    const p = document.createElement('p');
    p.className = 'summaryP';
    p.innerHTML = book.volumeInfo.description;

    cardReveal.appendChild(span);
    cardReveal.appendChild(p);

    console.log('summary??', cardReveal);
    return cardReveal;
}

const createCard = (book) => {


    //create the card
    const card = document.createElement('div');
    card.className = 'card';

    //name the stuff on the card

    const cardImage = createImage(book);
    const cardContent = createContent(book);
    const cardReveal = createReveal(book);


    //put the stuff on the card

    card.appendChild(cardImage)
    card.appendChild(cardContent);
    card.appendChild(cardReveal);
    return card
}

// console.log(fetchBooks)