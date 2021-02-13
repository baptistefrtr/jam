<template>
  <b-button
      squared
      block
      variant="outline-secondary"
      @click="buy()"
  >
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
    </b-row>
  </b-button>
</template>

<script>
export default {
  props: ["item", "img", "price", "index"],
  name: "Upgrade",
  methods: {
    buy() {
      console.log("ICI");
      this.$emit("buy", this.index);
    }
  }
};
</script>

<style scoped></style>
