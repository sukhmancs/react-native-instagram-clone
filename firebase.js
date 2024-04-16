import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC5j4xfCPi00WsS0DYxm-o4JTH3swjTXZo",
  authDomain: "react-native-ig-clone-7e287.firebaseapp.com",
  projectId: "react-native-ig-clone-7e287",
  storageBucket: "react-native-ig-clone-7e287.appspot.com",
  messagingSenderId: "692960787665",
  appId: "1:692960787665:web:08131273ae129d1d12d9f0"
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export { firebase, db }
