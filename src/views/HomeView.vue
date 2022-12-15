<template>
  <h1>{{ user }}さんこんにちは</h1>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ShowViewVue></ShowViewVue>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue"
import ShowViewVue from "./ShowView.vue"
export default {
  name: "HomeView",
  data() {
    return {
      user: "",
    }
  },
  components: {
    ShowViewVue,
  },
  // props: ["user"],
  async created() {
    this.user = await this.$route.query.user

    console.log(this.user)
  },
}
</script>
