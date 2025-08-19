const mongoose = require("mongoose");

const TipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["Legal", "Finance", "Health", "Other"], required: true },
  sources: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tip", TipSchema);
