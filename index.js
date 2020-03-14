const functions = require("firebase-functions")
const admin = require("firebase-admin")
let moment = require("moment")
admin.initializeApp(functions.config().firebase)
let db = admin.firestore()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addAgeToBP = functions.firestore
  .document("/blood_pressure/{userUUID}")
  .onCreate((snap, context) => {
    const newData = snap.data()
    let ownerUUID = newData.ownerUUID
    let birthYear
    let age = 0
    let id = snap.id

    console.log("OwnerUUID" + ownerUUID)

    db.collection("user")
      .where("inputProgramUser", "==", ownerUUID)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("Data in User Table is Empty")
        }
        snapshot.forEach(doc => {
          let userCollectionData = doc.data()
          birthYear = userCollectionData.bYear
        })
        let date = Date()
        age = date.getFullYear() - birthYear
        db.collection("blood_pressure")
          .doc(id)
          .update({
            age: age
          })
        return Promise
      })
      .catch(err => {
        console.log(err)
      })
  })
