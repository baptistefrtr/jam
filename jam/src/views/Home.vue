²<template>
  <b-container class="home">
    <b-row>
      <b-col cols="4">
        <Clock
          :parentData="myData"
          v-on:childToParent="onChildClick"
          v-on:increment="counter++"
        ></Clock>
        <p>{{ counter }}</p>
      </b-col>
      <b-col cols="8">
        <Shop/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Clock from "../components/Clock.vue";
import Shop from "../components/Shop/Shop.vue";

export default {
  components: {
    Clock,
    Shop
  },
  data() {
    return {
      fromChild: "",
      counter: 0,
    };
  },
  methods: {
    onChildClick(value) {
      this.fromChild = value;
    },
  },
};
</script>

<style scoped>
.thumbnail:hover {
  width: 41%;
}
</style>
