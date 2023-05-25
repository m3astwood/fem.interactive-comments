import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../lib/supabase.js';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref([]);

  async function getComments() {
    try {
      const { data, error } = await supabase.from('comments').select(
        '*, user:users( * ), replies( *, replyingTo:users!replies_replyingTo_fkey( * ), user:users!replies_user_fkey( * ) ) )',
      );

      if (error) {
        throw error;
      }

      comments.value = data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
  return { getComments, comments };
});
