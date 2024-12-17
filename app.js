
const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);

// Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
