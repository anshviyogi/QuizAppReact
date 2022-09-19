import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCdYrlAnqR-XUruCeA7k4zMoAtQTBPjBq8",
    authDomain: "stackoverflow-clone-be118.firebaseapp.com",
    projectId: "stackoverflow-clone-be118",
    storageBucket: "stackoverflow-clone-be118.appspot.com",
    messagingSenderId: "858655663971",
    appId: "1:858655663971:web:ef735bd691dc7187499556",
    measurementId: "G-XH8TGQ0NY2"
  };
  
  const app = initializeApp(firebaseConfig)
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  export {auth,provider}