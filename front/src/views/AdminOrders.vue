<template>
    <div class="admin-orders">
        <!-- ... -->
        <div v-if="orders.length">
            <div v-for="order in orders" :key="order._id" class="order">
                <!-- ... -->
                <ul>
                    <li v-for="item in order.items" :key="item._id">
                        {{ item.product ? `${item.product.name} - Quantité: ${item.quantity} - Prix: ${item.product.price}
                        €` : 'Produit non disponible' }}
                    </li>
                </ul>
                <!-- ... -->
            </div>
        </div>
        <!-- ... -->
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'AdminOrders',
    data() {
        return {
            orders: []
        };
    },
    created() {
        const token = localStorage.getItem('token');
        if (this.isAdmin()) {
            axios.get('http://localhost:3000/order/all', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    console.log(response.data); // Afficher les données dans la console
                    this.orders = response.data;
                })
                .catch(error => console.error('Erreur lors de la récupération des commandes admin:', error));
        } else {
            console.log('Accès non autorisé.');
        }
    },

    methods: {
        isAdmin() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const base64Url = token.split('.')[1]; // Récupère la partie payload du token
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const payload = JSON.parse(atob(base64));
                    return payload.isAdmin;
                } catch (error) {
                    console.error('Erreur lors du décodage du token:', error);
                }
            }
            return false;
        }


    }
};
</script>

<style scoped>
.admin-orders {
    max-width: 800px;
    margin: 20px auto;
    padding: 10px;
}

.order {
    border: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 10px;
}

ul {
    list-style-type: none;
    padding: 0;
}
</style>
  