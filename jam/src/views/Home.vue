²<template>
    <b-row>
      <b-col cols="4" class="back" style="padding-top: 10%">
        <b-row>
          <b-col cols="3"></b-col>
          <b-col cols="6">
            <h3 style="color: white; background: rgba(0, 0, 0, 0.5)">{{ counter }}</h3>
          </b-col>
          <b-col cols="3"></b-col>
        </b-row>
        <Clock
          v-on:childToParent="onChildClick"
          v-on:increment="counter++"
        ></Clock>
      </b-col>
      <b-col cols="8">
        <Shop/>
        <button type="button" class="btn btn-primary" @click="editUser()">
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
      fromChild: "",
      counter: 0,
      pastMaterial: {
        flint: 0,
        fire: 0,
        bow: 0,
        tissage: 0,
        town: 0,
        wheel: 0,
        writing: 0,
      },
    };
  },
  methods: {
    onChildClick(value) {
      this.fromChild = value;
    },
    editUser() {
      const db = this.$firebase.firestore();
      db.collection("users")
        .doc(this.user.uid)
        .set({
          userVerified: this.userVerified,
          createdID: this.user.uid,
          clicks: this.counter,
          time: this.counter,
          past: this.pastMaterial,
        })
        .then(() => {
          location.reload();
        });
    },
    reloadPage() {
      location.reload();
    },
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
          });
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style scoped>
.thumbnail:hover {
  width: 41%;
}
.back {
  background-image: url('https://i.pinimg.com/originals/af/54/2d/af542d89a7722b3ba7d078247d3314fe.gif');
  height: 89vh;
}
</style>
