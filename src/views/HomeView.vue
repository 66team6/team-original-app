<template>
  <button @click="goToLogin">ログインへ</button>
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
