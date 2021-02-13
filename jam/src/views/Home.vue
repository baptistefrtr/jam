<template>
  <b-row>
    <b-col cols="4" class="back" style="padding-top: 10%">
      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="6">
          <h3 style="color: white; background: rgba(0, 0, 0, 0.5)">
            {{ counter }}
          </h3>
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
      <Clock
        v-on:childToParent="onChildClick"
        v-on:increment="counter++"
      ></Clock>
    </b-col>
    <b-col cols="8">
      <Shop v-if="this.userData != null" :userData="this.userData" @buy="buy" />
      <button type="button" class="btn btn-primary" @click="editUser()">
        Edit user
      </button>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "firebase";
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
      userData: null,
      user: null,
      pastMaterial: {
        flint: 0,
        fire: 0,
        bow: 0,
        tissage: 0,
        town: 0,
        wheel: 0,
        writing: 0
      }
    };
  },
  methods: {
    onChildClick(value) {
      this.fromChild = value;
    },
    editUser() {
      const db = this.$firebase.firestore();
      db.collection("users")
        .doc(this.user.uid)
        .update({
          createdID: this.user.uid,
          clicks: this.counter,
          time: this.userData.time,
          past:  {
            flint: this.userData.items[0].amount,
            fire: this.userData.items[1].amount,
            bow: this.userData.items[2].amount,
            town: this.userData.items[5].amount,
            wheel: this.userData.items[3].amount,
            writing: this.userData.items[4].amount
          }
        })
        .then(() => {
          location.reload();
        });
    },
    reloadPage() {
      location.reload();
    },
    buy(item) {

      if (this.userData.time >= this.userData.items[item].price) {
        console.log("ACHAT");
        this.userData.items[item].amount++;
        this.userData.items[item].price = Math.trunc(this.userData.items[item].price * this.userData.items[item].inflation);
        this.userData.time -= this.userData.items[item].price;

      } else
        console.log("TPAUVRE");
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        const db = this.$firebase.firestore();
        console.log(user.uid);
        var storeLib = [];
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            storeLib.push(doc.data());
            this.userData = {
              clicks: storeLib[0].clicks,
              time: storeLib[0].time,
              items: [
                {
                  name: "Flint",
                  amount: storeLib[0].past["flint"],
                  basePrice: 10,
                  inflation: 1.25,
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["flint"]))
                },
                {
                  name: "Fire",
                  amount: storeLib[0].past["fire"],
                  basePrice: 10,
                  inflation: 1.25,
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["fire"]))
                },
                {
                  name: "Bow",
                  amount: storeLib[0].past["bow"],
                  basePrice: 10,
                  inflation: 1.25,
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["bow"]))
                },
                {
                  name: "Wheel",
                  amount: storeLib[0].past["wheel"],
                  basePrice: 10,
                  inflation: 1.25,
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["wheel"]))
                },
                {
                  name: "Writing",
                  amount: storeLib[0].past["writing"],
                  basePrice: 10,
                  inflation: 1.25,
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["writing"]))
                },
                {
                  name: "Town",
                  amount: storeLib[0].past["town"],
                  basePrice: 10,
                  inflation: 1.25,
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["town"]))
                }
              ]
            };
            this.counter = storeLib[0].clicks;
          });
      } else {
        this.user = null;
      }
    });
  },
  created() {}
};
</script>

<style scoped>
.thumbnail:hover {
  width: 41%;
}

.back {
  background-image: url("https://i.pinimg.com/originals/af/54/2d/af542d89a7722b3ba7d078247d3314fe.gif");
  height: 89vh;
}
</style>
