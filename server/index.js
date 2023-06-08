const db = require('./database');
const cors = require('cors');
const express = require('express');
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes 
const plannerRoute = require('./routes/planner');
app.use('/planner', plannerRoute);

const trackerRoute = require('./routes/tracker');
app.use('/tracker', trackerRoute);

const dashboardRoute = require('./routes/dashboard');
app.use('/', dashboardRoute);


app.listen(8800, () => {
    console.log("Connected to server");
});