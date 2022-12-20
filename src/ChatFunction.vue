<template>
  <div class="app">
    <div>
      <p v-for="chat in chats" :key="chat.id" class="chatbox">
        {{ chat.text }}
      </p>
    </div>
    <footer>
      <input v-model="chatValue" class="inputbox" />
      <button v-on:click="chatTweet" class="chatbutton"></button>
    </footer>
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

<style>
.app {
  background-color: #ffff88;
}

.inputbox {
  margin: 2em 0 2em 40px;
  padding: 15px;
  border-radius: 30px;
}

.chatbutton {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  bottom: -10px;
  right: -10px;
}
.chatbox {
  border: solid;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
