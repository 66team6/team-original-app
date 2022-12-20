<template>
  <section id="v-if-sign-in">
    <div v-if="user !== null">
      <button v-on:click="signOut">サインアウト</button>
      <div>{{ user.displayName }}さん、ログイン完了です。</div>
    </div>
    <div v-else>
      <button v-on:click="signIn">サインイン</button>
      <div>サインインしてください。</div>
    </div>
  </section>
  <button @click="goHomePage">ホームへ戻る</button>
  <div id="profile"></div>
</template>

<script>
import { GoogleAuthProvider } from "firebase/auth"
import { getAuth } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"
import { signInWithRedirect } from "firebase/auth"
import { getRedirectResult } from "firebase/auth"

export default {
  data() {
    return {
      user: null,
      email: "",
    }
  },
  methods: {
    async signIn() {
      const provider = this.provider
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
      const auth = this.auth
      auth.languageCode = "it"
      // To apply the default browser preference instead of explicitly setting it.
      // firebase.auth().useDeviceLanguage();
      provider.setCustomParameters({
        login_hint: "user@example.com",
      })
      await signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          credential.accessToken
          // The signed-in user info.
          this.user = result.user
          console.log(this.user)
          // ...
        })
        .catch((error) => {
          console.log(error)
        })
      // this.goHomePage()
    },
    signOut() {
      this.user = null
      // this.goHomePage()
    },
    redirect() {
      const auth = this.auth
      const provider = this.provider
      signInWithRedirect(auth, provider)
      getRedirectResult(auth)
        .then((result) => {
          this.user = result.user
        })
        .catch((error) => {
          console.log(error)
        })
    },
    goHomePage() {
      this.$router.push({
        name: "home",
        query: { user: this.user.displayName },
      })
    },
  },
  computed: {
    auth() {
      return getAuth()
    },
    provider() {
      return new GoogleAuthProvider()
    },
  },
}
</script>
