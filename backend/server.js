const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authroutes');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const chatRoutes = require('./routes/chatRoutes');
const session = require('express-session');
const assessmentRoutes=require('./routes/assessmentRoutes');
const { connectDB, connectQuestionsDB } = require('./config/db');
const swotRoutes = require('./routes/swotRoutes');

dotenv.config();

const app = express();
const corsOptions = {
  origin: 'http://127.0.0.1:8080', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(helmet());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60
    }
  })
);


connectDB();



app.use('/api/auth', authRoutes);
app.use('/api/chatbot', chatRoutes);
app.use('/api/assessment',assessmentRoutes);
app.use('/api/swot/',swotRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log("Mongoose connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing mongoose connection:", error);
    process.exit(1);
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
