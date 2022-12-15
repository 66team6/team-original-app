<template>
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
  components: {
    ShowViewVue,
  },
}
</script>
