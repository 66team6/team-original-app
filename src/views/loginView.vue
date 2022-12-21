<template>
  <header>
    <div class="appphoto"></div>
    <div class="appname">Beacon</div>
  </header>
  <main>
    <div class="photo"></div>
    <div class="login">
      <div class="loginicon"></div>
      <div class="loginfont">ログイン</div>
      <section id="v-if-sign-in" class="loginbutton">
        <div v-if="user !== null">
          <button class="btn btn--yellow btn--cubic" v-on:click="signOut">
            サインアウト
          </button>
          <div class="direction">
            {{ user.displayName }}さん、ログイン完了です。
          </div>
        </div>
        <div v-else>
          <button class="btn btn--yellow btn--cubic" v-on:click="signIn">
            サインイン
          </button>
          <div class="direction">サインインしてください</div>
        </div>
      </section>
      <button class="btn btn--yellow2 btn--cubic" @click="goHomePage">
        ホームへ
      </button>
      <div id="profile"></div>
    </div>
  </main>
  <footer>This Application is made by: Reiga, Kanna, Rina, Yuina</footer>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Caveat&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  padding-top: 0px;
  padding-left: 30px;
  /* left: 0px;
  top: 0px; */
  /* background-color: aqua; */
}
.appphoto {
  background-image: url(C:\Users\maseg\Desktop\webex\team-original-app\Component_17.png);
  background-size: contain;
  width: 80px;
  height: 80px;
  margin-right: 20px;
  margin-top: 10px;
}
.appname {
  font-size: 90px;
  font-family: "Caveat", cursive;
  /* padding-top: px; */
}
main {
  width: 100%;
  height: 410px;
  background: #f1f5f7;
  display: flex;
  /* justify-content: center; */
}
.photo {
  margin: 30px;
  width: 40%;
  height: 95%;
  background-image: url(C:\Users\maseg\Desktop\webex\team-original-app\Rectangle_54.png);
  background-size: contain;
  border-radius: 15px;

  /* display: inline-block; */
}
.login {
  /* display: inline-block; */
  padding-top: 30px;
  padding-left: 200px;
  padding-right: 221px;
  /* border-top: 30px solid #ffffff; */
  border-right: 30px solid #ffffff;
  border-left: 30px solid #ffffff;
}
.loginicon {
  background-image: url(C:\Users\maseg\Desktop\webex\team-original-app\ic_baseline-person-pin.png);
  width: 38%;
  height: 19%;
  background-size: cover;
  margin-left: 70px;
}
.loginfont {
  font-size: 30px;
  font-weight: bold;
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
}
.loginbutton {
  padding-top: 40px;
  font-weight: bold;

  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
}
.btn--yellow {
  color: #000;
  width: 100px;
  height: 40px;
  font-size: 14px;
  background-color: #ffff88;
  border-bottom: 5px solid #ccc100;
  border-radius: 10px;
  font-weight: bold;
}
.direction {
  margin-top: 15px;
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
  font-size: large;
}
.btn--yellow2 {
  margin-top: 15px;
  font-weight: bold;

  width: 100px;
  height: 40px;
  color: #000;
  font-size: 14px;
  background-color: #ffff88;
  border-radius: 10px;
  border-bottom: 5px solid #ccc100;
}

.btn--yellow:hover {
  margin-top: 3px;
  color: #000;
  background: #ffff88;
  border-bottom: 2px solid #ccc100;
}
.btn--yellow2:hover {
  margin-top: 3px;
  color: #000;
  background: #ffff88;
  border-bottom: 2px solid #ccc100;
}
footer {
  width: 100%;
  height: 43px;
  background-color: #ffff88;
  padding-top: 14px;
  /* font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体"; */
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
