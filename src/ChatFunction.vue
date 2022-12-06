<template>
  <div class="app">
    <input v-model="chatValue" />
    <button v-on:click="chatTweet">投稿</button>

    <div>
      <p v-for="chat in chats" :key="chat.id">{{ chat.text }}</p>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore"

import { db } from "./firebase"

export default {
  data() {
    return {
      chats: [],
    }
  },
  methods: {
    chatTweet() {
      const chat = { text: this.chatValue }
      addDoc(collection(db, "chats"), chat).then((ref) => {
        this.chats.push({
          id: ref.id,
          ...chat,
        })
      })
    },
  },
  created() {
    getDocs(collection(db, "chats")).then((ref) => {
      for (let i = 0; i < ref.docs.length; i++) {
        this.chats.push(ref.docs[i].data())
      }
    })
  },
}
</script>
