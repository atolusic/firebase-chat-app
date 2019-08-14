import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAjFENODBJPqYH0HQvjk1C7PcnPBXaH6ec",
  authDomain: "fir-chat-app-cc041.firebaseapp.com",
  databaseURL: "https://fir-chat-app-cc041.firebaseio.com",
  projectId: "fir-chat-app-cc041",
  storageBucket: "fir-chat-app-cc041.appspot.com",
  messagingSenderId: "737537477701",
  appId: "1:737537477701:web:8e9db15b21113492"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export {
  db,
  firebase,
}
