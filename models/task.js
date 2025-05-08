const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  date: { type: String, required: true },
  keywords: [{ type: String }],
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: false },
  category: { type: String, required: true },
});

taskSchema.pre("save", async function (next) {
  if (this.isModified("listId") || this.isNew) {
    const List = mongoose.model("List");
    const list = await List.findById(this.listId);
    if (list) {
      this.category = list.name;
    }
  }
  next();
});

module.exports = mongoose.model("Task", taskSchema);
