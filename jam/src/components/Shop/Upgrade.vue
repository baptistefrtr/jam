<template>
  <div @click="buy">
    <b-img :id="`popover-${index}`" left :src="this.img" width="90" height="90" style="margin-left: 10px"></b-img>
    <b-popover :target="`popover-${index}`" triggers="hover" placement="top" :title="`${this.item + ' ' + this.level} upgrade`">
      {{ this.item }} efficiency is multiplied by <b>{{ this.multiplier }}</b>
      <br>
      <b>Price</b> : {{this.price}}
    </b-popover>
  </div>
</template>

<script>
export default {
  props: ["item", "img", "price", "index", "multiplier", "level"],
  name: "Upgrade",
  methods: {
    buy() {
      this.$emit("buy", this.index);
    }
  }
};
</script>

<style scoped></style>
