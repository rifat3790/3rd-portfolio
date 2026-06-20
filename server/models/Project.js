const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  label: String,
  value: String
});

const caseStudySchema = new mongoose.Schema({
  problem: String,
  solution: String,
  process: [String],
  result: String
});

const projectSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // To match frontend format if needed
  title: { type: String, required: true },
  subtitle: String,
  category: { 
    type: String, 
    enum: ['shopify', 'react', 'fullstack', 'ai', 'healthcare', 'other'],
    required: true 
  },
  displayCategory: String,
  image: String, // URL of the image
  tags: [String],
  metrics: [metricSchema],
  demoUrl: String,
  githubUrl: String,
  password: { type: String, select: false }, // if needed
  featured: { type: Boolean, default: false },
  date: String,
  team: String,
  caseStudy: caseStudySchema
}, { timestamps: true });

// Auto-increment logic for the id field just in case
projectSchema.pre('save', async function () {
  if (this.isNew && !this.id) {
    const lastProject = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
    if (lastProject && lastProject.id) {
      this.id = lastProject.id + 1;
    } else {
      this.id = 1;
    }
  }
});

module.exports = mongoose.model('Project', projectSchema);
