const express = require('express');
const Order = require('../models/Order'); // Importation du modèle Order
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');

// Créer une nouvelle commande
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user.id, // Supposant que le middleware d'authentification ajoute l'id utilisateur à req.user
      items: req.body.items,
      total: req.body.total
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer les commandes d'un utilisateur
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour obtenir toutes les commandes (Administrateurs uniquement)
router.get('/all', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
      const orders = await Order.find().populate('items.product');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;
