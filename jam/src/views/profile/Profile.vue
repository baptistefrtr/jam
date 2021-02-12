<template>
  <div class="vue-tempalte">
    <div class="row" v-if="userVerified != true">
      <div class="col-4"></div>
      <div class="col-4">
        <br /><br /><br />
        <h3>You are not verified yet !</h3>
        <p>Check your email and come back when you will be registered</p>
        <br /><br />
      </div>
      <div class="col-4"></div>
    </div>
    <div class="row" v-if="userVerified != true">
        <div class="col-4"></div>
        <div class="col-4">
            <button
          type="submit"
          class="btn btn-success btn-lg btn-block"
          @click="editUser()"
        >
          Want to refresh ?
        </button>
        </div>
        <div class="col-4"></div>
    </div>
    <div v-if="userVerified != false">
      <h3>Welcome</h3>
      <p>{{ user.displayName }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.id }}</p>
      <p>{{ userVerified }}</p>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
          <br /><br />
          <button
            type="submit"
            class="btn btn-danger btn-lg btn-block"
            @click="logOut()"
          >
            Log out
          </button>
        </div>
        <div class="col-4"></div>
        s
      </div>
      <br /><br /><br />
      <h3>
        Here you are able to enable the three different services
      </h3>
      <button type="button" class="btn btn-primary" @click="editUser()">
        Edit user
      </button>
      <br /><br />
      <div class="row">
        <div class="col-4" align="center">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="weather"
              />
              <h5 class="card-title">Weather Service</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: null,
      userVerified: false,
      testDocument: [],
      insta: false,
      instaService: [false, false, false, false, false, false, false],
      twitter: false,
      twitterService: [false, false, false, false, false, false, false, false],
      twitch: false,
      twitchService: [false, false, false, false, false, false, false, false],
      timer: false,
      timerService: [false, false, false, false, false, false, false, false],
      weather: false,
      weatherLoc: null,
      weatherService: [false, false, false, false, false, false, false],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        const db = this.$firebase.firestore();
        console.log(user.uid);
        var storeLib = [];
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            storeLib.push(doc.data());
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
        console.log("test du verified");
        console.log(this.userVerified);
      const db = this.$firebase.firestore();
      db.collection("users")
        .doc(this.user.uid)
        .set({
          userVerified: this.userVerified,
          createdID: this.user.uid,
          weather: this.weather,
          weatherLoc: this.weatherLoc,
          weatherService: [
            this.weatherService[0],
            this.weatherService[2],
            this.weatherService[2],
            this.weatherService[3],
            this.weatherService[4],
            this.weatherService[5],
            this.weatherService[6],
          ],
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