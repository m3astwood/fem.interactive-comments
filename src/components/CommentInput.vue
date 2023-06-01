<script setup>
  import ButtonOutline from '../components/ButtonOutline.vue';
  
</script>

<template>
  <div class="comment">
    <textarea rows="3" placeholder="Add a comment..."></textarea>
    
    <footer>
      <div class="avatar">
        <img src="../assets/images/avatars/image-amyrobson.png" alt="amyrobson avatar">
      </div>
      <ButtonOutline variant="filled">Send</ButtonOutline>
    </footer>
  </div>
</template>

<style scoped>
  .comment {
    --prim-color: black;
    --highlight-color: blue;
    --secondary-color: lightgrey;
  }

  .comment {
    background-color: white;
    padding: 1em;
    border-radius: 0.5em;
  }

  .avatar {
    width: 2em;
  }

  textarea {
    padding: 0.5em;
    width: 100%;
    border-radius: 0.5em;
    resize: none;
    border: thin solid lightgrey;
  }

  footer {
    display: flex;
    align-items: center;
    margin-block-start: 0.75em;
  }

  footer > button {
    margin-inline-start: auto;
  }
</style>
