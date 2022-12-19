<template>
  <div>
    <MakeCommunityVue :user="user"></MakeCommunityVue>
  </div>
  <div v-for="community in communities" :key="community">
    <div>{{ community.name }}</div>
  </div>
  <!-- <button @click="getLists">aa</button> -->
  <!-- <div>{{ communities }}</div> -->
  <!-- <div v-for="index in communities.length" v-bind:key="index"> -->
  <!-- <div>{{ communities[index].detail }}</div> -->
  <!-- <div class="community_box"> -->
  <!-- <div>{{ communities[index].name }}</div> -->
  <!-- <div class="community_detail">{{ communities[index].detail }}</div> -->
  <!-- <div class="community_detail"> -->
  <!-- {{ communities[index].member.length }}人参加中 -->
  <!-- </div> -->
  <!-- <IntoCommunityVue :communityId="community.id" :userName="user"></IntoCommunityVue> -->
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { collection, getDocs } from "firebase/firestore"

import { db } from "../firebase"
import MakeCommunityVue from "./MakeCommunity.vue"
// import IntoCommunityVue from "./IntoCommunity.vue"
export default {
  components: {
    MakeCommunityVue,
    // IntoCommunityVue,
  },
  props: ["user"],
  data() {
    return {
      communities: [],
    }
  },
  methods: {
    async getLists() {
      const x = []
      const ref = await getDocs(collection(db, "communities"))
      for (let i = 0; i < ref.docs.length; i++) {
        x.push(ref.docs[i].data())
      }
      this.communities = x
    },
    reload() {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
  },
  created() {
    getDocs(collection(db, "communities")).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.tweets.push({
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
