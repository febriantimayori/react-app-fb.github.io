import firebase from 'firebase/compat/app';
import 'firebase/firebase-database-compat';
import { useState, useEffect, useContext, createContext } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCq5dyWsXnJnu8HWD1vT8QuCyYHWw7LVjQ",
  authDomain: "invoicevuex.firebaseapp.com",
  projectId: "invoicevuex",
  storageBucket: "invoicevuex.appspot.com",
  messagingSenderId: "257446835822",
  appId: "1:257446835822:web:9795524f976d5e32a9187f"
};

 // Initialize Firebase
 const fireDb = firebase.initializeApp(firebaseConfig);

 export const AuthContext = createContext()

export const AuthContextProvider = props => {
 const [user, setUser] = useState()
 const [error, setError] = useState()

 useEffect(() => {
   const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
   return () => unsubscribe()
 }, [])
 return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
 const auth = useContext(AuthContext)
 return { ...auth, isAuthenticated: auth.user != null }
}
 export default fireDb.database().ref();