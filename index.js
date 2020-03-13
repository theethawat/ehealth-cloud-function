const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp(functions.config().firebase)
let db = admin.firestore()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.testAcception = functions.firestore
  .document("/blood_pressure/{userUUID}")
  .onWrite((change, context) => {
    const newData = change.after.data()
    let ownerUUID = newData.ownerUUID
    let data = {
      ownerUUID: ownerUUID
    }
    db.collection("testing")
      .doc("test2")
      .set(data)
  })
