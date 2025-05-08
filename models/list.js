const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
    required: true,
  },
  date: { type: Date, required: false },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("List", listSchema);
