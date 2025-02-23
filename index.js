const express = require('express');
const userRoutes = require('./routes/userRoute');
const exercisesRoutes = require('./routes/exercisesRoute');
const journalEntryRoutes = require('./routes/journalEntryController');
const noteRoutes = require('./routes/noteRoute');
const setGoalsRoutes = require('./routes/setGoalsRoute');

//Creating a Server
const app = express();

//Creating a port
const PORT = process.env.PORT || 5000



// Register routes
app.use('/users', userRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/journalEntries', journalEntryRoutes);
app.use('/notes', noteRoutes);
app.use('/setGoals', setGoalsRoutes);

// 404 Not Found Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});


//Running on PORT
app.listen(PORT, ()=>{
    console.log(`Server Running on........................ PORT ${PORT}`)
})