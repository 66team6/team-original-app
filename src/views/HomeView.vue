<template>
  <div class="header">
    <div class="appname">アプリ名</div>
  </div>
  <div class="main">
    <div class="photo"></div>
    <div class="login">
      <button @click="goToLogin">ログインへ</button>
      <h1>{{ message }}</h1>
      <div class="home">
        <MakeCommunityVue :userName="user"></MakeCommunityVue>
      </div>
    </div>
    <div class="footer">
      This Application is made by:Reiga, Kanna, Rina and Yuina.
    </div>
  </div>
</template>
<style>
.header {
  color: aqua;
  position: absolute;
  width: 1440px;
  height: 120px;
  left: 0px;
  top: 0px;

  background: #ffffff;
}
</style>

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
