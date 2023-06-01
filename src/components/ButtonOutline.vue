<script setup>
  const props = defineProps({
    icon: String,
    variant: String,
  });
</script>

<template>
  <button :data-variant="props.variant">
    <img v-if="props.icon" :src="props.icon" alt="">
    <slot></slot>
  </button>
</template>

<style scoped>
  button {
    --color: blue;
    display: flex;
    align-items: center;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--color);
    gap: 0.5em;
    border: var(--color) solid 1px;
    border-radius: 0.5em;
    padding:0.75em 1.75em ;
    background: none;
    cursor: pointer;
  }
  
  button[data-variant="filled"] {
    color: white;
    background-color: var(--color);
  }
</style>
