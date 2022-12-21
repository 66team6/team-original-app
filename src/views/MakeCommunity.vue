<template>
  <div class="header">
    <div class="image">
      <img
        src="https://cdn.discordapp.com/attachments/1039136325720342558/1054936411398230077/Component_17.png"
        width="60"
        height="60"
      />
    </div>
    <div class="header-logo">Beacon</div>
  </div>

  <link
    href="https://fonts.googleapis.com/css2?family=Caveat&display=swap%27"
    rel="stylesheet"
  />
  <div class="app">
    <button class="button" v-on:click="postcommunity">作成</button>

    <div>
      <input class="textbox" v-model="message" placeholder="コミュニティ名" />
      <input
        class="textbox2"
        v-model="detail"
        placeholder="コミュニティの概要"
      />
    </div>
  </div>
  <div v-for="community in communities" :key="community">
    <div class="community_box">
      <div class="community_name">{{ community.name }}</div>
      <div class="community_detail">{{ community.detail }}</div>
      <div class="community_detail">{{ community.member.length }}人参加中</div>
      <button
        v-if="!community.member.includes(userName)"
        v-on:click="intoCommunity(community.id)"
      >
        コミュニティに入る
      </button>
      <button v-else @click="gochat(community.id)">チャットへ参加</button>
    </div>
  </div>
  <div class="footer">
    <div class="footer-logo">made by ...</div>
  </div>
</template>

<script>
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore"
import { db } from "../firebase"

export default {
  props: ["userName"],
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
    async intoCommunity(communityId) {
      const kanyu = doc(db, "communities", communityId)
      let team_member = await (await getDoc(kanyu)).data().member
      team_member.push(this.userName)
      console.log(team_member)
      await updateDoc(kanyu, {
        member: team_member,
      })
      await this.reload()
    },
    gochat(communityId) {
      this.$router.push({
        name: "chat",
        query: { id: communityId },
      })
    },
  },
  created() {
    getDocs(collection(db, "communities")).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.communities.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    })
    // this.getLists()
    // this.communities.splice()
  },
}
</script>
<style scoped>
.button {
  width: 80px;
  height: 50px;
  border-radius: 10px;
}
.textbox {
  width: 300px;
  height: 50px;
  margin: 10px;
  border-radius: 10px;
}

.textbox2 {
  width: 500px;
  height: 50px;
  border-radius: 10px;
}

.community_box {
  border: solid;
  border-radius: 25px;
  background-color: #66ccff;
  width: 85%;
  height: 170px;
  margin: 20px auto;
  padding-top: 20px;
}

.community_name {
  border-radius: 15px;
  font-size: 20px;
  background-color: #ff8;
  margin: auto;
  padding: 5px;
  width: 30%;
}

.community_detail {
  font-size: 15px;
  margin: 10px;
}

.footer {
  width: auto;
  height: 100px;
  background-color: #d9d9d9;
}
</style>
