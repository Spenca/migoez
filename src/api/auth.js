import firebase from "./config";

export const checkLoginStatus = callback => {
  firebase.auth().onAuthStateChanged(callback);
};

function onAuthStateChanged(callback) {
  delay(1000)
  const user = "John Doe"
  callback(user)
}

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
      console.log("Hooray!", user);
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch(error => {
      const { code, message } = error;
      console.log("Oh no", error);
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
      console.log("Oh no", error);
    });
};
