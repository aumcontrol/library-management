
const db = require('../database/db');

const Loan = {
  borrow: async (bookId, userId) => {
    const [book] = await db.query('SELECT copies FROM books WHERE id = ?', [bookId]);
    if (book[0]?.copies > 0) {
      await db.query('UPDATE books SET copies = copies - 1 WHERE id = ?', [bookId]);
      await db.query(`
        INSERT INTO loans (book_id, user_id, borrowed_date) 
        VALUES (?, ?, NOW())`, [bookId, userId]);
    } else {
      throw new Error('Book is unavailable for borrowing.');
    }
  },
  returnBook: async (bookId, userId) => {
    await db.query('UPDATE books SET copies = copies + 1 WHERE id = ?', [bookId]);
    await db.query(`
      UPDATE loans SET returned_date = NOW() 
      WHERE book_id = ? AND user_id = ? AND returned_date IS NULL
    `, [bookId, userId]);
  },
  getMostBorrowedBooks: async () => {
    const [rows] = await db.query(`
      SELECT books.id, books.title, COUNT(loans.book_id) AS borrow_count
      FROM loans
      JOIN books ON loans.book_id = books.id
      GROUP BY loans.book_id
      ORDER BY borrow_count DESC
      LIMIT 10
    `);
    return rows;
  },
};

module.exports = Loan;
