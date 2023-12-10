const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const app = express();

// Connexion à la base de données
connectDB();

// Activez CORS pour toutes les routes
app.use(cors());

// Middleware pour lire le JSON des requêtes entrantes
app.use(express.json());

// Importez vos routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

// Définissez vos routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

// Route principale
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon site de commerce électronique!');
});

// Exportez l'application pour les tests
module.exports = app;

// Démarrage du serveur
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
}
