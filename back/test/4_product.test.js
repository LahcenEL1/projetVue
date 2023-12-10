const request = require('supertest');
const app = require('../server'); // Assurez-vous que ce chemin est correct
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Importez le modèle Product

let token; // Variable pour stocker le jeton JWT
let productId; // Variable pour stocker l'ID du produit

describe('Gestion des produits', function () {
    before(async function () {
        // Connectez-vous à la base de données de test
        await mongoose.connect('mongodb+srv://efrei:efrei@cluster0.ei6pprv.mongodb.net/?retryWrites=true&w=majority');

        // Se connecter en tant qu'administrateur et obtenir un jeton JWT
        const adminLoginResponse = await request(app)
            .post('/user/login')
            .send({ email: 'admin@example.com', password: 'adminPassword' }); // Remplacez par les vraies informations de l'admin

        token = adminLoginResponse.body.token;
    });

    after(async function () {
        // Fermez la connexion à la base de données après les tests
        await mongoose.disconnect();
    });

    // Test pour ajouter un produit
    it('devrait ajouter un nouveau produit', function (done) {
        request(app)
            .post('/product')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'KUNG PAO CHICKEN NOODLES', description: 'This Kung Pao Chicken Noodle Stir-Fry recipe is quick and easy to make, totally easy to customize (with your favorite noodles, veggies, protein…you name it), and tossed with the most delicious kung pao peanut sauce.', image:'https://www.saltandlavender.com/wp-content/uploads/2020/04/tomato-goat-cheese-pasta-2.jpg', price: 10.99, inStock: true })
            .expect(201)
            .end(function (err, res) {
                expect(res.body).to.have.property('_id');
                productId = res.body._id; // Sauvegardez l'ID pour une utilisation ultérieure
                done();
            });
    });

    // Test pour récupérer tous les produits
    it('devrait récupérer tous les produits', function (done) {
        request(app)
            .get('/product')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.be.an('array');
                done();
            });
    });

    // Test pour mettre à jour un produit
    it('devrait mettre à jour le produit', function (done) {
        request(app)
            .put(`/product/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Pasta', description: 'Updated Description', price: 12.99, inStock: false })
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property('name', 'Pasta');
                done();
            });
    });

    // Test pour supprimer un produit
    it('devrait supprimer le produit', function (done) {
        request(app)
            .delete(`/product/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property('message', 'Produit supprimé');
                done();
            });
    });
});
