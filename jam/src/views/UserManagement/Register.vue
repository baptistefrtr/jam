<template>
  <div class="vue-tempalte">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <br /><br /><br /><br /><br />
        <form @submit.prevent="userRegistration">
          <h3>Sign Up</h3>
          <br />
          <button @click="googleLogin()" class="btn btn-success btn-lg btn-block">Register with Google</button>
          <br />
          <br />
          <p class="forgot-password text-right">
            Already registered
            <router-link to="/login">sign in?</router-link>
          </p>
        </form>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.initBdd();
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          const user = firebase.auth().currentUser;
          user.sendEmailVerification().then(() => {
          });
          res.user
            .updateProfile({
              displayName: this.user.name,
            })
            .then(() => {
              this.$router.push("/");
            });
        });
    },
    initBdd() {
      const db = this.$firebase.firestore();
      db.collection("users")
        .doc(this.user.uid)
        db.collection("users")
              .doc(this.user.uid)
              .set({
                createdID: this.user.uid,
                clicks: 0,
                time: 0,
                clickLevel: 0,
                past:  {
                  flint: 0,
                  fire: 0,
                  bow: 0,
                  town: 0,
                  wheel: 0,
                  writing: 0,
                  church: 0,
                  boat: 0,
                  photography: 0,
                  train: 0,
                  electricity: 0,
                },
                present: {
                  phone: 0,
                  computer: 0,
                  disk: 0,
                  coca: 0,
                  games: 0,
                  rocket: 0,
                  covid: 0,
                },
                futur: {
                  dolorean: 0,
                  motherboard: 0,
                  hologram: 0,
                },
                upgrade: {
                  flint: 0,
                  fire: 0,
                  bow: 0,
                  wheel: 0,
                  writing: 0,
                  town: 0,
                  church: 0,
                  boat: 0,
                  photography: 0,
                  train: 0,
                  electricity: 0,
                  phone: 0,
                  computer: 0,
                  disk: 0,
                  coca: 0,
                  games: 0,
                  rocket: 0,
                  covid: 0,
                  dolorean: 0,
                  motherboard: 0,
                  hologram: 0,
                }
              })
        .then(() => {
          this.$router.push("/");
          location.reload();
        });
    },
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(
            this.$initBdd());
    }
  },
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.initBdd();
      } else {
        this.user = null;
      }
    });
  },
};
</script>