<template>
  <b-row>
    <b-col md="auto">
      <b-img left :src="this.img" width="90" height="90"></b-img>
    </b-col>
    <b-col class="text-left">
      <h3>{{ this.item }}</h3>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ["item", "img", "basePrice", "nbItem"],
  name: "Item"
}
</script>

<style scoped>

</style>