
const db = require('../database/db');

const Book = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM books');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  },
  search: async (query) => {
    const [rows] = await db.query(`
      SELECT * FROM books WHERE 
      title LIKE ? OR author LIKE ? OR category LIKE ?
    `, [`%${query}%`, `%${query}%`, `%${query}%`]);
    return rows;
  },
  create: async (book) => {
    const { title, author, category, copies } = book;
    const [result] = await db.query(`
      INSERT INTO books (title, author, category, copies) 
      VALUES (?, ?, ?, ?)`, [title, author, category, copies]);
    return result.insertId;
  },
  update: async (id, book) => {
    const { title, author, category, copies } = book;
    await db.query(`
      UPDATE books SET title = ?, author = ?, category = ?, copies = ? 
      WHERE id = ?`, [title, author, category, copies, id]);
  },
  delete: async (id) => {
    await db.query('DELETE FROM books WHERE id = ?', [id]);
  },
};

module.exports = Book;
