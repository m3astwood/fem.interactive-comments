import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../lib/supabase.js';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref([]);
  const commentsScoreOrder = computed(() =>
    comments.value.sort((a, b) => parseInt(b.score) - parseInt(a.score))
  );
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

  const updateVote = async (event) => {
    try {
      console.log(event);
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

  return { getComments, comments, loading, updateVote, commentsScoreOrder };
});
