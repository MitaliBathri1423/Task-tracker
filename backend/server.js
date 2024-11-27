const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const taskRoutes = require("./Routes/taskRoutes");
const { getTask, createTask, updateTask, deleteTask} = require('./Controllers/taskControllers');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/task', taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Tracker API is running...");
});

const connectToDatabase = async () => {
  
  await mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4');
  console.log('Connected to the database');
};

connectToDatabase();


const port = process.env.port || 5000
app.listen(port, () => {
  console.log(`server is listening on the ${port}`);
})