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
            {{ Intl.NumberFormat().format(Math.trunc(userData.time)) }} time
            <br>
            per second: {{ Intl.NumberFormat().format(totalRemuneration())  }}
          </h3>
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
      <Clock
        v-on:childToParent="onChildClick"
        v-on:increment="counter++ && (userData.time += userData.click.efficiency) && userData.clicks++"
      ></Clock>
    </b-col>

    <b-col cols="8" class="shop">
      <b-row>
        <b-col md="auto" style="padding: 0">
        <b-img :src="require('@/assets/woodSide.png')" v-bind:style="{objectFit: 'cover', height: '100vh'}"
        ></b-img></b-col>
        <b-col>
      <Shop v-if="this.userData != null" :userData="this.userData" @buyItem="buyItem" @buyUpgrade="buyUpgrade" @upgradeClick="upgradeClick" />
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
            clickLevel: this.userData.click.level,
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
            present: {
              phone: this.userData.items[11].amount,
              computer: this.userData.items[12].amount,
              disk: this.userData.items[13].amount,
              coca: this.userData.items[14].amount,
              games: this.userData.items[15].amount,
              rocket: this.userData.items[16].amount,
              covid: this.userData.items[17].amount,
            },
            futur: {
              dolorean: this.userData.items[18].amount,
              motherboard: this.userData.items[19].amount,
              hologram: this.userData.items[20].amount,
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
              electricity: this.getUpgradeLevel(this.userData.items[10]),
              phone: this.getUpgradeLevel(this.userData.items[11]),
              computer: this.getUpgradeLevel(this.userData.items[12]),
              disk: this.getUpgradeLevel(this.userData.items[13]),
              coca: this.getUpgradeLevel(this.userData.items[14]),
              games: this.getUpgradeLevel(this.userData.items[15]),
              rocket: this.getUpgradeLevel(this.userData.items[16]),
              covid: this.getUpgradeLevel(this.userData.items[17]),
              dolorean: this.getUpgradeLevel(this.userData.items[18]),
              motherboard: this.getUpgradeLevel(this.userData.items[19]),
              hologram: this.getUpgradeLevel(this.userData.items[20]),
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
        this.userData.items[item].price = this.userData.items[item].price * this.userData.items[item].inflation;
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
    upgradeClick() {
      console.log(this.userData.time);
      console.log(this.userData.click.price);
      if (this.userData.time >= this.userData.click.price) {
        this.userData.time -= this.userData.click.price
        this.userData.click.level++;
        this.userData.click.efficiency = 1 * (Math.pow(1.5, this.userData.click.level));
        this.userData.click.price *= this.userData.click.inflation;
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
                click: {
                  level: storeLib[0].clickLevel,
                  basePrice: 30,
                  inflation: 2.5,
                  efficiency: 1 * (Math.pow(1.5, storeLib[0].clickLevel)),
                  price: 30 * (Math.pow(2.5, storeLib[0].clickLevel)),
                },
                items: [
                  {
                    name: "Flint",
                    amount: storeLib[0].past["flint"],
                    basePrice: 10,
                    inflation: 1.1,
                    baseRemuneration: 0.1,
                    remuneration: 0.1 * storeLib[0].past["flint"],
                    price: 10 * Math.pow(1.1, storeLib[0].past["flint"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["flint"] <= 0),
                        multiplier: 2,
                        price: 50
                      },
                      {
                        locked: (storeLib[0].upgrade["flint"] <= 1),
                        multiplier: 2,
                        price: 150
                      },
                      {
                        locked: (storeLib[0].upgrade["flint"] <= 2),
                        multiplier: 2,
                        price: 300
                      }
                    ]
                  },
                  {
                    name: "Fire",
                    amount: storeLib[0].past["fire"],
                    basePrice: 70,
                    inflation: 1.1,
                    baseRemuneration: 4,
                    remuneration: 4 * storeLib[0].past["fire"],
                    price: 70 * Math.pow(1.1, storeLib[0].past["fire"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["fire"] <= 0),
                        multiplier: 1.5,
                        price: 200
                      },
                      {
                        locked: (storeLib[0].upgrade["fire"] <= 1),
                        multiplier: 1.5,
                        price: 500
                      },
                      {
                        locked: (storeLib[0].upgrade["fire"] <= 2),
                        multiplier: 4,
                        price: 3000
                      }
                    ]
                  },
                  {
                    name: "Bow",
                    amount: storeLib[0].past["bow"],
                    basePrice: 600,
                    inflation: 1.1,
                    baseRemuneration: 10,
                    remuneration: 10 * storeLib[0].past["bow"],
                    price: 600 * Math.pow(1.1, storeLib[0].past["bow"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["bow"] <= 0),
                        multiplier: 2,
                        price: 2800
                      },
                      {
                        locked: (storeLib[0].upgrade["bow"] <= 1),
                        multiplier: 2.5,
                        price: 12000
                      },
                      {
                        locked: (storeLib[0].upgrade["bow"] <= 2),
                        multiplier: 5,
                        price: 40000
                      }
                    ]
                  },
                  {
                    name: "Wheel",
                    amount: storeLib[0].past["wheel"],
                    basePrice: 5500,
                    inflation: 1.1,
                    baseRemuneration: 40,
                    remuneration: 3 * storeLib[0].past["wheel"],
                    price: 5500 * Math.pow(1.1, storeLib[0].past["wheel"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["wheel"] <= 0),
                        multiplier: 1.5,
                        price: 10000
                      },
                      {
                        locked: (storeLib[0].upgrade["wheel"] <= 1),
                        multiplier: 1.5,
                        price: 30000
                      },
                      {
                        locked: (storeLib[0].upgrade["wheel"] <= 2),
                        multiplier: 1.5,
                        price: 80000
                      }
                    ]
                  },
                  {
                    name: "Writing",
                    amount: storeLib[0].past["writing"],
                    basePrice: 40000,
                    inflation: 1.1,
                    baseRemuneration: 600,
                    remuneration: 600 * storeLib[0].past["writing"],
                    price: 40000 * Math.pow(1.1, storeLib[0].past["writing"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["writing"] <= 0),
                        multiplier: 2,
                        price: 80000
                      },
                      {
                        locked: (storeLib[0].upgrade["writing"] <= 1),
                        multiplier: 2,
                        price: 120000
                      },
                      {
                        locked: (storeLib[0].upgrade["writing"] <= 2),
                        multiplier: 2,
                        price: 200000
                      }
                    ]
                  },
                  {
                    name: "Town",
                    amount: storeLib[0].past["town"],
                    basePrice: 330000,
                    inflation: 1.1,
                    baseRemuneration: 1800,
                    remuneration: 1800 * storeLib[0].past["town"],
                    price: 330000 * Math.pow(1.1, storeLib[0].past["town"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["town"] <= 0),
                        multiplier: 2,
                        price: 500000
                      },
                      {
                        locked: (storeLib[0].upgrade["town"] <= 1),
                        multiplier: 2,
                        price: 800000
                      },
                      {
                        locked: (storeLib[0].upgrade["town"] <= 2),
                        multiplier: 2,
                        price: 1200000
                      }
                    ]
                  },
                  {
                    name: "Church",
                    amount: storeLib[0].past["church"],
                    basePrice: 1500000,
                    inflation: 1.1,
                    baseRemuneration: 4500,
                    remuneration: 4500 * storeLib[0].past["church"],
                    price: 1500000 * Math.pow(1.1, storeLib[0].past["church"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["church"] <= 0),
                        multiplier: 2,
                        price: 2500000
                      },
                      {
                        locked: (storeLib[0].upgrade["church"] <= 1),
                        multiplier: 2,
                        price: 3000000
                      },
                      {
                        locked: (storeLib[0].upgrade["church"] <= 2),
                        multiplier: 2,
                        price: 3500000
                      }
                    ]
                  },
                  {
                    name: "Boat",
                    amount: storeLib[0].past["boat"],
                    basePrice: 9000000,
                    inflation: 1.1,
                    baseRemuneration: 12000,
                    remuneration: 12000 * storeLib[0].past["boat"],
                    price: 9000000 * Math.pow(1.1, storeLib[0].past["boat"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["boat"] <= 0),
                        multiplier: 2,
                        price: 13000000
                      },
                      {
                        locked: (storeLib[0].upgrade["boat"] <= 1),
                        multiplier: 2,
                        price: 17000000
                      },
                      {
                        locked: (storeLib[0].upgrade["boat"] <= 2),
                        multiplier: 2,
                        price: 24000000
                      }
                    ]
                  },
                  {
                    name: "Photography",
                    amount: storeLib[0].past["photography"],
                    basePrice: 27000000,
                    inflation: 1.1,
                    baseRemuneration: 30000,
                    remuneration: 30000 * storeLib[0].past["photography"],
                    price: 27000000 * Math.pow(1.1, storeLib[0].past["photography"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["photography"] <= 0),
                        multiplier: 2,
                        price: 35000000
                      },
                      {
                        locked: (storeLib[0].upgrade["photography"] <= 1),
                        multiplier: 2,
                        price: 45000000
                      },
                      {
                        locked: (storeLib[0].upgrade["photography"] <= 2),
                        multiplier: 2,
                        price: 60000000
                      }
                    ]
                  },
                  {
                    name: "Train",
                    amount: storeLib[0].past["train"],
                    basePrice: 112000000,
                    inflation: 1.1,
                    baseRemuneration: 90000,
                    remuneration: 90000 * storeLib[0].past["train"],
                    price: 112000000 * Math.pow(1.1, storeLib[0].past["train"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["train"] <= 0),
                        multiplier: 2,
                        price: 145000000
                      },
                      {
                        locked: (storeLib[0].upgrade["train"] <= 1),
                        multiplier: 2,
                        price: 190000000
                      },
                      {
                        locked: (storeLib[0].upgrade["train"] <= 2),
                        multiplier: 2,
                        price: 240000000
                      }
                    ]
                  },
                  {
                    name: "Electricity",
                    amount: storeLib[0].past["electricity"],
                    basePrice: 460000000,
                    inflation: 1.1,
                    baseRemuneration: 310000,
                    remuneration: 310000 * storeLib[0].past["electricity"],
                    price: 460000000 * Math.pow(1.1, storeLib[0].past["electricity"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["electricity"] <= 0),
                        multiplier: 2,
                        price: 550000000
                      },
                      {
                        locked: (storeLib[0].upgrade["electricity"] <= 1),
                        multiplier: 2,
                        price: 650000000
                      },
                      {
                        locked: (storeLib[0].upgrade["electricity"] <= 2),
                        multiplier: 2,
                        price: 820000000
                      }
                    ]
                  },
                  {
                    name: "Phone",
                    amount: storeLib[0].present["phone"],
                    basePrice: 1000000000,
                    inflation: 1.1,
                    baseRemuneration: 950000,
                    remuneration: 950000 * storeLib[0].present["phone"],
                    price: 1000000000 * Math.pow(1.1, storeLib[0].present["phone"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["phone"] <= 0),
                        multiplier: 2,
                        price: 1300000000
                      },
                      {
                        locked: (storeLib[0].upgrade["phone"] <= 1),
                        multiplier: 2,
                        price: 1800000000
                      },
                      {
                        locked: (storeLib[0].upgrade["phone"] <= 2),
                        multiplier: 2,
                        price: 2100000000
                      }
                    ]
                  },
                  {
                    name: "Computer",
                    amount: storeLib[0].present["computer"],
                    basePrice: 4500000000,
                    inflation: 1.1,
                    baseRemuneration: 2700000,
                    remuneration: 2700000 * storeLib[0].present["computer"],
                    price: 4500000000 * Math.pow(1.1, storeLib[0].present["computer"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["computer"] <= 0),
                        multiplier: 2,
                        price: 7777777777
                      },
                      {
                        locked: (storeLib[0].upgrade["computer"] <= 1),
                        multiplier: 2,
                        price: 11200000000
                      },
                      {
                        locked: (storeLib[0].upgrade["computer"] <= 2),
                        multiplier: 2,
                        price: 16000000000
                      }
                    ]
                  },
                  {
                    name: "Disk",
                    amount: storeLib[0].present["disk"],
                    basePrice: 22000000000,
                    inflation: 1.1,
                    baseRemuneration: 5000000,
                    remuneration: 5000000 * storeLib[0].present["disk"],
                    price: 22000000000 * Math.pow(1., storeLib[0].present["disk"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["disk"] <= 0),
                        multiplier: 2,
                        price: 28000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["disk"] <= 1),
                        multiplier: 2.5,
                        price: 68000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["disk"] <= 2),
                        multiplier: 5,
                        price: 555123456789
                      }
                    ]
                  },
                  {
                    name: "Coca",
                    amount: storeLib[0].present["coca"],
                    basePrice: 90000000000,
                    inflation: 1.1,
                    baseRemuneration: 21000000,
                    remuneration: (21000000 * storeLib[0].present["coca"]),
                    price: (90000000000 * Math.pow(1.1, storeLib[0].present["coca"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["coca"] <= 0),
                        multiplier: 2,
                        price: 120000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["coca"] <= 1),
                        multiplier: 2,
                        price: 160000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["coca"] <= 2),
                        multiplier: 2,
                        price: 195000000000
                      }
                    ]
                  },
                  {
                    name: "Games",
                    amount: storeLib[0].present["games"],
                    basePrice: 350000000000,
                    inflation: 1.1,
                    baseRemuneration: 89000000,
                    remuneration: (89000000 * storeLib[0].present["games"]),
                    price: (350000000000 * Math.pow(1.1, storeLib[0].present["games"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["games"] <= 0),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["games"] <= 1),
                        multiplier: 1.5,
                        price: 300
                      },
                      {
                        locked: (storeLib[0].upgrade["games"] <= 2),
                        multiplier: 1.5,
                        price: 300
                      }
                    ]
                  },
                  {
                    name: "Rocket",
                    amount: storeLib[0].present["rocket"],
                    basePrice: 1175000000000,
                    inflation: 1.1,
                    baseRemuneration: 334000000,
                    remuneration: (334000000 * storeLib[0].present["rocket"]),
                    price: (1175000000000 * Math.pow(1.25, storeLib[0].present["rocket"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["rocket"] <= 0),
                        multiplier: 2,
                        price: 1500000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["rocket"] <= 1),
                        multiplier: 2,
                        price: 2121212212212
                      },
                      {
                        locked: (storeLib[0].upgrade["rocket"] <= 2),
                        multiplier: 12,
                        price: 30000000000000
                      }
                    ]
                  },
                  {
                    name: "Covid",
                    amount: storeLib[0].present["covid"],
                    basePrice: 1900000000000,
                    inflation: 1.1,
                    baseRemuneration: -334000000,
                    remuneration: -334000000 * storeLib[0].present["covid"],
                    price: 1900000000000 * Math.pow(1.1, storeLib[0].present["covid"]),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["covid"] <= 0),
                        multiplier: -5,
                        price: 3900000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["covid"] <= 1),
                        multiplier: 2,
                        price: 5500000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["covid"] <= 2),
                        multiplier: 2,
                        price: 8000000000000
                      }
                    ]
                  },
                  {
                    name: "Dolorean",
                    amount: storeLib[0].futur["dolorean"],
                    basePrice: 17696000000021,
                    inflation: 1.1,
                    baseRemuneration: 4206900000,
                    remuneration: (4206900000 * storeLib[0].futur["dolorean"]),
                    price: (17696000000021 * Math.pow(1.1, storeLib[0].futur["dolorean"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["dolorean"] <= 0),
                        multiplier: 2,
                        price: 23000000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["dolorean"] <= 1),
                        multiplier: 2,
                        price: 29000000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["dolorean"] <= 2),
                        multiplier: 2,
                        price: 34000000000000
                      }
                    ]
                  },
                  {
                    name: "Motherboard",
                    amount: storeLib[0].futur["motherboard"],
                    basePrice: 29999999999999,
                    inflation: 1.1,
                    baseRemuneration: 10000000000,
                    remuneration: (10000000000 * storeLib[0].futur["motherboard"]),
                    price: (29999999999999 * Math.pow(1.1, storeLib[0].futur["motherboard"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["motherboard"] <= 0),
                        multiplier: 2,
                        price: 40000000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["motherboard"] <= 1),
                        multiplier: 2,
                        price: 55000000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["motherboard"] <= 2),
                        multiplier: 2,
                        price: 70000000000000
                      }
                    ]
                  },
                  {
                    name: "Hologram",
                    amount: storeLib[0].futur["hologram"],
                    basePrice: 180000000000000,
                    inflation: 1.1,
                    baseRemuneration: 123456789123,
                    remuneration: (123456789123 * storeLib[0].futur["hologram"]),
                    price: (180000000000000 * Math.pow(1.1, storeLib[0].futur["hologram"])),
                    multiplier: 1,
                    upgrades: [
                      {
                        locked: (storeLib[0].upgrade["hologram"] <= 0),
                        multiplier: 10,
                        price: 3800000000000000,
                      },
                      {
                        locked: (storeLib[0].upgrade["hologram"] <= 1),
                        multiplier: 5,
                        price: 52000000000000000
                      },
                      {
                        locked: (storeLib[0].upgrade["hologram"] <= 2),
                        multiplier: 1000,
                        price: 99999999999999999999
                      }
                    ]
                  },
                ]
              };
              console.log(this.userData);
              console.log(this.userData.click.level);
              console.log(this.userData.click.efficiency);
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
