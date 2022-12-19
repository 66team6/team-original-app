<template>
  <div class="app">
    <button v-on:click="postcommunity">コミュニティ</button>

    <div>
      <input v-model="message" placeholder="コミュニティ名" />
      <input v-model="detail" placeholder="コミュニティの概要" />
    </div>
  </div>
  <!-- <div>{{ communities }}</div> -->
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
  <!-- <div v-for="index in communities.length" v-bind:key="index"> -->
  <!-- <div>{{ communities[index].name }}</div> -->
  <!-- <div class="community_box"> -->
  <!-- <div>{{ communities[index].name }}</div> -->
  <!-- <div class="community_detail">{{ communities[index].detail }}</div> -->
  <!-- <div class="community_detail"> -->
  <!-- {{ communities[index].member.length }}人参加中 -->
  <!-- </div> -->
  <!-- <IntoCommunityVue :communityId="community.id" :userName="user"></IntoCommunityVue> -->
  <!-- </div> -->
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
import IntoCommunityVue from "./IntoCommunity.vue"

export default {
  component: {
    IntoCommunityVue,
  },
  // props: ["userName"],
  data() {
    return {
      communities: [],
      message: "",
      detail: "",
      userName: "kohei",
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
.community_box {
  border: solid;
}

.community_name {
  font-size: large;
}

.community_detail {
  font-size: small;
}
</style>
