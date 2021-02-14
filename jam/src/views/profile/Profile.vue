<template>
  <b-row class="styleMec">
    <b-col cols="2"></b-col>
    <b-col cols="8">
      <h2>A track of all your stats</h2>
      <b-row style="text-align: left">
        <b-col>
          <h2>Global</h2>
        </b-col>
      </b-row>
      <b-row style="text-align: left">
        <br><br><br><br>
        <b-col cols="6">
          <p>Username: {{ user.displayName }}</p>
          <p>Mail: {{ user.email }}</p>
        </b-col>
        <b-col cols="6">
          <p>Id: {{ testDocument[0].createdID }}</p>
          <p>Number of click: {{ testDocument[0].clicks }}</p>
        </b-col>
      </b-row>
      <b-row style="text-align: left">
        <b-col>
          <h2 style="text-align: left">Past</h2>
        </b-col>
      </b-row>
      <b-row style="text-align: left">
        <br><br><br><br>
        <b-col cols="6">
          <p>Number of flint: {{ testDocument[0].past.flint }}</p>
          <p>Number of church: {{ testDocument[0].past.church }}</p>
          <p>Number of town: {{ testDocument[0].past.town }}</p>
          <p>Number of electricity: {{ testDocument[0].past.electricity }}</p>
          <p>Number of photography: {{ testDocument[0].past.photography }}</p>
        </b-col>
        <b-col cols="6">
          <p>Number of bow: {{ testDocument[0].past.bow }}</p>
          <p>Number of writing: {{ testDocument[0].past.writing }}</p>
          <p>Number of wheel: {{ testDocument[0].past.wheel }}</p>
          <p>Number of boat: {{ testDocument[0].past.boat }}</p>
          <p>Number of train: {{ testDocument[0].past.train }}</p>
        </b-col>
      </b-row>
      <b-row style="text-align: left">
        <b-col>
          <h2 style="text-align: left">Present</h2>
        </b-col>
      </b-row>
      <b-row style="text-align: left">
        <br><br><br><br>
        <b-col cols="6">
          <p>Number of flint: {{ testDocument[0].present.rocket }}</p>
          <p>Number of flint: {{ testDocument[0].present.covid }}</p>
          <p>Number of flint: {{ testDocument[0].present.disk }}</p>
          <p>Number of flint: {{ testDocument[0].present.computer }}</p>
        </b-col>
        <b-col cols="6">
          <p>Number of flint: {{ testDocument[0].present.phone }}</p>
          <p>Number of flint: {{ testDocument[0].present.games }}</p>
          <p>Number of flint: {{ testDocument[0].present.coca }}</p>
        </b-col>
      </b-row>
      <b-row style="text-align: left">
        <b-col>
          <h2 style="text-align: left">Futur</h2>
        </b-col>
      </b-row>
      <b-row style="text-align: left">
        <br><br><br><br>
        <b-col cols="6">
          <p>Number of flint: {{ testDocument[0].futur.motherboard }}</p>
          <p>Number of flint: {{ testDocument[0].futur.hologram }}</p>
        </b-col>
        <b-col cols="6">
          <p>Number of flint: {{ testDocument[0].futur.dolorean }}</p>
        </b-col>
      </b-row>
      <b-row style="text-align: left">
        <b-col>
          <h2 style="text-align: left">Upgrade</h2>
        </b-col>
      </b-row>
      <b-row style="text-align: left">
        <br><br><br><br>
        <b-col cols="6">
          <p>Upgrade level of wheel: {{ testDocument[0].upgrade.wheel }}</p>
          <p>Upgrade level of phone: {{ testDocument[0].upgrade.phone }}</p>
          <p>Upgrade level of games: {{ testDocument[0].upgrade.games }}</p>
          <p>Upgrade level of hologram: {{ testDocument[0].upgrade.hologram }}</p>
          <p>Upgrade level of writing: {{ testDocument[0].upgrade.writing }}</p>
          <p>Upgrade level of electricity: {{ testDocument[0].upgrade.electricity }}</p>
          <p>Upgrade level of photography: {{ testDocument[0].upgrade.photography }}</p>
          <p>Upgrade level of computer: {{ testDocument[0].upgrade.computer }}</p>
          <p>Upgrade level of bow: {{ testDocument[0].upgrade.bow }}</p>
          <p>Upgrade level of church: {{ testDocument[0].upgrade.church }}</p>
          <p>Upgrade level of motherboard: {{ testDocument[0].upgrade.motherboard }}</p>
        </b-col>
        <b-col cols="6">
          <p>Upgrade level of disk: {{ testDocument[0].upgrade.disk }}</p>
          <p>Upgrade level of flint: {{ testDocument[0].upgrade.flint }}</p>
          <p>Upgrade level of town: {{ testDocument[0].upgrade.town }}</p>
          <p>Upgrade level of fire: {{ testDocument[0].upgrade.fire }}</p>
          <p>Upgrade level of covid: {{ testDocument[0].upgrade.covid }}</p>
          <p>Upgrade level of boat: {{ testDocument[0].upgrade.boat }}</p>
          <p>Upgrade level of train: {{ testDocument[0].upgrade.train }}</p>
          <p>Upgrade level of dolorean: {{ testDocument[0].upgrade.dolorean }}</p>
          <p>Upgrade level of rocket: {{ testDocument[0].upgrade.rocket }}</p>
          <p>Upgrade level of coca: {{ testDocument[0].upgrade.coca }}</p>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="2"></b-col>
  </b-row>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: null,
      testDocument: [],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        const db = this.$firebase.firestore();
        var storeLib = [];
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            storeLib.push(doc.data());
            this.testDocument = storeLib;
            this.userVerified = user.emailVerified;
            this.testDocument = storeLib;
            this.weather = storeLib[0].weather;
          });
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/login");
          });
        });
    },
    editUser() {
      const db = this.$firebase.firestore();
      db.collection("users")
        .doc(this.user.uid)
        .set({
          userVerified: this.userVerified,
          createdID: this.user.uid,
          weather: this.weather,
          weatherLoc: this.weatherLoc,
        })
        .then(() => {
          location.reload();
        });
    },
    reloadPage() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.styleMec {
  background-image: url("../../assets/Shop.jpg");
  color: white;
  font-size: 130%;
}
</style>