const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  medicines: [
    {
      medicineId: Number,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: 'pending', enum: ['pending', 'shipped', 'delivered', 'cancelled'] },
  shippingAddress: String,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
