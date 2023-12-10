<template>
    <div class="sign-in">
      <h1 v-if="!isUserLoggedIn">Connexion</h1>
      <form v-if="!isUserLoggedIn" @submit.prevent="login">
        <input v-model="user.email" type="email" placeholder="Email" />
        <input v-model="user.password" type="password" placeholder="Mot de passe" />
        <button type="submit">Connexion</button>
      </form>
      <div v-else>
        <p>Vous êtes connecté.</p>
        <button @click="logout">Déconnexion</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SignIn',
    data() {
      return {
        user: {
          email: '',
          password: ''
        }
      };
    },
    computed: {
      isUserLoggedIn() {
        return !!localStorage.getItem('token');
      }
    },
    methods: {
      login() {
        axios.post('http://localhost:3000/user/login', this.user)
          .then(response => {
            localStorage.setItem('token', response.data.token);
            this.$router.push('/'); // Redirection vers la page d'accueil après la connexion
          })
          .catch(error => {
            console.error('Erreur de connexion: ', error);
            alert('Erreur lors de la connexion');
          });
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/'); // Redirection vers la page d'accueil après la déconnexion
      }
    }
  };
  </script>
  <style scoped>
  .sign-in {
    max-width: 300px;
    margin: 50px auto;
    padding: 20px;
  }
  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
  }
  </style>
  