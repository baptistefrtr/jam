<template>
  <b-container>
    <h1>Store</h1>
    <b-row>
      <b-col cols="6" v-if="this.userData" >
        <b-list-group   style="height: 80vh; overflow-y: scroll; overflow-x: hidden">
          <b-list-group-item style="padding: 0; border: 0;" v-for="(value, idx) in this.userData.items" :key="idx" @click="onClick(idx)">
            <b-button
                squared
                block
                variant="outline-secondary"
            >
              <Item v-if="value.name === 'Flint'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
              ></Item>
              <Item v-if="value.name === 'Fire'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
              ></Item>
              <Item v-if="value.name === 'Bow'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
              ></Item>
              <Item v-if="value.name === 'Wheel'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
              ></Item>
              <Item v-if="value.name === 'Writing'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
              ></Item>
              <Item v-if="value.name === 'Town'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
              ></Item>
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="6">
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Item from "@/components/Shop/Item";

export default {
  components: {
    Item
  },
  name: "Shop",
  props: ["userData"],
  methods: {
    onClick(value) {
      this.$emit("buy", value);
      //   this.userData.past[value]
      console.log(value);
    }
  },
  mounted() {
    console.log(this.userData);
  }
};
</script>

<style scoped></style>
