<template>
    <div class="my-orders">
        <h1>Mes Commandes</h1>
        <div v-if="orders.length">
            <div v-for="order in orders" :key="order._id" class="order">
                <h3>Commande ID: {{ order._id }}</h3>
                <ul>
                    <li v-for="item in order.items" :key="item._id">
                        {{ item.product.name }} - Quantité: {{ item.quantity }} - Prix: {{ item.product.price }} €
                    </li>
                </ul>
                <p>Total de la commande: {{ order.total }} €</p>
            </div>
        </div>
        <p v-else>Aucune commande passée.</p>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'MyOrders',
    data() {
        return {
            orders: []
        };
    },
    created() {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:3000/order', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    this.orders = response.data;
                })
                .catch(error => console.error('Erreur lors de la récupération des commandes:', error));
        } else {
            console.log('Aucun utilisateur connecté.');
        }
    }

};
</script>
<style scoped>
.my-orders {
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
  