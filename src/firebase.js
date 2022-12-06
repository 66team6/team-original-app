import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDbbLRvw1CfsiQpACnnGWs3T-KV_s2KZus",
  authDomain: "double-yakumann.firebaseapp.com",
  projectId: "double-yakumann",
  storageBucket: "double-yakumann.appspot.com",
  messagingSenderId: "125477345177",
  appId: "1:125477345177:web:908e09f60f8d4028a56508",
  measurementId: "G-5TFGZ1JRYB",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
