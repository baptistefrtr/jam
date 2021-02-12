<template>
  <b-container>
    <h1>Store</h1>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item >
            <b-row>
              <b-col md="auto">
                <b-img left :src="require('../../assets/coca.png')" width="90" height="90"></b-img>
              </b-col>
              <b-col class="text-left">
               <h3>Coca</h3>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col>

      </b-col>

    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Shop"
}
</script>

<style scoped>

</style>