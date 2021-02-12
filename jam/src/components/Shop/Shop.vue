<template>
  <b-container>
    <h1>Store</h1>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item style="padding: 0px; border: 0px">
            <b-button squared block variant="outline-secondary">
            <Item item="Colac Colac" :img="require('../../assets/coca.png')" base-price="3" nbItem=""></Item>
          </b-button>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col>

      </b-col>

    </b-row>
  </b-container>
</template>

<script>
import Item from "./Item.vue";

export default {
  components: {
    Item
  },
  name: "Shop"
}
</script>

<style scoped>

</style>