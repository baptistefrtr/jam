<template>
  <div class="vue-tempalte">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <br /><br /><br /><br /><br />
        <form @submit.prevent="userRegistration">
          <h3>Sign Up</h3>
          <br />
          <button @click="googleLogin()" class="btn btn-success btn-lg btn-block">Sign in with Google</button>
          <br />
          <br />

          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              class="form-control form-control-lg"
              v-model="user.name"
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-control form-control-lg"
              v-model="user.email"
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control form-control-lg"
              v-model="user.password"
            />
          </div>

          <button type="submit" class="btn btn-dark btn-lg btn-block">
            Sign Up
          </button>

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
        console.log(user.uid);
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
            console.log("Mail envoyé !");
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
                  electricity: 0
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
                  electricity: 0
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
      console.log("Mail envoyé !");
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        console.log(user.uid);
        this.initBdd();
      } else {
        this.user = null;
      }
    });
  },
};
</script>