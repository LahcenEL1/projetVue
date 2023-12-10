const request = require('supertest');
const app = require('../server'); // Assurez-vous que ce chemin est correct
const expect = require('chai').expect;

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomEmail() {
    return `${generateRandomString(10)}@example.com`;
}

function generateRandomUsername() {
    return `user_${generateRandomString(8)}`;
}


describe('Tests d\'authentification utilisateur', function() {
    let randomEmail, randomUsername;
  
    before(function() {
      randomEmail = `test_${Date.now()}@example.com`; // Générer une adresse email unique
      randomUsername = `user_${Date.now()}`; // Générer un nom d'utilisateur unique
    });
  
    describe('POST /user/register', function() {
      it('devrait créer un nouvel utilisateur', function(done) {
        request(app)
          .post('/user/register')
          .send({ username: randomUsername, email: randomEmail, password: 'password' })
          .end(function(err, res) {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.have.property('token');
            done();
          });
      });
    });
  
    describe('POST /user/login', function() {
      it('devrait authentifier l\'utilisateur', function(done) {
        request(app)
          .post('/user/login')
          .send({ email: randomEmail, password: 'password' })
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.property('token');
            done();
          });
      });
    });
  });