<template>
  <div class="app">
    <input v-model="chatValue" />
    <button v-on:click="chatTweet">投稿</button>

    <div>
      <p v-for="chat in chats" :key="chat.id">{{ chat }}</p>
    </div>
  </div>
</template>

<script>
import { doc, collection, setDoc, getDocs } from "firebase/firestore"

import { db } from "./firebase"

export default {
  data() {
    return {
      chats: [],
      chats_id: "",
    }
  },
  methods: {
    chatTweet() {
      this.chats.push(this.chatValue)
      const texts = this.chats
      setDoc(doc(db, "chats", this.chats_id), { texts })
      this.chatValue = ""
    },
  },
  created() {
    const chat_id = this.$route.query.id
    const x = []
    this.chats_id = chat_id
    getDocs(collection(db, "chats"))
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          x.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
      .then(() => {
        for (let i = 0; i < x.length; i++) {
          if (chat_id === x[i].id) {
            this.chats = [...x[i].texts]
            break
          }
        }
      })
  },
}
</script>
