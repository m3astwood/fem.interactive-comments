import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../lib/supabase.js';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref([]);
  const commentsScoreOrder = computed(() =>
    comments.value.sort((a, b) => parseInt(b.score) - parseInt(a.score))
  );
  const loading = ref(false);

  const getComments = async () => {
    try {
      loading.value = true;
      const { data, error } = await supabase.from('comments').select(
        '*, user:users( * ), replies( *, replyTo:users!replies_replyTo_id_fkey( * ), user:users!replies_user_id_fkey( * ) ) )',
      );

      if (error) {
        throw error;
      }

      comments.value = data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      loading.value = false;
    }
  };

  const updateSingle = async (id, isReply = false) => {
    try {
      const table = isReply ? 'replies' : 'comments';
      // get updated comment and reply
      const { data, error } = await supabase
        .from(table)
        .select()
        .eq('id', id)
        .single();

      if (error) throw error;

      // if not a reply
      if (!isReply) {
        // find index of comment
        const commentIdx = comments.value.findIndex((comment) =>
          comment.id == data.id
        );

        // update comment score
        comments.value[commentIdx].score = data.score;
      } else {
        // find index of parent comment
        const commentIdx = comments.value.findIndex((comment) =>
          comment.id == data.comment_id
        );

        // find index of reply
        const replyIdx = comments.value[commentIdx].replies.findIndex((reply) =>
          reply.id == data.id
        );

        // update reply score
        comments.value[commentIdx].replies[replyIdx].score = data.score;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitComment = async (comment) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          content: comment.text,
          user_id: comment.user.id,
        })
        .select('*, user:user_id(*)')
        .single();

      if (error) throw error;

      comments.value = [...comments.value, data];
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  const deleteComment = async (id) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const idx = comments.value.findIndex((comment) => comment.id == id);

      comments.value.splice(idx, 1);
    } catch (err) {
      console.error(err);
    }
  };

  const updateVote = async (event) => {
    try {
      const { vote, isReply, comment } = event;

      const table = isReply ? 'replies' : 'comments';
      const { error } = await supabase
        .from(table)
        .update({ score: comment.score + vote })
        .eq('id', comment.id);

      if (error) throw error;

      updateSingle(comment.id, isReply);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getComments,
    comments,
    loading,
    updateVote,
    commentsScoreOrder,
    submitComment,
    deleteComment,
  };
});
