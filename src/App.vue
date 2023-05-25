<script setup>
  import { useCommentsStore } from './stores/comments.js';
  import CommentItem from './components/CommentItem.vue';

  const store = useCommentsStore();

  store.getComments();
</script>

<template>
  <main>
    <CommentItem v-for="comment in store.comments" :key="comment.id">
      <template v-slot:commenter>
        {{ comment.user.username }}
      </template>

      <template v-slot:date>{{ comment.created_at }}</template>

      <template v-slot:content>{{ comment.content }}</template>

      <template v-slot:score>{{ comment.score }}</template>

      <template v-if="comment.replies.length > 0" v-slot:replies>
        <CommentItem v-for="reply in comment.replies" :key="reply.id">
          <template v-slot:commenter>
            reply
          </template>

          <template v-slot:date>{{ reply.created_at }}</template>

          <template v-slot:replyTo>{{ reply.replyingTo.username }}</template>
          <template v-slot:content>{{ reply.content }}</template>

          <template v-slot:score>{{ reply.score }}</template>
        </CommentItem>
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
