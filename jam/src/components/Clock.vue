<template>
  <div>
      <a v-on:click="$emit('increment')" ><img class="lol"  v-bind:class="[isActive ? 'style_prevu_kit' : 'blue']" @click="isActive = !isActive" src="../assets/clock.png" width="40%" /></a>
        <br><br><br>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: true,
            counter: 0,
            show: true,
        }
  },
  methods: {
    // Define the method that emits data to the parent as the first parameter to `$emit()`.
    // This is referenced in the <template> call in the parent. The second parameter is the payload.
    emitToParent (event) {
      this.$emit('childToParent', this.counter)
      event.childMessage;
    },
  }
}
</script>

<style scoped>

.blue
{
    display:inline-block;
    border:0;
    width:40%;
    position: relative;
    -webkit-transition: all 100ms ease-in;
    -webkit-transform: scale(1); 
    -ms-transition: all 100ms ease-in;
    -ms-transform: scale(1); 
    -moz-transition: all 100ms ease-in;
    -moz-transform: scale(1);
    transition: all 100ms ease-in;
    transform: scale(1);

}
.blue:hover
{
    z-index: 2;
    -webkit-transition: all 100ms ease-in;
    -webkit-transform: scale(1.5);
    -ms-transition: all 100ms ease-in;
    -ms-transform: scale(1.5);   
    -moz-transition: all 100ms ease-in;
    -moz-transform: scale(1.5);
    transition: all 100ms ease-in;
    transform: scale(1.05);
}

.style_prevu_kit
{
    display:inline-block;
    border:0;
    width:40%;
    position: relative;
    -webkit-transition: all 100ms ease-in;
    -webkit-transform: scale(1); 
    -ms-transition: all 100ms ease-in;
    -ms-transform: scale(1); 
    -moz-transition: all 100ms ease-in;
    -moz-transform: scale(1);
    transition: all 100ms ease-in;
    transform: scale(1);   

}
.style_prevu_kit:hover
{
    z-index: 2;
    -webkit-transition: all 100ms ease-in;
    -webkit-transform: scale(1.5);
    -ms-transition: all 100ms ease-in;
    -ms-transform: scale(1.5);   
    -moz-transition: all 100ms ease-in;
    -moz-transform: scale(1.5);
    transition: all 100ms ease-in;
    transform: scale(1.05);
}
</style>