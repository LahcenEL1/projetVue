<template>
    <div class="create-account">
        <h1>Créer un Compte</h1>
        <form @submit.prevent="register">
            <input v-model="user.username" type="text" placeholder="Nom d'utilisateur" required />
            <input v-model="user.email" type="email" placeholder="Email" required />
            <input v-model="user.password" type="password" placeholder="Mot de passe" required />
            <button type="submit">S'inscrire</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'CreateAccount',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        register() {
            axios.post('http://localhost:3000/user/register', this.user)
                .then(() => {
                    alert('Compte créé avec succès!');
                    this.$router.push('/'); // Redirection vers la page de connexion
                })
                .catch(error => {
                    console.error('Erreur lors de la création du compte:', error);
                    alert('Erreur lors de la création du compte');
                });
        }

    }
};
</script>

<style scoped>
.create-account {
    max-width: 400px;
    margin: 20px auto;
    padding: 10px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>

