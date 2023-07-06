const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configure body-parser to parse JSON data
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define the Student schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String
});

const Student = mongoose.model('Student', studentSchema);

// Routes for CRUD operations

// Get all students
app.get('/api/students', (req, res) => {
  Student.find({}).exec()
    .then(students => {
      res.json(students);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch students', details: err });
    });
});

// Create a new student
app.post('/api/students', (req, res) => {
  const newStudent = new Student(req.body);

  newStudent.save()
    .then(student => res.json(student))
    .catch(err => res.status(500).json({ error: 'Failed to create student', details: err }));
});

// Update an existing student
app.put('/api/students/:id', (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
    .then(student => {
      res.json(student);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update student', details: err });
    });
});

// Delete a student
app.delete('/api/students/:id', (req, res) => {
  Student.findByIdAndRemove(req.params.id).exec()
    .then(student => {
      res.json(student);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete student', details: err });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});