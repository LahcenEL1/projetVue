const express = require('express');
const Cart = require('../models/Cart'); // Importation du modèle Cart
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');

// Ajouter un article au panier
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log("AVNAT")

    const userId = req.user.id; // Supposant que le middleware d'authentification ajoute l'id utilisateur à req.user
    console.log("userId", userId)
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    cart.items.push(req.body); // Ajouter l'article au panier
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer le panier d'un utilisateur
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Supprimer un article du panier
router.delete('/:itemId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart.items = cart.items.filter(item => item._id.toString() !== itemId);
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Supprimer tous les articles du panier
router.delete('/', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
      let cart = await Cart.findOne({ user: userId });
  
      if (cart) {
        cart.items = []; // Vider la liste des articles
        await cart.save();
      }
  
      res.json({ message: 'Panier vidé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;
