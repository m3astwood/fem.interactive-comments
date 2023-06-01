import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../lib/supabase.js';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref([]);
  const commentsScoreOrder = computed(() => {
    return comments.value.sort((a, b) => parseInt(b.score) - parseInt(a.score));
  });
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

  const getComments = async () => {
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
  };

  const updateVote = async (data) => {
    console.log(data);
    const { vote, comment } = data;
    try {
      console.log('from store : ' + vote);
      const { data, error } = await supabase
        .from('comments')
        .update({ score: comment.score + vote })
        .eq('id', comment.id)
        .select()
        .single();

      if (error) throw error;

      const arrayIndex = comments.value.findIndex((comment) =>
        comment.id == data.id
      );

      comments.value[arrayIndex].score = data.score;
    } catch (err) {
      console.error(err);
    }
  };

  return { getComments, comments, loading, updateVote, commentsScoreOrder };
});
