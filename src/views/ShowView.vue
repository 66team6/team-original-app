<template>
  <div>
    <MakeCommunityVue></MakeCommunityVue>
  </div>
  <div v-for="community in communities" v-bind:key="community">
    <div class="community_box">
      <div class="community_name">{{ community.name }}</div>
      <div class="community_detail">{{ community.detail }}</div>
      <div class="community_detail">{{ community.member.length }}人参加中</div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore"

import { db } from "../firebase"
import MakeCommunityVue from "./MakeCommunity.vue"
export default {
  components: {
    MakeCommunityVue,
  },
  data() {
    return {
      communities: [],
    }
  },
  methods: {
    async getLists() {
      const ref = await getDocs(collection(db, "communities"))
      for (let i = 0; i < ref.docs.length; i++) {
        this.communities.push(ref.docs[i].data())
      }
    },
  },
  created() {
    this.getLists()
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
