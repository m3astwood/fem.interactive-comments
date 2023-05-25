<script setup>
  
</script>

<template>
  <div class="comment">
    <header>
      <div class="logo">
        <img src="../assets/images/avatars/image-amyrobson.png" alt="profile piture of amyrobson">
      </div>
      <h3 class="commenter">amyrobson</h3>
      <span class="date">1 month ago</span>
    </header>
    <div class="content">
      <p>
        Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.
      </p>
    </div>
    <div class="controls">
      <div class="vote">
        <button>+</button>
        <span class="val">0</span>
        <button>-</button>
      </div>
      <button>Reply</button>
    </div>
  </div>
</template>

<style scoped>
.comment {
  --prim-color: black;
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
</style>
