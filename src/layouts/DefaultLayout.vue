<template>
  <div class="container">
    <header class="header">
      <h1>My Ecommerce App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/users">Users</router-link>
      </nav>
    </header>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <p>&copy; 2023 My Vue App</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  height: 100vh;
  position: relative;
}

.header {
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

.main-content {
  padding: 20px;
  margin-top: 60px; /* adjust based on header height */
  margin-bottom: 40px; /* adjust based on footer height */
}

.footer {
  background-color: #333;
  color: white;
  text-align: center;
  position: absolute;
  padding: 10px;
  width: 100%;
  bottom: 0;
}
</style>
