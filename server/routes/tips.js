const express = require("express");
const router = express.Router();
const Tip = require("../models/Tip");

// GET all tips with search + pagination
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const tips = await Tip.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Tip.countDocuments(query);

    res.json({ data: tips, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new tip
router.post("/", async (req, res) => {
  try {
    const tip = new Tip(req.body);
    await tip.save();
    res.status(201).json(tip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update tip
router.put("/:id", async (req, res) => {
  try {
    const tip = await Tip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE tip
router.delete("/:id", async (req, res) => {
  try {
    await Tip.findByIdAndDelete(req.params.id);
    res.json({ message: "Tip deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
