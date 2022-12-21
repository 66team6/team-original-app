<template>
  <div class="app">
    <div class="chatdisplay">
      <p v-for="name in names" :key="name.id" class="namebox">
        {{ name.text }}
      </p>
      <p v-for="chat in chats" :key="chat.id" class="chatbox">
        {{ chat.text }}
      </p>
    </div>
    <footer>
      <input v-model="nameValue" class="namebox" />
      <input v-model="chatValue" class="inputbox" />
      <button v-on:click="chatTweet" class="chatbutton">⛯</button>
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
      names: [],
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
      const name = { text: this.nameValue }
      addDoc(collection(db, "names"), name).then((ref) => {
        this.names.push({
          id: ref.id,
          ...name,
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
    getDocs(collection(db, "names")).then((ref) => {
      for (let i = 0; i < ref.docs.length; i++) {
        this.names.push(ref.docs[i].data())
      }
    })
  },
}
</script>

<style>
footer {
  background-color: #bbbbbb;
}

.inputbox {
  margin: 2em 0 2em 40px;
  padding: 15px;
  border-radius: 30px;
  border: solid 3px #00aaff;
}

.chatbutton {
  position: relative;
  bottom: -10px;
  right: -10px;
  background-color: #fff56c;
  font-size: 30px;
  border-radius: 100% 80px / 80px 100%;
}
.chatbox {
  border: solid;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 20px;
  border: solid 3px #00aaff;
}
.chatdisplay {
  display: flex;
}
</style>
