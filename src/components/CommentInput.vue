<script setup>
  import ButtonOutline from '../components/ButtonOutline.vue';
  
  const props = defineProps({
    modelValue: String,
    replying: Object,
    user: Object
  });

  defineEmits([ 'submit', 'cancelReply', 'update:modelValue' ]);
</script>

<template>
  <div class="comment">
    <div v-show="props.replying?.name" class="replying">@{{ props.replying?.name }} <a href="#" @click.prevent="$emit('cancelReply')">x</a></div>
    <textarea rows="3" placeholder="Add a comment..." @change="$emit('update:modelValue', $event.target.value)" :value="modelValue"></textarea>
    
    <footer>
      <div class="avatar">
        <img v-if="props.user?.username" :src="props.user.avatar" :alt="`${props.user.username}'s avatar`">
      </div>
      <ButtonOutline variant="filled" @click="$emit('submit')">Send</ButtonOutline>
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

  .replying {
    margin-block-end: 0.5em;
    color: var(--highlight-color);
    font-weight: 500;
  }

  .replying > a {
    text-decoration: none;
    color: var(--secondary-color);
  }

  .avatar {
    width: 2em;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background-color: grey;
    border-radius: 100vmax;
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
