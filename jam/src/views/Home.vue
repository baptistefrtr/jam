<template>
  <div class="home">
    <div class="row">
      <div class="col-4">
        <Clock
          :parentData="myData"
          v-on:childToParent="onChildClick"
          v-on:increment="counter++"
        ></Clock>
        <p>{{ counter }}</p>
      </div>
      <div class="col-8"></div>
    </div>
  </div>
</template>

<script>
import Clock from "../components/Clock.vue";

export default {
  components: { Clock },
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
