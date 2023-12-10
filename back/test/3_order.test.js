const request = require('supertest');
const app = require('../server'); // Assurez-vous que ce chemin est correct
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Order = require('../models/Order'); // Importez le modèle Order

let tokenClient; // Variable pour stocker le jeton JWT
let productId='6575b9243b03b52d446980d1'; // Variable pour stocker l'ID du produit

describe('Gestion des commandes', function () {
    before(async function () {
        // Connectez-vous à la base de données de test
        await mongoose.connect('mongodb+srv://efrei:efrei@cluster0.ei6pprv.mongodb.net/?retryWrites=true&w=majority');

        const clientLoginResponse = await request(app)
            .post('/user/login')
            .send({ email: 'client@example.com', password: 'clientPassword' });
        tokenClient = clientLoginResponse.body.token;
    });

    after(async function () {
        await mongoose.disconnect();
    });

    // Test pour créer une nouvelle commande
    it('devrait créer une nouvelle commande', function (done) {
        request(app)
            .post('/order')
            .set('Authorization', `Bearer ${tokenClient}`)
            .send({ items: [{ product: productId, quantity: 2 }], total: 100 }) // Remplacez avec les données réelles
            .expect(201)
            .end(function (err, res) {
                expect(res.body).to.have.property('_id');
                orderId = res.body._id; // Sauvegardez l'ID de la commande pour une utilisation ultérieure
                done();
            });
    });

    // Test pour récupérer les commandes d'un utilisateur
    it('devrait récupérer les commandes d\'un utilisateur', function (done) {
        request(app)
            .get('/order')
            .set('Authorization', `Bearer ${tokenClient}`)
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.be.an('array');
                // Assurez-vous que la commande créée précédemment est incluse
                const foundOrder = res.body.find(order => order._id === orderId);
                expect(foundOrder).to.not.be.undefined;
                done();
            });
    });

});
