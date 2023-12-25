const mongoose = require('mongoose');

const nestedObjectSchema = new mongoose.Schema({
    // Define the structure of the nested object here
    field1: {
      type: String,
      required: true,
    },
    field2: {
      type: Number,
      required: true,
    },
  });
  
  const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    additionalInfo: {
      type: nestedObjectSchema,
    },
  }, { timestamps: true });
  
  const Project = mongoose.model('testing', projectSchema);
  
  module.exports = Project;
  
