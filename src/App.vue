<script setup>
  import { useCommentsStore } from './stores/comments.js';
  import CommentItem from './components/CommentItem.vue';

  const store = useCommentsStore();

  store.getComments();
</script>

<template>
  <main v-if="store.loading">Loading...</main>
  <main v-else>
    <CommentItem 
      v-for="comment in store.commentsScoreOrder" 
      :key="comment.id" 
      :comment="comment"
      @vote="store.updateVote"
    >

      <template v-if="comment.replies.length > 0" v-slot:replies>
        <CommentItem 
          v-for="reply in comment.replies" 
          :key="reply.id" 
          :comment="reply"
        />
      </template>
    </CommentItem>
  </main>
</template>

<style scoped>
main { 
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1em;
  padding: 1em;
}
</style>
