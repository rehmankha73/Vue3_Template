<template>
    <div class="toast-container">
      <div v-for="toast in state" :key="toast.id" class="toast">
        {{ toast.message }}
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useToast } from '@/plugins/toast';
  
  export default defineComponent({
    setup() {
      const { state } = useToast();
      return {
        state,
      };
    },
  });
  </script>
  
  <style>
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
  .toast {
    background-color: #333;
    color: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  </style>
  