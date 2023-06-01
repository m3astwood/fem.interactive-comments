<script setup>
  import { useSlots } from 'vue';
  import VoteTool from './VoteTool.vue';
  import ButtonText from './ButtonText.vue';
  import ReplyIcon from '../assets/images/icon-reply.svg';

  const props = defineProps({
    comment: { type: Object }
  });

  const slots = useSlots();

  function test() {
    console.log('click reply');
  }
</script>

<template>
  <div class="comment">
    <header>
      <div class="logo">
        <img :src="props.comment.user.avatar" :alt="`profile piture of ${comment.user.username}`">
      </div>
      <h3 class="commenter">
        {{ props.comment.user.username }}
      </h3>
      <span class="date">
        {{ props.comment.created_at }}
      </span>
    </header>
    <div class="content">
      <span v-if="props.comment.replyTo" class="replyTo">
        {{ props.comment.replyTo }}
      </span>
      {{ props.comment.content }}
    </div>
    <div class="controls">
      <VoteTool @vote="(val) => $emit('vote', { vote: val, comment })" :score="props.comment.score" />
      <ButtonText @click="test" :icon="ReplyIcon">Reply</ButtonText>
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
