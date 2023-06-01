<script setup>
  import { ref } from 'vue';
  import { useCommentsStore } from './stores/comments.js';
  import CommentItem from './components/CommentItem.vue';
  import CommentInput from './components/CommentInput.vue';
  import DialogModal from './components/DialogModal.vue';

  const store = useCommentsStore();

  store.getComments();

  const openModal = ref(false);

  function openLoginModal() {
    openModal.value = true;
  }
</script>

<template>
  <header>
    <a href="#" @click.prevent="openLoginModal">login</a>
  </header>
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
          @vote="store.updateVote"
        />
      </template>
    </CommentItem>

    <CommentInput />
  </main>

  <DialogModal v-model="openModal" />
</template>

<style scoped>
main { 
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1em;
  padding: 1em;
}

header {
  display: flex;
  padding-inline: 1em;
  margin-block-start: 1em;
}

header > a {
  margin-inline-start: auto;
}

header > a:visited {
  color: inherit;
}
</style>
