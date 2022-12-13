<template>
  <div class="app">
    <button v-on:click="postcommunity">コミュニティ</button>

    <div>
      <input v-model="message" placeholder="コミュニティ名" />
      <input v-model="detail" placeholder="コミュニティの概要" />
    </div>
  </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  data() {
    return {
      communities: [],
      message: "",
      detail: "",
    }
  },
  methods: {
    postcommunity() {
      const community = {
        detail: this.detail,
        name: this.message,
        member: [],
      }
      addDoc(collection(db, "communities"), community)
    },
  },
  created() {
    getDocs(collection(db, "communities")).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.community.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    })
  },
}
</script>
