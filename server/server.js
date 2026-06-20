require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Models
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB Connection
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI is not defined in .env file");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log('✅ Successfully connected to MongoDB via Mongoose!'))
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('Portfolio Backend is running with Mongoose!');
});

// PROJECTS API
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ id: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SKILLS API
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ level: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/skills', async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const Analytics = require('./models/Analytics');

// ...

// ANALYTICS API
app.get('/api/analytics', async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = new Analytics({ visits: 44, downloads: 7, resumesGenerated: 3, chatsConducted: 12 });
      await analytics.save();
    }
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/analytics/increment', async (req, res) => {
  try {
    const { field } = req.body;
    const allowedFields = ['visits', 'downloads', 'resumesGenerated', 'chatsConducted'];
    
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: 'Invalid field' });
    }

    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = new Analytics({ visits: 44, downloads: 7, resumesGenerated: 3, chatsConducted: 12 });
    }
    
    analytics[field] += 1;
    await analytics.save();
    
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// INQUIRIES API (existing code below this if applicable)
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
