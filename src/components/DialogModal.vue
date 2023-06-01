<script setup>
import { ref } from 'vue';
import ButtonOutline from './ButtonOutline.vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits([ 'update:modelValue' ]);

const modal = ref(null);

function closeModal() {
  emit('update:modelValue', false);
}
</script>

<template>
  <div v-show="props.modelValue" class="backdrop">
    <div class="modal" ref="modal">
      <slot name="content"></slot>
      <div class="controls">
        <slot name="controls">
          <ButtonOutline variant="filled" @click="closeModal">Cancel</ButtonOutline>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .backdrop {
    background-color: #00000050;
    position: fixed;
    display: grid;
    inset: 0;
    align-content: center;
    justify-items: center;
  }
   
  .modal {
    display: block;
    background-color: white;
    padding: 1em;
    width: min(100% - 2em, 400px);
    border-radius: 0.5em;
  }

  h3 {
    color: black;
    font-weight: 500;
    margin-block-end: 0.5em;
  }

  .controls {
    display: flex;
    gap: 1em;
  }

  * ~ .controls {
    margin-block-start: 1em;
  }

  .controls button:only-of-type {
    margin-inline-start: auto;
  }
</style>
