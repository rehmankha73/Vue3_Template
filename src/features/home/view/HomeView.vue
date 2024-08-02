<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mx-auto" color="primary" dark>
          <v-card-title>Welcome to Our Application!</v-card-title>
          <v-card-text>
            We are glad to have you here. Enjoy exploring our application.
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" to="/">Home</v-btn>
            <v-btn color="secondary" to="/users">User</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
