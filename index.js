const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const exercisesRoutes = require('./routes/exercisesRoute');
const journalEntryRoutes = require('./routes/journalEntryRoute');
const noteRoutes = require('./routes/noteRoute');
const setGoalsRoutes = require('./routes/setGoalsRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes
app.use('/users', userRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/journalEntries', journalEntryRoutes);
app.use('/notes', noteRoutes);
app.use('/setGoals', setGoalsRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});
