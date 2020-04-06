import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAlGnXWiLoZW8NP5-PvEHyNZnySnEvnQiw",
  authDomain: "men-collections.firebaseapp.com",
  databaseURL: "https://men-collections.firebaseio.com",
  projectId: "men-collections",
  storageBucket: "men-collections.appspot.com",
  messagingSenderId: "709674616705",
  appId: "1:709674616705:web:47cc5bbcc2531eb4890a80",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const sigInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
