<template>
    <div class="user-view">
      <h1>User Information</h1>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="user">
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Age:</strong> {{ user.age }}</p>
        </div>
        <div v-else>
          <p>No user data available.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  const fetchUser = async () => {
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      user.value = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30
      }
    } catch (err) {
      error.value = 'Failed to load user data'
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    fetchUser()
  })
  </script>
  
  <style scoped>
  .user-view {
    padding: 20px;
  }
  </style>
  