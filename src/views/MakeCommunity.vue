<template>
  <div class="app">
    <div class="memo">ーー自分の好きなコミュニティを作りましょう！ーー</div>
    <div>
      <input class="textbox" v-model="message" placeholder="コミュニティ名" />
      <input
        class="textbox2"
        v-model="detail"
        placeholder="コミュニティの概要"
      />
      <button class="button" v-on:click="postcommunity">作成する</button>
    </div>
  </div>
  <div v-for="community in communities" :key="community">
    <div class="community_box">
      <div class="community_name">{{ community.name }}</div>
      <div class="community_detail">{{ community.detail }}</div>
      <div class="community_detail">{{ community.member.length }}人参加中</div>
      <button
        class="intobtn"
        v-if="!community.member.includes(userName)"
        v-on:click="intoCommunity(community.id)"
      >
        コミュニティに入る
      </button>

      <button class="chatbtn" v-else @click="gochat(community.id)">
        チャットへ参加する
      </button>
    </div>
  </div>
  <div class="footer">
    <div class="footer-logo">
      This Application is made by : Reiga, Kanna, Rina, Yuina
    </div>
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
        member: [this.userName],
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
.app {
  margin: 0;
  padding: 0;
}

.memo {
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
}
.button {
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  width: 120px;
  height: 56px;
  border-radius: 30px;
  background-color: #0587ff;
  border-bottom: 5px solid #012da7;
  border-right: #0587ff;
  border-top: #0587ff;
  border-left: #0587ff;
  font-weight: bold;
  font-size: 17px;
  color: #ffffff;
  margin-left: 10px;
}
.textbox {
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  font-size: 15px;
  width: 300px;
  height: 50px;
  margin: 10px 10px 2px 10px;
  border-radius: 10px;
}

.textbox2 {
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  font-size: 15px;
  width: 500px;
  height: 50px;
  border-radius: 10px;
}

.intobtn {
  width: 200px;
  height: 50px;
  border-radius: 30px;
  background-color: #0587ff;
  border-bottom: 5px solid #012da7;
  border-right: #0587ff;
  border-top: #0587ff;
  border-left: #0587ff;
  font-weight: bold;
  font-size: 15px;
  color: #ffffff;
  margin-left: 10px;
}

.chatbtn {
  width: 200px;
  height: 50px;
  border-radius: 30px;
  background-color: #0587ff;
  border-bottom: 5px solid #012da7;
  border-right: #0587ff;
  border-top: #0587ff;
  border-left: #0587ff;
  font-weight: bold;
  font-size: 15px;
  color: #ffffff;
  margin-left: 10px;
}

.community_box {
  border: solid;
  border-radius: 25px;
  background-color: #66ccff;
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  width: 80%;

  margin: 32px auto;
  padding-top: 15px;
  padding-bottom: 15px;
}

.community_name {
  border-radius: 15px;
  font-size: 20px;
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  font-weight: bold;
  background-color: #ff8;
  margin: auto;
  padding: 5px;
  width: 30%;
}

.community_detail {
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  font-size: 15px;
  font-weight: bold;
  margin: 8px 70px;
  line-height: 1.7;
}

.footer {
  width: 1440px;
  height: 80px;
  background-color: #f1f5f7;
  margin: 0;
}

.footer-logo {
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  font-size: 15px;
  padding-top: 28px;
}
</style>
