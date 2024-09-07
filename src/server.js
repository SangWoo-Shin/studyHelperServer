const express = require('express');
//const passport = require('passport');
const connectDB = require('./config/database');
var cors=require('cors');
const userRoutes = require('./routes/userRoute');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
//app.use('/uploads', express.static(__dirname + '/uploads'));
//app.use(passport.initialize());
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  // Start server if database connection is successful
  app.listen(8080, () => {
    console.log('Server started on port 8080');
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit process with failure
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/', userRoutes); 