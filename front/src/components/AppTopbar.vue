<template>
  <div class="topbar">
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <!-- <router-link to="/about" class="nav-link">About</router-link> -->
      <!-- <router-link to="/menu" class="nav-link">Menu</router-link> -->
      <router-link to="/cart" class="nav-link">Cart</router-link>
      <router-link to="/myorders" class="nav-link">My Orders</router-link>
      <router-link to="/sign-in" class="nav-link">Sign In</router-link>
      <router-link to="/create-account" class="nav-link">Create Account</router-link>
      <router-link to="/create-product" class="nav-link">Create Product</router-link>
      <router-link to="/all-orders" class="nav-link">All Orders</router-link>


    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppTopbar'
};
</script>

<style scoped>
.topbar {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  text-align: center;
}

.topbar h1 {
  margin: 0;
}

.nav-link {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
