<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="form.name" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="form.email" required />
    </div>
    <div>
      <label for="age">Age:</label>
      <input type="number" id="age" v-model="form.age" required />
    </div>
    <div>
      <v-btn color="primary" type="submit" >Submit</v-btn>
    </div>
  </form>
  <div v-if="submitted">
    <h2>Form Submitted</h2>
    <p><strong>Name:</strong> {{ form.name }}</p>
    <p><strong>Email:</strong> {{ form.email }}</p>
    <p><strong>Age:</strong> {{ form.age }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserForm } from '../interfaces/User'

const form = ref<UserForm>({
  name: '',
  email: '',
  age: null,
})

const submitted = ref(false)

const handleSubmit = () => {
  submitted.value = true
  console.log('Form Submitted:', form.value)
}
</script>

<style scoped>
.user-form form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-form label {
  font-weight: bold;
}

.user-form input {
  padding: 5px;
  font-size: 1rem;
}

.user-form button {
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
}

.user-form div {
  margin-top: 20px;
}
</style>
