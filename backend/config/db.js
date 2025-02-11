const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const connectQuestionsDB = async () => {
  try {
    const questionsDbUri = process.env.QUESTION_URI;  
    const questionsDb = await mongoose.createConnection(questionsDbUri);
    console.log('Questions MongoDB connected');
    return questionsDb; 
  } catch (err) {
    console.error('Error connecting to questions DB:', err);
    process.exit(1);
  }
};


module.exports = { connectDB, connectQuestionsDB };
