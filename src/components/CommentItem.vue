<script setup>
  import { useSlots } from 'vue';
  import VoteTool from './VoteTool.vue';

  const props = defineProps({
    score: { type: Number }
  });
  
  const slots = useSlots();
</script>

<template>
  <div class="comment">
    <header>
      <div class="logo">
        <slot name="avatar"></slot>
      </div>
      <h3 class="commenter">
        <slot name="commenter"></slot>
      </h3>
      <span class="date">
        <slot name="date"></slot>
      </span>
    </header>
    <div class="content">
      <span v-if="slots.replyTo" class="replyTo">
        <slot name="replyTo"></slot>
      </span>
      <slot name="content"></slot>
    </div>
    <div class="controls">
      <VoteTool :score="props.score" />
      <button>Reply</button>
    </div>
  </div>

  <div v-if="slots.replies" class="replies">
    <slot name="replies"></slot>
  </div>
</template>

<style scoped>
.comment, .replies {
  --prim-color: black;
  --highlight-color: blue;
  --secondary-color: lightgrey;
}

.comment {
  background-color: white;
  padding: 1em;
  border-radius: 0.5em;
}

header {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-block-end: 1em;
}

.commenter {
  font-size: 1em;
  font-weight: 500;
  color: var(--prim-color);
}

.logo {
  width: 2em;
}

.content {
  margin-block-end: 1em;
}

.controls {
  display: flex;
}

.controls > button:first-of-type {
  margin-inline-start: auto;
}

.replies {
  position: relative;
  display: grid;
  grid-auto-flow: row;
  gap: 1em;
  padding-inline-start: 1em;
}

.replies::before {
  content: '';
  display: block;
  position: absolute;
  width: 0.2em;
  background-color: var(--secondary-color);
  top: 0;
  left: 0;
  bottom: 0;
}

.replyTo {
  font-weight: 500;
  color: var(--highlight-color);
}

.replyTo::before {
  content: '@';
}

.replyTo::after {
  content: ' ';
}
</style>
