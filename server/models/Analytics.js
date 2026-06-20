const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  visits: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  resumesGenerated: { type: Number, default: 0 },
  chatsConducted: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
