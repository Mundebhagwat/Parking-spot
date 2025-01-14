require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
// import routes
//change from ROHIT

app.use(cors());
connectDB();
app.use(express.json());

// routes
app.use('/api', routes);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/managers', require('./routes/managers'));


// server connection
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
