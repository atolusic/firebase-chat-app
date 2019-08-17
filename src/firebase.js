import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
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
const rtdb = firebase.database()

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  }

  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  }

  const isOfflineForFirestore= {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  }

  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  }

  const rtdbRef = rtdb.ref(`/status/${user.uid}`)
  const userDoc = db.doc(`/users/${user.uid}`)

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore,
      })
      return
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB)
    rtdbRef.set(isOnlineForRTDB)
    userDoc.update({
      status: isOnlineForFirestore,
    })
  })
}

export {
  db,
  firebase,
}
