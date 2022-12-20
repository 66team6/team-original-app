<template>
  <button v-on:click="intoCommunity">コミュニティに入る</button>
</template>

<script>
// setDocとupdateDocを使う
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

export default {
  props: ["communityId", "userName"],
  methods: {
    async intoCommunity() {
      const kanyu = doc(db, "communities", this.communityId)
      let team_member = await (await getDoc(kanyu)).data().member
      team_member.push(this.userName)
      updateDoc(kanyu, {
        member: team_member,
      })
    },
  },
}
</script>
