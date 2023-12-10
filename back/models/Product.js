const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  }
  // Vous pouvez ajouter d'autres champs selon vos besoins, comme les catégories, les images, etc.
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
