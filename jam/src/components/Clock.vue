<template>
  <div>
      <a v-on:click="$emit('increment')" ><img class="thumbnail" src="../assets/clock.png" width="40%" /></a>
        <br><br><br>
  </div>
</template>

<script>
export default {
    data() {
        return {
            counter: 0,
            show: true,
        }
  },
  methods: {
    // Define the method that emits data to the parent as the first parameter to `$emit()`.
    // This is referenced in the <template> call in the parent. The second parameter is the payload.
    emitToParent (event) {
      this.$emit('childToParent', this.counter)
      event.childMessage;
    }
  }
}
</script>

<style scoped>
.thumbnail:hover {
  width: 41%;
}
</style>