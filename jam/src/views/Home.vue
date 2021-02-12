²<template>
    <b-row>
      <b-col cols="4" class="back" style="padding-top: 20%">
        <b-row>
          <b-col cols="3"></b-col>
          <b-col cols="6">
            <h3 style="color: white; background: rgba(0, 0, 0, 0.5)">{{ counter }}</h3>
          </b-col>
          <b-col cols="3"></b-col>
        </b-row>
        <Clock
          v-on:childToParent="onChildClick"
          v-on:increment="counter++"
        ></Clock>
      </b-col>
      <b-col cols="8">
        <Shop/>
      </b-col>
    </b-row>
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
.back {
  background-image: url('https://i.pinimg.com/originals/af/54/2d/af542d89a7722b3ba7d078247d3314fe.gif');
  height: 89vh;
}
</style>
