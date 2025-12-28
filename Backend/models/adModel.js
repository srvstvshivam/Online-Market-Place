import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, enum: ['New', 'Like New', 'Used'], default: 'Used' },
  location: { type: String, required: true },
  imageUrls: [{ url: { type: String, required: true }, publicId: { type: String, required: true } }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Ad = mongoose.model('Ad', adSchema);
export default Ad;