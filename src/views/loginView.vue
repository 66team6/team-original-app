<template>
  <header>
    <div class="appname">Beacon</div>
  </header>
  <main>
    <div class="photo"></div>
    <div class="login">
      <section id="v-if-sign-in" class="signin">
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
    </div>
  </main>
  <footer>This Application is made by: Reiga, Kanna, Rina, Yuina</footer>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header {
  width: 100%;
  height: 100px;
  left: 0px;
  top: 0px;
  /* background-color: aqua; */
}
main {
  width: 100%;
  height: 410px;
  background: rgba(217, 217, 217, 0.4);
  display: flex;
  /* justify-content: center; */
}
.photo {
  margin: 20px;
  width: 55%;
  height: 95%;
  background-image: url(C:\Users\maseg\Desktop\webex\team-original-app\1.jpg);
  background-size: cover;
  border-radius: 15px;
  /* display: inline-block; */
}
.login {
  /* display: inline-block; */
  margin: 50px;
}

footer {
  width: 100%;
  height: 43px;
  background-color: blueviolet;
}
</style>

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
