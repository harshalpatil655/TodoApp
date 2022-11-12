const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    status: { type: String, default: "Pending" },
    task: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = { TodoModel };
