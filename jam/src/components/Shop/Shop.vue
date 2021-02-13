<template>
  <b-container v-if="this.userData">
    <h1>Store</h1>
    <b-row>
      <b-col cols="6">
        <b-list-group style="height: 80vh; overflow-y: scroll; overflow-x: hidden">
          <b-list-group-item style="padding: 0; border: 0;" v-for="(value, idx) in this.userData.items" :key="idx" >
            <b-button
                squared
                block
                variant="outline-secondary"
                @click="buyItem(idx)"
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
        <b-list-group style="height: 80vh; overflow-y: scroll; overflow-x: hidden">
          <b-list-group-item style="padding: 0; border: 0;" v-for="(value, idx) in this.userData.items" :key="idx"
          >
            <Upgrade v-if="value.name === 'Flint' && value.upgrades[0].locked" :item=" value.name + ' 1'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[0].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-else-if="value.name === 'Flint' && !value.upgrades[0].locked && value.upgrades[1].locked"
                  :item=" value.name + ' 2'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[1].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade
                v-else-if="value.name === 'Flint' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[1].locked"
                :item="value.name + ' 3'"
                :img="require('@/assets/past/fire.png')"
                :price="value.upgrades[2].price"
                :index="idx"
                @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-if="value.name === 'Fire' && value.upgrades[0].locked" :item=" value.name + ' 1'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[0].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-else-if="value.name === 'Fire' && !value.upgrades[0].locked && value.upgrades[1].locked"
                  :item=" value.name + ' 2'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[1].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade
                v-else-if="value.name === 'Fire' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                :item="value.name + ' 3'"
                :img="require('@/assets/past/fire.png')"
                :price="value.upgrades[2].price"
                :index="idx"
                @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-if="value.name === 'Bow' && value.upgrades[0].locked"
                  :item=" value.name + ' 1'"
                  :img="require('@/assets/past/fire.png')"
                  :index="idx"
                  :price="value.upgrades[0].price"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-else-if="value.name === 'Bow' && !value.upgrades[0].locked && value.upgrades[1].locked"
                  :item=" value.name + ' 2'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[1].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade
                v-else-if="value.name === 'Bow' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                :item="value.name + ' 3'"
                :img="require('@/assets/past/fire.png')"
                :price="value.upgrades[2].price"
                :index="idx"
                @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-if="value.name === 'Wheel' && value.upgrades[0].locked"
                  :item=" value.name + ' 1'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[0].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-else-if="value.name === 'Wheel' && !value.upgrades[0].locked && value.upgrades[1].locked"
                  :item=" value.name + ' 2'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[1].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade
                v-else-if="value.name === 'Wheel' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                :item="value.name + ' 3'"
                :img="require('@/assets/past/fire.png')"
                :price="value.upgrades[2].price"
                :index="idx"
                @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-if="value.name === 'Writing' && value.upgrades[0].locked"
                  :item=" value.name + ' 1'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[0].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-else-if="value.name === 'Writing' && !value.upgrades[0].locked && value.upgrades[1].locked"
                  :item=" value.name + ' 2'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[1].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade
                v-else-if="value.name === 'Writing' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                :item="value.name + ' 3'"
                :img="require('@/assets/past/fire.png')"
                :price="value.upgrades[2].price"
                :index="idx"
                @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-if="value.name === 'Town' && value.upgrades[0].locked"
                  :item=" value.name + ' 1'"
                  :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[0].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade v-else-if="value.name === 'Town' && !value.upgrades[0].locked && value.upgrades[1].locked"
                  :item=" value.name + ' 2'" :img="require('@/assets/past/fire.png')"
                  :price="value.upgrades[1].price"
                  :index="idx"
                  @buy="buyUpgrade"
            ></Upgrade>
            <Upgrade
                v-else-if="value.name === 'Town' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                :item="value.name + ' 3'"
                :img="require('@/assets/past/fire.png')"
                :price="value.upgrades[2].price"
                :index="idx"
                @buy="buyUpgrade"
            ></Upgrade>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Item from "@/components/Shop/Item";
import Upgrade from "@/components/Shop/Upgrade";

export default {
  components: {
    Item,
    Upgrade
  },
  name: "Shop",
  props: ["userData"],
  data() {
    return {
      upgrades: null
    }
  },
  methods: {
    buyItem(value) {
      this.$emit("buyItem", value);
      //   this.userData.past[value]
      console.log(value);
    },
    buyUpgrade(value) {
      console.log("LA");

      this.$emit("buyUpgrade", value);
    }
  },
  mounted() {
    console.log(this.userData);
  }
};
</script>

<style scoped></style>
