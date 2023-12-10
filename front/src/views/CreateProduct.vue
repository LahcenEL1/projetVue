<template>
    <div class="create-product">
        <h1>Ajouter un Nouveau Produit</h1>
        <form @submit.prevent="submitProduct">
            <input v-model="product.name" type="text" placeholder="Nom du produit" />
            <input v-model="product.description" type="text" placeholder="Description" />
            <input v-model="product.price" type="number" placeholder="Prix" />
            <input v-model="product.image" type="text" placeholder="URL de l'image" />
            <button type="submit">Ajouter le Produit</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'CreateProduct',
    data() {
    return {
      product: {
        name: '',
        description: '',
        price: 0,
        image: ''  
      }
    };
  },
  methods: {
    submitProduct() {
      // Vérification des droits d'administration
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vous devez être connecté.');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      axios.post('http://localhost:3000/product', this.product, { headers })
        .then(response => {
          alert(`Produit ajouté avec succès : ${response.data.name}`);
          this.resetForm();
        })
        .catch(error => {
          console.error('Erreur: ', error);
          alert('Erreur lors de l\'ajout du produit');
        });
    },

    resetForm() {
      this.product = { name: '', description: '', price: 0, image: '' };
    }
  }
};
</script>
  
<style scoped>
.create-product {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

input[type="text"],
input[type="number"] {
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
  