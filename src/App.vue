<script setup>
  import CommentItem from './components/CommentItem.vue';
</script>

<template>
  <main>
    <CommentItem />
    <CommentItem />
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
