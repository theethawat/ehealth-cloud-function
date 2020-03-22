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
          birthYear = userCollectionData.byear
          console.log("BirthYear" + birthYear)
        })
        console.log(moment().year())
        age = moment().year() - birthYear
        console.log(age)
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

exports.addAgeToHR = functions.firestore
  .document("/heart_rate/{userUUID}")
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
          birthYear = userCollectionData.byear
          console.log("BirthYear" + birthYear)
        })
        console.log(moment().year())
        age = moment().year() - birthYear
        console.log(age)
        db.collection("heart_rate")
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

exports.addAgeToGlucose = functions.firestore
  .document("/glucose/{userUUID}")
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
          birthYear = userCollectionData.byear
          console.log("BirthYear" + birthYear)
        })
        console.log(moment().year())
        age = moment().year() - birthYear
        console.log(age)
        db.collection("glucose")
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

exports.addAgeToSPO2 = functions.firestore
  .document("/spo2/{userUUID}")
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
          birthYear = userCollectionData.byear
          console.log("BirthYear" + birthYear)
        })
        console.log(moment().year())
        age = moment().year() - birthYear
        console.log(age)
        db.collection("spo2")
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
