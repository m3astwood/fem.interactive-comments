<script setup>
  const props = defineProps({
    score: { type: Number, default: 0 }
  });

  const emit = defineEmits([ 'vote' ]);

  function vote(val) {
    emit('vote', val);
  }
</script>

<template>
  <div class="vote">
    <button @click="vote(1)">+</button>
    <span class="val">
      {{ props.score }}
    </span>
    <button @click="vote(-1)">-</button>
  </div>
</template>

<style scoped>
.vote {
  display: grid;
  grid-auto-flow: column;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  background-color: lightgrey;
  border-radius: 0.5em;
  overflow: hidden;
  font-weight: 500;
}

span {
  padding-inline: 0.125em;
}

button {
  border: none;
  background: none;
  padding: 0.5em 0.75em;
  cursor: pointer;
  font-weight: 700;
}

button:hover {
  background-color: pink;
}

</style>
