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
  .onWrite((change, context) => {
    const newData = change.after.data()
    let ownerUUID = newData.ownerUUID
    let birthDay, birthMonth, birthYear
    let age = 0
    db.collection(user)
      .where("inputProgramUser", "==", ownerUUID)
      .limit(1)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let userCollectionData = doc.data()
          birthDay = userCollectionData.bDay
          birthMonth = userCollectionData.bMonth
          birthYear = userCollectionData.bYear
        })
        age = moment
          .duration({
            days: birthDay,
            months: birthMonth,
            years: birthYear
          })
          .years()
      })
      .catch(err => {
        console.log(err)
      })
    return change.after.ref.set(
      {
        userAge: age
      },
      { merge: true }
    )
  })
