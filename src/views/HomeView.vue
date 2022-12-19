<template>
  <button @click="goToLogin">ログインへ</button>
  <!-- <h1>{{ user }}</h1> -->
  <h1>{{ message }}</h1>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ShowViewVue></ShowViewVue>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue"
// import loginViewVue from "./loginView.vue"
import ShowViewVue from "./ShowView.vue"
export default {
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
  components: {
    ShowViewVue,
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
