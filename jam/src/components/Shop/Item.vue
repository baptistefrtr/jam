<template>

  <b-row style="padding-left: 5%; padding-top: 2%; padding-bottom: 2%">
    <b-col class="text-left">
      <b-row>
        <h3 class="text">{{ this.item }}</h3>
      </b-row>
      <b-row v-if="price" class="text">
        Price {{ Intl.NumberFormat().format(Math.trunc(this.price)) }}
      </b-row>
    </b-col>
    <b-col v-if="this.nbItem">
      <b-row class="text">Amount {{ Intl.NumberFormat().format(this.nbItem) }}</b-row>
      <b-row class="text">
        {{ Intl.NumberFormat().format(this.remuneration) }} Time per second
      </b-row>
    </b-col>

  </b-row>
</template>

<script>
export default {
  props: ["item", "nbItem", "price", "remuneration"],
  name: "Item"
};
</script>

<style scoped>
.text {
  color: white;
}



</style>
