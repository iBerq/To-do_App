const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  user_id: { type: String },
  title: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  tag: { type: String, default: "todo" },
  thumbnail: { type: String, default: "" },
  fileLabel: { type: String, default: "" },
  file: { type: String, default: "" },
});
todoSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("todo", todoSchema);
