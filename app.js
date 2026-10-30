const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware to read JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });



// Student routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);

// Start server
app.listen(3000,()=>{
 console.log('Server running at http://localhost:3000');
 });














