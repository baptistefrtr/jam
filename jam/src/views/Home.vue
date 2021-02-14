<template>
  <b-row style="max-width: 99.9vw">
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

    <b-col cols="8" class="shop">
      <b-row>
        <b-col md="auto" style="padding: 0">
        <b-img :src="require('@/assets/woodSide.png')" v-bind:style="{objectFit: 'cover', height: '100vh'}"
        ></b-img></b-col>
        <b-col>
      <Shop v-if="this.userData != null" :userData="this.userData" @buyItem="buyItem" @buyUpgrade="buyUpgrade" />
      <button type="button" class="btn btn-primary" @click="editUser() && showAlert()">
        Edit user
      </button>
        </b-col>
      </b-row>
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
    getUpgradeLevel(item) {
      let level = 0;

      for (let i = 0; i !== item.upgrades.length; i++) {
        if (item.upgrades[i].locked === false) {
          level++
        }
      }
      return level;
    },
    editUser() {
      const db = this.$firebase.firestore();

      db.collection("users")
          .doc(this.user.uid)
          .update({
            createdID: this.user.uid,
            clicks: this.userData.clicks,
            time: this.userData.time,
            past: {
              flint: this.userData.items[0].amount,
              fire: this.userData.items[1].amount,
              bow: this.userData.items[2].amount,
              town: this.userData.items[5].amount,
              wheel: this.userData.items[3].amount,
              writing: this.userData.items[4].amount,
              church: this.userData.items[6].amount,
              boat: this.userData.items[7].amount,
              photography: this.userData.items[8].amount,
              train: this.userData.items[9].amount,
              electricity: this.userData.items[10].amount
            },
            upgrade: {
              flint: this.getUpgradeLevel(this.userData.items[0]),
              fire: this.getUpgradeLevel(this.userData.items[1]),
              bow: this.getUpgradeLevel(this.userData.items[2]),
              wheel: this.getUpgradeLevel(this.userData.items[3]),
              writing: this.getUpgradeLevel(this.userData.items[4]),
              town: this.getUpgradeLevel(this.userData.items[5]),
              church: this.getUpgradeLevel(this.userData.items[6]),
              boat: this.getUpgradeLevel(this.userData.items[7]),
              photography: this.getUpgradeLevel(this.userData.items[8]),
              train: this.getUpgradeLevel(this.userData.items[9]),
              electricity: this.getUpgradeLevel(this.userData.items[10])
            }
          })
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

      return Math.trunc(remuneration);
    },
    payday() {
      this.userData.time += this.totalRemuneration();
    },
    updateMultiplier(items) {
      for (let i = 0; i !== items.length; i++) {
        for (let y = 0; y !== items[i].upgrades.length; y++) {
          if (items[i].upgrades[y].locked === false)
            items[i].multiplier *= items[i].upgrades[y].multiplier;
        }
      }
    },
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
                        locked: (storeLib[0].upgrade["flint"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["flint"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["flint"] <= 2),
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
                        locked: (storeLib[0].upgrade["fire"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["fire"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["fire"] <= 2),
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
                        locked: (storeLib[0].upgrade["bow"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["bow"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["bow"] <= 2),
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
                        locked: (storeLib[0].upgrade["wheel"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["wheel"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["wheel"] <= 2),
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
                        locked: (storeLib[0].upgrade["writing"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["writing"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["writing"] <= 2),
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
                        locked: (storeLib[0].upgrade["town"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["town"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["town"] <= 2),
                        multiplier: 1.5,
                        price: 300
                      }
                    ]
                  },
                  {
                    name: "Church",
                    amount: storeLib[0].past["church"],
                    basePrice: 10,
                    inflation: 1.25,
                    baseRemuneration: 3,
                    remuneration: Math.trunc(3 * storeLib[0].past["church"]),
                    price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["church"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["church"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["church"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["church"] <= 2),
                        multiplier: 1.5,
                        price: 300
                      }
                    ]
                  },
                  {
                    name: "Boat",
                    amount: storeLib[0].past["boat"],
                    basePrice: 10,
                    inflation: 1.25,
                    baseRemuneration: 3,
                    remuneration: Math.trunc(3 * storeLib[0].past["boat"]),
                    price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["boat"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["boat"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["boat"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["boat"] <= 2),
                        multiplier: 1.5,
                        price: 300
                      }
                    ]
                  },
                  {
                    name: "Photography",
                    amount: storeLib[0].past["photography"],
                    basePrice: 10,
                    inflation: 1.25,
                    baseRemuneration: 3,
                    remuneration: Math.trunc(3 * storeLib[0].past["photography"]),
                    price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["photography"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["photography"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["photography"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["photography"] <= 2),
                        multiplier: 1.5,
                        price: 300
                      }
                    ]
                  },
                  {
                    name: "Train",
                    amount: storeLib[0].past["train"],
                    basePrice: 10,
                    inflation: 1.25,
                    baseRemuneration: 3,
                    remuneration: Math.trunc(3 * storeLib[0].past["train"]),
                    price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["train"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["train"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["train"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["train"] <= 2),
                        multiplier: 1.5,
                        price: 300
                      }
                    ]
                  },
                  {
                    name: "Electricity",
                    amount: storeLib[0].past["electricity"],
                    basePrice: 10,
                    inflation: 1.25,
                    baseRemuneration: 3,
                    remuneration: Math.trunc(3 * storeLib[0].past["electricity"]),
                    price: Math.trunc(10 * Math.pow(1.25, storeLib[0].past["electricity"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["electricity"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["electricity"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["electricity"] <= 2),
                        multiplier: 1.5,
                        price: 300
                      }
                    ]
                  }
                ]
              };
              console.log(this.userData);
              this.updateMultiplier(this.userData.items);
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
  height: 100vh;
  background-size: 100vh;
  object-fit: cover;
}

.shop {
  background-image: url("../assets/Shop.jpg");
  height: 100vh;
}
</style>
