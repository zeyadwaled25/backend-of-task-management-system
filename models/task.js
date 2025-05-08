const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String , required: false },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  date: { type: String , required: false },
  keywords: [{ type: String }],
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: false },
  category: { type: String , required: true }
});

module.exports = mongoose.model('Task', taskSchema);