<template>
  <div class="user-form">
    <h1>User Form</h1>
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
      <button type="submit">Submit</button>
    </form>
    <div v-if="submitted">
      <h2>Form Submitted</h2>
      <p><strong>Name:</strong> {{ form.name }}</p>
      <p><strong>Email:</strong> {{ form.email }}</p>
      <p><strong>Age:</strong> {{ form.age }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface UserForm {
  name: string
  email: string
  age: number | null
}

const form = ref<UserForm>({
  name: '',
  email: '',
  age: null
})

const submitted = ref(false)

const handleSubmit = () => {
  submitted.value = true
  console.log('Form Submitted:', form.value)
}
</script>

<style scoped>
.user-form {
  padding: 20px;
}

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
