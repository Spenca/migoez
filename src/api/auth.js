import firebase from "./config";
import { Alert } from "react-native";

export const checkLoginStatus = callback => {
  firebase.auth().onAuthStateChanged(callback);
};

export const getUserId = () => {
  return firebase.auth().currentUser.uid;
};

export const onLogin = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch(error => {
      const { code, message } = error;
      Alert.alert("Error: ", message);
      console.log("Error: ", message);
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
};

export const onRegister = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      Alert.alert("Hooray!", "You're registered");
      console.log("Hooray!", user);
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch(error => {
      const { code, message } = error;
      Alert.alert("Error: ", message);
      console.log("Error: ", message);
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
};

export const onLogout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Logged out");
    })
    .catch(error => {
      const { code, message } = error;
      Alert.alert("Error: ", message);
      console.log("Error: ", message);
    });
};
