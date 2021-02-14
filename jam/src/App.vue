<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #2c2f33">
        <div>
          <a class="navbar-brand" style="color: #ffffff" href="/">A journey through the time</a>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/"></router-link>
          </li>
        </ul>
        <form v-if="user == null" class="form-inline my-2 my-lg-0">
          <router-link class="nav-link" to="/login">Sign In</router-link>
          <router-link class="nav-link" to="/register">Register</router-link>
        </form>
        <form v-if="user != null" class="form-inline my-2 my-lg-0">
          <router-link class="nav-link" to="/profile">Profile</router-link>
          <button type="button" class="btn btn-danger" @click="logOut()">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-person-dash-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5-.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </form>
      </div>
    </nav>
   <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
      testDocument: []
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
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
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
