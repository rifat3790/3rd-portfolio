const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  years: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['frontend', 'backend', 'shopify', 'database', 'design', 'ai', 'other'],
    required: true 
  },
  projectsUsing: [String],
  certifications: [String]
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
