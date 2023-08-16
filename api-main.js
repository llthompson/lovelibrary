// search book example 'semiosis'

//initial setup

const button = document.getElementById('btn');
const input = document.getElementById('input');
const ul = document.getElementById('items');

let arrayOfBooks = [];

input.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const search = input.value;
        await fetchBooks(search);
    }
});

button.addEventListener('click', async () => {
    let search = input.value;
    await fetchBooks(search);
})

async function fetchBooks(search) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`);
    const data = await response.json();
    arrayOfBooks = data.items;
    console.log('an array of books', arrayOfBooks);
    displayBooks();
}

const displayBooks = () => {
    ul.innerHTML = '';
    arrayOfBooks.forEach(book => {
        const li = document.createElement('li');
        li.className = 'bookItem';
        li.textContent = `Title: ${book.volumeInfo.title} Author: ${book.volumeInfo.authors}`;
        const card = createCard(book);
        ul.appendChild(card);
    });
}

//creating card details

const createImage = (book) => {
    const cardImage = document.createElement('div');
    const img = document.createElement('img');
    img.className = 'img-activator';
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

    const p = document.createElement('p');
    p.className = 'titleP'
    const a = document.createElement('a');
    a.href = book.volumeInfo.infoLink;
    a.innerText = `Title | ${book.volumeInfo.title}`;
    p.appendChild(a);

    cardContent.appendChild(span);
    cardContent.appendChild(p);
    // console.log('a title and link', cardContent);
    return cardContent;
}

const createAuthor = (book) => {
    const cardAuthor = document.createElement('div');
    cardAuthor.className = 'card-content';

    const span = document.createElement('span');
    span.className = 'card-title activator grey-text text-darken-4';

    const p = document.createElement('p');
    p.className = 'authorP'
    const a = document.createElement('a');
    a.href = book.volumeInfo.infoLink;
    a.innerText = `Author | ${book.volumeInfo.authors}`;
    p.appendChild(a);

    cardAuthor.appendChild(span);
    cardAuthor.appendChild(p);
    // console.log('author', cardAuthor);
    return cardAuthor;
}

const createPublisher = (book) => {
    const cardPublisher = document.createElement('div');
    cardPublisher.className = 'card-content';

    const span = document.createElement('span');
    span.className = 'card-title activator grey-text text-darken-4';

    const p = document.createElement('p');
    p.className = 'publisherP'
    const a = document.createElement('a');
    a.href = book.volumeInfo.infoLink;
    a.innerText = `Publisher | ${book.volumeInfo.publisher}`;
    p.appendChild(a);

    cardPublisher.appendChild(span);
    cardPublisher.appendChild(p);
    // console.log('publisher', cardPublisher);
    return cardPublisher;
}

//toggle book summary

const createToggle = (cardReveal) => {
    const icon = document.createElement('i')
    icon.className = 'material-icons right toggle-icon';
    icon.innerText = 'zoom_in';
    icon.addEventListener('click', () => {
        cardReveal.classList.toggle('revealed');
        if (cardReveal.classList.contains('revealed')) {
            icon.innerText = 'zoom_out';
        } else {
            icon.innerText = 'zoom_in';
        }
    });
    return icon;
}

const createReveal = (book) => {
    const cardReveal = document.createElement('div');
    cardReveal.className = 'card-reveal'

    const sumHeader = document.createElement('h3');
    sumHeader.innerText = 'Summary';

    const p = document.createElement('p');
    p.className = 'summaryP';
    p.innerHTML = book.volumeInfo.description;

    cardReveal.appendChild(sumHeader);
    cardReveal.appendChild(p);
    // console.log('summary??', cardReveal);
    return cardReveal;
}

//displaying results

const createCard = (book) => {

    //create the card
    const card = document.createElement('div');
    card.className = 'card';

    //name the stuff on the card
    const cardImage = createImage(book);
    const cardContent = createContent(book);
    const cardAuthor = createAuthor(book);
    const cardPublisher = createPublisher(book);

    const cardReveal = createReveal(book);
    const cardToggle = createToggle(cardReveal);

    //container
    const cardContentContainer = document.createElement('div');
    cardContentContainer.className = 'card-content-container';
    cardContentContainer.appendChild(cardContent);
    cardContentContainer.appendChild(cardAuthor);
    cardContentContainer.appendChild(cardPublisher);

    //put the stuff on the card
    card.appendChild(cardImage);
    card.appendChild(cardContentContainer);
    card.appendChild(cardToggle);

    card.appendChild(cardReveal);


    //finish
    return card
}