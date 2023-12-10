
<template>
    <div class="home">
      <h1>Welcome to FOOD TRACE</h1>
      <div class="products">
        <div v-for="product in products" :key="product._id" class="product-card">
          <img :src="product.image" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <!-- <p>{{ product.description }}</p> -->
            <p>Prix: {{ product.price }} €</p>
            <button v-if="isUserLoggedIn" @click="addToCart(product._id)">Ajouter au Panier</button>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';

export default {
    name: 'HomePage',
    data() {
        return {
            products: []
        };
    },
    computed: {
        isUserLoggedIn() {
            return !!localStorage.getItem('token');
        }
    },
    methods: {
        addToCart(productId) {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Vous devez être connecté pour ajouter des produits au panier.');
                return;
            }

            axios.post('http://localhost:3000/cart',
                { productId, quantity: 1 },
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
                .then(response => {
                    alert(`Produit ajouté au panier: ${response.data.name}`); 
                })
                .catch(error => {
                    console.error('Erreur: ', error);
                    alert('Erreur lors de l\'ajout au panier');
                });
        },
        fetchProducts() {
            axios.get('http://localhost:3000/product')
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => console.error(error));
        }
    },
    created() {
        this.fetchProducts();
    }
};
</script>
<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-card {
  width: 30%; /* Ajustez la largeur pour 3 par ligne */
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 10px;
  box-sizing: border-box;
}

.product-image {
  max-width: 200px; 
  height: auto; 
  margin-bottom: 10px;
}

.product-info h3, .product-info p {
  margin: 5px 0;
}
</style>
