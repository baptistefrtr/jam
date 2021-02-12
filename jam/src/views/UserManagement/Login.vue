<template>
  <div class="vue-tempalte">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <br /><br /><br /><br /><br />
        <form @submit.prevent="userLogin">
          <h3>Sign In</h3>
          <br />
          <button @click="googleLogin()" class="btn btn-success btn-lg btn-block">Sign in with Google</button>
          <br />
          <br />

          <div class="form-group">
            <label>Email address</label>
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
            Sign In
          </button>

          <p class="forgot-password text-right mt-2 mb-4">
            <router-link to="/forgot-password">Forgot password ?</router-link>
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
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/");
          });
        });
    },
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(result => {
            this.$router.replace("/");
            console.log(result);
        });
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
  },
};
</script>