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
  props: ["user"],
  data() {
    return {
      communities: [],
      message: "",
      detail: "",
    }
  },
  methods: {
    async postcommunity() {
      const community = {
        detail: this.detail,
        name: this.message,
        member: [this.user],
      }
      await addDoc(collection(db, "communities"), community)
      this.reload()
    },
    reload() {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
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
