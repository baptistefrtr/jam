<template>
  <div class="vue-tempalte">
    <div>
      <h3>Welcome</h3>
      <p>{{ user.displayName }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.id }}</p>
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
      </div>
      <button type="button" class="btn btn-primary" @click="editUser()">
        Edit user
      </button>
      <br /><br />
    </div>
  </div>
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