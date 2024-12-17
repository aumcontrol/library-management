
const express = require('express');
const loansController = require('../controllers/loansController');
const router = express.Router();

router.post('/borrow', loansController.borrowBook);
router.post('/return', loansController.returnBook);
router.get('/most-borrowed', loansController.getMostBorrowedBooks);

module.exports = router;
