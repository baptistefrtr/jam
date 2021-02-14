<template>

  <b-row style="padding-left: 5%; padding-top: 2%; padding-bottom: 2%">
    <b-col class="text-left">
      <b-row>
        <h3>{{ this.item }}</h3>
      </b-row>
      <b-row v-if="price">
        Price {{ Intl.NumberFormat().format(Math.trunc(this.price)) }}
      </b-row>
    </b-col>
    <b-col v-if="this.nbItem">
      Amount {{ Intl.NumberFormat().format(this.nbItem) }}
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ["item", "nbItem", "price"],
  name: "Item"
};
</script>

<style scoped></style>
