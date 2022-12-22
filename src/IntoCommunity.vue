<template>
  <link
    href="https://fonts.googleapis.com/css?family=Courgette"
    rel="stylesheet"
  />
  <header>
    <img src="./beacon.png" class="image" />
    <div class="header-logo">Beacon</div>
    <!-- <button v-on:click="intoCommunity" class="commubutton">参加</button> -->
  </header>
</template>

<script>
// setDocとupdateDocを使う
import { doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebase"

export default {
  methods: {
    intoCommunity() {
      setDoc(doc(db, "community", "community-id"), this.$data)

      const commu = addDoc(collection(db, "community"), {
        name: "soccer",
        member: "yuina",
      })
      console.log("Document written with ID:", commu.id)

      const kanyu = doc(db, "community", "community-id")
      updateDoc(kanyu, {
        member: [true, "yuina", "rina"],
      })
    },
  },
}
</script>

<style>
header {
  width: auto;
  height: 100px;
  background-color: #f1f5f7;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
.header-logo {
  font-size: 70px;
  font-family: "Courgette";
  text-align: left;
  margin-left: 20px;
  margin-bottom: 100px;
}

.image {
  text-align: left;
  float: left;
  margin: 12px;
  width: 80px;
  height: 80px;
}

/* .commubutton { */
/* color: #000; */
/* width: 100px; */
/* height: 40px; */
/* font-size: 14px; */
/* background-color: #ffff88; */
/* border-bottom: 5px solid #ccc100; */
/* border-radius: 10px; */
/* font-weight: bold; */
/* margin-left: 1000px; */
/* margin-top: 35px; */
/* } */
</style>
