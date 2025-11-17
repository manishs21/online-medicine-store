const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  category: String,
  brand: String,
  price: Number,
  originalPrice: Number,
  image: String,
  rating: Number,
  reviews: Number,
  stock: Number,
  description: String,
  composition: String,
  manufacturer: String,
  usage: String,
  sideEffects: String,
  discount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medicine', medicineSchema);
