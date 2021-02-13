<template>

  <b-row>
    <b-col md="auto">
      <b-img left :src="this.img" width="90" height="90"></b-img>
    </b-col>
    <b-col class="text-left">
      <b-row>
        <h3>{{ this.item }}</h3>
      </b-row>
      <b-row v-if="price">
        Price {{ Intl.NumberFormat().format(this.price) }}
      </b-row>
    </b-col>
    <b-col v-if="this.nbItem">
      Amount {{ Intl.NumberFormat().format(this.nbItem) }}
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ["item", "img", "nbItem", "price"],
  name: "Item"
};
</script>

<style scoped></style>
