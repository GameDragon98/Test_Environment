const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const PORT = 3000;

// Sample data 
let books = [
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' },
    { id: 2, title: 'Lord of the Rings', author: 'J.R.R. Tolkien' }
];

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Route to get a single book by ID
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

// Route to create a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const id = books.length + 1;
    const newBook = { id, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Route to update a book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    books[bookIndex] = { id, title, author };
    res.json(books[bookIndex]);
});

// Route to delete a book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    const deletedBook = books.splice(bookIndex, 1)[0];
    res.json({ message: 'Book deleted', book: deletedBook });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
