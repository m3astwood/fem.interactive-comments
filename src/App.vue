<script setup>
  import { ref } from 'vue';
  import { useCommentsStore } from './stores/comments.js';
  import { useUserStore } from './stores/user.js';

  import CommentItem from './components/CommentItem.vue';
  import CommentInput from './components/CommentInput.vue';
  import DialogModal from './components/DialogModal.vue';
  import ButtonOutline from './components/ButtonOutline.vue';

  const commentStore = useCommentsStore();
  const userStore = useUserStore();

  userStore.getUser();
  commentStore.getComments();

  const openModal = ref(false);
  const commentText = ref('');

  function toggleLoginModal() {
    openModal.value = !openModal.value;
  }

  function login() {
    console.log('GO!');
    userStore.login();
  }

  async function submitComment() {
    try {
      const { error } = commentStore.submitComment({ 
        user: userStore.user, 
        text: commentText.value,
        reply: commentStore.replyRecipient
      }); 

      if (error) throw error;

      commentText.value = '';
    } catch (err) {
      console.error(err);
    }
  }
</script>

<template>
  <header>
    <a v-if="userStore.user?.username" href="#" @click.prevent="userStore.logout">logout {{ userStore.user.username }}</a>
    <a v-else href="#" @click.prevent="toggleLoginModal">login</a>
  </header>
  
  <main v-if="commentStore.loading">Loading...</main>

  <main v-else>
    <CommentItem 
      v-for="comment in commentStore.commentsScoreOrder" 
      :key="comment.id" 
      :comment="comment"
      :isYou="userStore.user?.id == comment.user.id"
      @vote="commentStore.updateVote"
      @delete="commentStore.deleteComment"
      @reply="commentStore.replyTo"
    >

      <template v-if="comment.replies?.length > 0" v-slot:replies>
        <CommentItem 
          v-for="reply in comment.replies" 
          :key="reply.id" 
          :comment="reply"
          :isYou="userStore.user?.id == reply.user.id"
          @vote="commentStore.updateVote"
          @delete="commentStore.deleteComment"
          @reply="commentStore.replyTo"
        />
      </template>
    </CommentItem>

    <CommentInput 
      @submit="submitComment" 
      @cancelReply="commentStore.replyRecipient = {}" 
      :replying="commentStore.replyRecipient" 
      v-model="commentText" 
      v-if="userStore.user?.username" 
      :user="userStore.user" 
    />
  </main>

  <DialogModal v-model="openModal">
    <template v-slot:content>
      <h3>Login with Github</h3>
    </template>

    <template v-slot:controls>
      <ButtonOutline variant="filled" @click="toggleLoginModal">Cancel</ButtonOutline>
      <ButtonOutline variant="filled" @click="login">Login</ButtonOutline>
    </template>
  </DialogModal>
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
