<template>
  <div>
    <div class="app">
      <div>
        <p v-for="chat in chats" :key="chat.id" class="chatbox">
          {{ chat.text }}by{{ chat.name }}
        </p>
      </div>
    </div>
  </div>
  <footer>
    <input v-model="nameValue" class="inputbox" placeholder="あなたの名前" />
    <input v-model="chatValue" class="inputbox" placeholder="つぶやこう" />
    <button v-on:click="chatTweet" class="chatbutton">投稿</button>
  </footer>
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
    async chatTweet() {
      const chat = { text: this.chatValue, name: this.nameValue }
      this.chats.push(chat)
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

<style>
footer {
  background-color: #f1f5f7;
  position: absolute;
  bottom: 0;
  left: 31%;
  margin: 10px 30px 10px 30px;
}

.inputbox {
  padding: 15px;
  color: #000;
  width: 200px;
  height: 20px;
  font-size: 14px;
  background-color: #ccffff;
  border-bottom: 5px solid #00aaff;
  border-radius: 10px;
  font-weight: bold;
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
}

.chatbutton {
  position: relative;
  bottom: -10px;
  right: -10px;
  color: #000;
  width: 100px;
  height: 40px;
  font-size: 14px;
  background-color: #ffff88;
  border-bottom: 5px solid #ccc100;
  border-radius: 10px;
  font-weight: bold;
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
}

.chatbutton:hover {
  margin-top: 3px;
  color: #000;
  background: #ffff88;
  border-bottom: 2px solid #ccc100;
}

.chatbox {
  border: solid;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 20px;
  border: solid 3px #00aaff;
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
}
</style>
