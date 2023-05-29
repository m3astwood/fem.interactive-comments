<script setup>
  const props = defineProps({
    icon: String
  });
</script>

<template>
  <button>
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
    color: var(--color);
    gap: 0.5em;
    border: var(--color) solid 1px;
    border-radius: 0.5em;
    padding:0.75em 1em ;
    background: none;
    cursor: pointer;
  }
  
</style>
