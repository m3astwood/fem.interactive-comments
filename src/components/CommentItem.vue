<script setup>
  import { useSlots } from 'vue';
  import VoteTool from './VoteTool.vue';
  import ButtonText from './ButtonText.vue';
  import ReplyIcon from '../assets/images/icon-reply.svg';
  import DeleteIcon from '../assets/images/icon-delete.svg';
  import EditIcon from '../assets/images/icon-edit.svg';

  import TA from '../lib/timeFormat.js';

  const props = defineProps({
    isYou: { type: Boolean, default: false },
    comment: Object 
  });

  const slots = useSlots();
  const emit = defineEmits([ 'vote', 'delete', 'edit', 'reply' ]);

  function vote(data) {
    emit('vote', { vote: data, isReply: !!props.comment.replyTo, comment: props.comment });
  }

  function reply() {
    emit('reply', { id: props.comment.id, isReply: !!props.comment.replyTo, name: props.comment.user.username });
  }

  function remove() {
    emit('delete', props.comment.id);
  }

  function edit() {
    console.log('click edit');
    emit('edit', {});
  }
</script>

<template>
  <div class="comment">
    <header>
      <div class="avatar">
        <img :src="props.comment.user.avatar" :alt="`profile piture of ${comment.user.username}`">
      </div>
      <h3 class="commenter">
        {{ props.comment.user.username }}
      </h3>
      <span v-if="isYou" class="you">you</span>
      <span class="date">
        {{ TA(props.comment.created_at) }}
      </span>
    </header>
    <div class="content">
      <span v-if="props.comment.replyTo" class="replyTo">
        {{ props.comment.replyTo.username }}
      </span>
      {{ props.comment.content }}
    </div>
    <div class="controls">
      <VoteTool @vote="vote" :score="props.comment.score" style="margin-inline-end: auto;"/>
      <ButtonText v-show="!isYou" @click="reply" :icon="ReplyIcon">Reply</ButtonText>
      <ButtonText v-show="isYou" @click="remove" :icon="DeleteIcon" style="--color: red;">Delete</ButtonText>
      <ButtonText v-show="isYou" @click="edit" :icon="EditIcon">Edit</ButtonText>

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
  gap: 0.5em;
  margin-block-end: 1em;
}

.commenter {
  font-size: 1em;
  font-weight: 500;
  color: var(--prim-color);
  margin-inline-start: 0.25em;
}

.you {
  background-color: var(--highlight-color);
  color: white;
  padding-inline: 0.5em;
  padding-block: 0.125em 0.25em;
  border-radius: 0.25em;
  font-size: 0.8em;
}

.avatar {
  width: 2em;
  border-radius: 100vmax;
  overflow: hidden;
}

.content {
  margin-block-end: 1em;
}

.controls {
  display: flex;
  gap: 0.5em;
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
