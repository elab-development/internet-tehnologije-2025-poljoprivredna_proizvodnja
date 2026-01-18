const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const cropRoutes = require('./routes/cropRoutes');
const productionRoutes = require('./routes/productionRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use('/api/users', userRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/productions', productionRoutes);
app.use('/api/expenses', expenseRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
