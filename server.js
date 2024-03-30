const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Replace with your actual MongoDB connection string
const mongoURI = 'http://mongodb:/localhost:27017/student_tasks';


// Connect to MongoDB (handle connection errors)
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the application on connection error
  });

// Define Task schema
const TaskSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  details: { type: String },
});

const Task = mongoose.model('Task', TaskSchema);

app.get('/', (req, res) => {
    res.send('Welcome to the Student Task Manager API!');
  });

// Route to add a task
app.post('/courses/:courseId/tasks', async (req, res) => {
  const { courseId } = req.params;
  const { name, dueDate, details } = req.body;

  try {
    // Create a new task instance with data
    const newTask = new Task({ courseId, name, dueDate, details });

    // Save the new task to the database
    const savedTask = await newTask.save();

    // Respond with success message and potentially the saved task details
    res.json({ success: true, message: 'Task added successfully!', task: savedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding task' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
