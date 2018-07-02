const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.deleteOldItems = functions.database.ref('/events/{pushId}').onWrite((change) => {
  const ref = change.after.ref.parent; // reference to the parent
  const now = moment().valueOf();
  const oldItemsQuery = ref.orderByChild('endTimeMilliseconds').endAt(now);
  console.log(oldItemsQuery);
  return oldItemsQuery.once('value').then((snapshot) => {
    // create a map with all children that need to be removed
    const updates = {};
    snapshot.forEach(child => {
      updates[child.key] = null;
    });
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
  });
});
