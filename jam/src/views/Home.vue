<template>
  <b-row>
    <b-col cols="4" class="back" style="padding-top: 10%">
      <b-row>
        <b-alert
      style="position: absolute; top: 95%; left: 5%"
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      Game saved
    </b-alert>
        <b-col cols="3"></b-col>
        <b-col cols="6" v-if="userData">
          <h3 style="color: white; background: rgba(0, 0, 0, 0.5)">
            {{ Intl.NumberFormat().format(userData.time) }} time
            <br>
            per seconds: {{ Intl.NumberFormat().format(totalRemuneration())  }}
          </h3>
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
      <Clock
        v-on:childToParent="onChildClick"
        v-on:increment="counter++ && userData.time++ && userData.clicks++"
      ></Clock>
    </b-col>
    <b-col cols="8">
      <Shop v-if="this.userData != null" :userData="this.userData" @buyItem="buyItem" @buyUpgrade="buyUpgrade" />
      <button type="button" class="btn btn-primary" @click="editUser() && showAlert()">
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
      dismissSecs: 5,
      dismissCountDown: 0,
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
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    onChildClick(value) {
      this.fromChild = value;
    },
    editUser() {
      const db = this.$firebase.firestore();
      db.collection("users").doc(this.user.uid).get().then(snapshot => {
        if (snapshot.exists) {
          db.collection("users")
              .doc(this.user.uid)
              .update({
                createdID: this.user.uid,
                clicks: this.userData.clicks,
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
        } else
          db.collection("users")
              .doc(this.user.uid)
              .set({
                createdID: this.user.uid,
                clicks: 0,
                time: 0,
                past:  {
                  flint: 0,
                  fire: 0,
                  bow: 0,
                  town: 0,
                  wheel: 0,
                  writing: 0
                }
              })
      });
      this.dismissCountDown = this.dismissSecs;
    },
    reloadPage() {
      location.reload();
    },
    buyItem(item) {

      if (this.userData.time >= this.userData.items[item].price) {
        console.log("ACHAT");
        this.userData.items[item].amount++;
        this.userData.time -= this.userData.items[item].price;
        this.userData.items[item].price = Math.trunc(this.userData.items[item].price * this.userData.items[item].inflation);
        this.userData.items[item].remuneration += this.userData.items[item].baseRemuneration;
      } else
        console.log("TPAUVRE");
    },
    buyUpgrade(value) {
      for (let i = 0; i !== this.userData.items[value].upgrades[i]; i++) {
        if (this.userData.items[value].upgrades[i].locked && this.userData.time >= this.userData.items[value].upgrades[i].price) {
          console.log("ACHAAAAt " + i);
          console.log(this.userData.items[value].name);
          this.userData.items[value].upgrades[i].locked = false;
          this.userData.items[value].multiplier *= this.userData.items[value].upgrades[i].multiplier;
          this.userData.time -= this.userData.items[value].upgrades[i].price;
          break;
        }
      }
    },
    totalRemuneration() {
      var remuneration = 0;

      for (let i = 0; i < this.userData.items.length; i++) {
        remuneration += this.userData.items[i].remuneration * this.userData.items[i].multiplier;
      }

      return remuneration;
    },
    payday() {
      this.userData.time += this.totalRemuneration();
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
                  baseRemuneration: 3,
                  remuneration: Math.trunc(3 * storeLib[0].past["flint"]),
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["flint"])),
                  multiplier: 1,
                  upgrades: [
                     {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    }
                  ]
                },
                {
                  name: "Fire",
                  amount: storeLib[0].past["fire"],
                  basePrice: 10,
                  inflation: 1.25,
                  baseRemuneration: 3,
                  remuneration: Math.trunc(3 * storeLib[0].past["fire"]),
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["fire"])),
                  multiplier: 1,
                  upgrades: [
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    }
                  ]
                },
                {
                  name: "Bow",
                  amount: storeLib[0].past["bow"],
                  basePrice: 10,
                  inflation: 1.25,
                  baseRemuneration: 3,
                  remuneration: Math.trunc(3 * storeLib[0].past["bow"]),
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["bow"])),
                  multiplier: 1,
                  upgrades: [
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    }
                  ]
                },
                {
                  name: "Wheel",
                  amount: storeLib[0].past["wheel"],
                  basePrice: 10,
                  inflation: 1.25,
                  baseRemuneration: 3,
                  remuneration: Math.trunc(3 * storeLib[0].past["wheel"]),
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["wheel"])),
                  multiplier: 1,
                  upgrades: [
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    }
                  ]
                },
                {
                  name: "Writing",
                  amount: storeLib[0].past["writing"],
                  basePrice: 10,
                  inflation: 1.25,
                  baseRemuneration: 3,
                  remuneration: Math.trunc(3 * storeLib[0].past["writing"]),
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["writing"])),
                  multiplier: 1,
                  upgrades: [
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    }
                  ]
                },
                {
                  name: "Town",
                  amount: storeLib[0].past["town"],
                  basePrice: 10,
                  inflation: 1.25,
                  baseRemuneration: 3,
                  remuneration: Math.trunc(3 * storeLib[0].past["town"]),
                  price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["town"])),
                  multiplier: 1,
                  upgrades: [
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    },
                    {
                      locked: true,
                      multiplier: 1.5,
                      price: 300
                    }
                  ]
                }
              ]
            };
            this.counter = storeLib[0].clicks;
          });
      } else {
        this.user = null;
      }
    });
    setInterval(() => this.editUser(), 1 * 600000);
    setInterval(() => this.payday(), 1000);
  },
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
