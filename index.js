// const express = require("express");
// const cors= require("cors");
// const bodyParser = require("body-parser");
// const sequelize=require('./database/db')
// const userRoute=require('./')

// //creating a server
// const app=express();


// //creating a port
// const PORT=5000;

// //creating a middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));


// //creating a routeS
// app.get('/',(req, res)=>{
//     res.send("This is web page")
// })
// app.get('/ourpartners',(req, res)=>{
//     res.send(`Your Partners ${req.params.id}`)
// })


// //running on port
// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const sequelize = require('./database/db'); // Import database connection
const userRoutes = require('./routes/userRoute');
const exercisesRoutes = require('./routes/exercisesRoute');
const journalEntryRoutes = require('./routes/journalEntryController');
const moodTrackerRoutes = require('./routes/moodTrackerRoute');
const noteRoutes = require('./routes/noteRoute');
const reminderRoutes = require('./routes/reminderRoutes');
const reviewProgressRoutes = require('./routes/reviewProgressRoutes');
const setGoalsRoutes = require('./routes/setGoalsRoute');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Register routes
app.use('/users', userRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/journalEntries', journalEntryRoutes);
app.use('/moodTracker', moodTrackerRoutes);
app.use('/notes', noteRoutes);
app.use('/reminders', reminderRoutes);
app.use('/reviewProgress', reviewProgressRoutes);
app.use('/setGoals', setGoalsRoutes);

// Test database connection and sync models
sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Database sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


