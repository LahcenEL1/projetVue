<template>
  <div class="cart">
    <!-- ... -->
    <div v-if="cartProducts.length">
      <div v-for="item in cartProducts" :key="item._id" class="cart-item">
        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <p>Quantité : {{ item.quantity }}</p>
          <p>Prix unitaire : {{ item.price }} €</p>
          <button @click="removeFromCart(item._id)">Supprimer</button>
        </div>
        <img :src="item.image" alt="Image du produit" class="product-image" />
      </div>
      <h2>Total : {{ totalPrice }} €</h2>
      <button @click="placeOrder">Commander</button>

    </div>
    <!-- ... -->
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'CartPage',
  data() {
    return {
      cartItems: [],
      products: []
    };
  },
  computed: {
    cartProducts() {
      return this.cartItems.map(item => {
        const productDetails = this.products.find(product => product._id === item.productId);
        return {
          ...item,
          name: productDetails ? productDetails.name : 'Produit non trouvé',
          price: productDetails ? productDetails.price : 0,
          image: productDetails ? productDetails.image : ''
        };
      });
    },
    totalPrice() {
      return this.cartProducts.reduce((total, item) => total + item.quantity * item.price, 0);
    }
  },
  methods: {
    fetchCart() {
      const token = localStorage.getItem('token');
      if (!token) return;

      axios.get('http://localhost:3000/cart', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          this.cartItems = response.data.items;
        })
        .catch(error => console.error('Erreur lors de la récupération du panier:', error));
    },
    fetchProducts() {
      axios.get('http://localhost:3000/product')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => console.error('Erreur lors de la récupération des produits:', error));
    },
    removeFromCart(itemId) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vous devez être connecté pour effectuer cette action.');
        return;
      }

      axios.delete(`http://localhost:3000/cart/${itemId}`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(() => {
          alert('Produit supprimé du panier');
          this.fetchCart(); // Recharger les informations du panier
        })
        .catch(error => {
          console.error('Erreur lors de la suppression du produit du panier:', error);
          alert('Erreur lors de la suppression du produit');
        });
    },
    placeOrder() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vous devez être connecté pour passer une commande.');
        return;
      }

      const orderDetails = {
        items: this.cartItems.map(item => ({ product: item.productId, quantity: item.quantity })),
        total: this.totalPrice
      };

      axios.post('http://localhost:3000/order', orderDetails, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(() => {
          alert('Commande passée avec succès');
          this.emptyCart(); // Appeler la méthode pour vider le panier
        })
        .catch(error => {
          console.error('Erreur lors de la passation de la commande:', error);
          alert('Erreur lors de la passation de la commande');
        });
    },

    emptyCart() {
      const token = localStorage.getItem('token');
      if (!token) return;

      axios.delete('http://localhost:3000/cart', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(() => {
          this.cartItems = []; // Vider le tableau des articles du panier localement
        })
        .catch(error => {
          console.error('Erreur lors de la vidange du panier:', error);
        });
    }

  },
  created() {
    this.fetchCart();
    this.fetchProducts();
  }
};
</script>

<style scoped>
.cart {
  max-width: 600px;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #ccc;
}

.product-image {
  max-width: 100px;
  /* Ajustez selon la taille souhaitée */
  height: auto;
  margin-bottom: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.product-info {
  flex-grow: 1;
}
</style>

