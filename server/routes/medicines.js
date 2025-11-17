const express = require('express');
const Medicine = require('../models/Medicine');
const router = express.Router();

// GET all medicines
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET medicine by ID
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ id: req.params.id });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create medicine (admin)
router.post('/', async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update medicine (admin)
router.put('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE medicine (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Medicine.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Medicine deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
