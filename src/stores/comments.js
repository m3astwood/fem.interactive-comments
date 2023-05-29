import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../lib/supabase.js';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref([]);
  const loading = ref(false);

  const getAvatar = async (path) => {
    try {
      const { data, error } = await supabase
        .storage
        .from('interactive-comments')
        .createSignedUrl(path, 60);

      if (error) throw error;

      return data.signedUrl;
    } catch (err) {
      console.error(err);
    }
  };

  async function getComments() {
    try {
      loading.value = true;
      const { data, error } = await supabase.from('comments').select(
        '*, user:users( * ), replies( *, replyingTo:users!replies_replyingTo_fkey( * ), user:users!replies_user_fkey( * ) ) )',
      );

      if (error) {
        throw error;
      }

      await Promise.all(data.map(async (comment) => {
        comment.user.avatar = await getAvatar(comment.user.avatar);

        if (comment.replies.length > 0) {
          await Promise.all(
            comment.replies.map(async (reply) =>
              reply.user.avatar = await getAvatar(reply.user.avatar)
            ),
          );
        }
      }));

      comments.value = data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      loading.value = false;
    }
  }
  return { getComments, comments, loading };
});
