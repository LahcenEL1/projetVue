const request = require('supertest');
const app = require('../server'); // Assurez-vous que ce chemin est correct
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Importez le modèle Product

let tokenAdmin; // Variable pour stocker le jeton JWT
let tokenClient; // Variable pour stocker le jeton JWT

let productId='65760f01ea5479530492f7d9'; // Variable pour stocker l'ID du produit

describe('Gestion des produits', function () {
    before(async function () {
        // Connectez-vous à la base de données de test
        await mongoose.connect('mongodb+srv://efrei:efrei@cluster0.ei6pprv.mongodb.net/?retryWrites=true&w=majority');


        const clientLoginResponse = await request(app)
            .post('/user/login')
            .send({ email: 'client@example.com', password: 'clientPassword' }); // Remplacez par les vraies informations de l'admin


        tokenClient = clientLoginResponse.body.token;

    });

    after(async function () {
        // Fermez la connexion à la base de données après les tests
        await mongoose.disconnect();
    });


    // Test pour ajouter un article au panier
    it('devrait ajouter un article au panier', function (done) {
        request(app)
            .post('/cart')
            .set('Authorization', `Bearer ${tokenClient}`)
            .send({ productId: productId, quantity: 2 }) // Remplacez par les données appropriées
            .expect(201)
            .end(function (err, res) {
                expect(res.body).to.have.property('_id');
                cartId = res.body._id; // Sauvegardez l'ID du panier pour une utilisation ultérieure
                done();
            });
    });

    // Test pour récupérer le panier d'un utilisateur
    it('devrait récupérer le panier d\'un utilisateur', function (done) {
        request(app)
            .get('/cart')
            .set('Authorization', `Bearer ${tokenClient}`)
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property('_id', cartId); // Assurez-vous que le panier récupéré est le même que celui ajouté
                done();
            });
    });
    // Test pour supprimer un article du panier
    it('devrait supprimer un article du panier', function (done) {
        request(app)
            .delete(`/cart/${cartId}`)
            .set('Authorization', `Bearer ${tokenClient}`)
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property('_id', cartId); // Assurez-vous que le panier supprimé est le même que celui ajouté
                done();
            });
    });
});