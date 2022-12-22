<template>
  <header>
    <div class="image">
      <img
        src="https://cdn.discordapp.com/attachments/1039136325720342558/1054936411398230077/Component_17.png"
        width="60"
        height="60"
      />
    </div>
    <div class="image2">
      <img
        src="https://cdn.discordapp.com/attachments/1039136325720342558/1054751593905524847/ic_baseline-person-pin.png"
        width="60"
        height="60"
      />
    </div>

    <div class="header-logo">Beacon</div>
  </header>

  <link
    href="https://fonts.googleapis.com/css2?family=Caveat&display=swap%27"
    rel="stylesheet"
  />
  <button class="button1" @click="goToLogin">ログインへ</button>
  <h1>{{ message }}</h1>
  <div class="home">
    <MakeCommunityVue :userName="user"></MakeCommunityVue>
  </div>
</template>

<script>
import MakeCommunityVue from "./MakeCommunity.vue"
export default {
  components: {
    MakeCommunityVue,
  },
  name: "HomeView",
  data() {
    return {
      user: "",
    }
  },
  methods: {
    getName(value) {
      this.user = value
    },
    goToLogin() {
      this.$router.push({ name: "login" })
    },
  },
  // props: ["user"],
  async created() {
    this.user = await this.$route.query.user

    console.log(this.user)
  },
  computed: {
    message() {
      if (this.user.length) {
        return this.user + "さんこんにちは"
      } else {
        return "ログインしてください"
      }
    },
  },
}
</script>
<style scoped>
header {
  width: auto;
  height: 100px;
  background-color: #f1f5f7;
  margin: 0;
}

.header-logo {
  font-size: 50px;
  font-family: "Caveat", cursive;
  text-align: left;
  margin-left: 100px;
  padding-top: 20px;
}

.image {
  text-align: left;
  float: left;
  margin: 20px;
}

.image2 {
  text-align: left;
  float: right;
  margin: 20px;
}

.button1 {
  color: #000;
  width: 150px;
  height: 70px;
  font-size: 17px;
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  background-color: #ffff88;
  border-bottom: 5px solid #ccc100;
  border-radius: 10px;
  font-weight: bold;
  margin-top: 30px;
}

h1 {
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  border-bottom: 5px solid #f1f5f7;
  padding-bottom: 16px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
