
const Book = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  const books = await Book.getAll();
  res.json(books);
};

const getBookById = async (req, res) => {
  const book = await Book.getById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

const searchBooks = async (req, res) => {
  const query = req.query.q || '';
  const books = await Book.search(query);
  res.json(books);
};

const createBook = async (req, res) => {
  const newBookId = await Book.create(req.body);
  res.status(201).json({ id: newBookId });
};

const updateBook = async (req, res) => {
  await Book.update(req.params.id, req.body);
  res.json({ message: 'Book updated successfully' });
};

const deleteBook = async (req, res) => {
  await Book.delete(req.params.id);
  res.json({ message: 'Book deleted successfully' });
};

module.exports = { getAllBooks, getBookById, searchBooks, createBook, updateBook, deleteBook };
