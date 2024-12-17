
const Loan = require('../models/loanModel');

const borrowBook = async (req, res) => {
  try {
    await Loan.borrow(req.body.bookId, req.body.userId);
    res.json({ message: 'Book borrowed successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  await Loan.returnBook(req.body.bookId, req.body.userId);
  res.json({ message: 'Book returned successfully' });
};

const getMostBorrowedBooks = async (req, res) => {
  const books = await Loan.getMostBorrowedBooks();
  res.json(books);
};

module.exports = { borrowBook, returnBook, getMostBorrowedBooks };
