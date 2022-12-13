<template>
  <button v-on:click="intoCommunity">コミュニティに入る</button>
</template>

<script>
// setDocとupdateDocを使う
import { doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebase"

export default {
  methods: {
    intoCommunity() {
      setDoc(doc(db, "community", "community-id"), this.$data)

      const commu = addDoc(collection(db, "community"), {
        name: "soccer",
        member: "yuina",
      })
      console.log("Document written with ID:", commu.id)

      const kanyu = doc(db, "community", "community-id")
      updateDoc(kanyu, {
        member: [true, "yuina", "rina"],
      })
    },
  },
}
</script>
