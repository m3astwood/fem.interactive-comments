import { ref } from 'vue';
import { defineStore } from 'pinia';
// import supabase from '../lib/supabase.js';

export const useUserStore = defineStore('user', () => {
  const user = ref({});
  return { user };
});
