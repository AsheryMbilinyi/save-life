// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const db =admin.firestore()




exports.getEmergency= functions.firestore
    //specifying our emergency collection
    .document('emergencies/EViT4RDxbCEToQTegUlb') //please refer to our cloud firestore database for more info on emergencies attributes
    //getting the entry emergency data
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // Getting the location of the emergency
      const location = newValue.location;
      //Getting the emergency type
      const emergencyType = newValue.type;

      // Getting data from helpers collection to get the nearest helper



      const snapshot = db.collection('helpers').get();

      snapshot.forEach((doc) => {

        //The whole idea here is to get the locations from the helpers and then match
        //to the emergency location(line 22)
        const allInfoAboutHelper = doc.data();
        const helperLocation = allInfoAboutHelper.location;

        /////the codes should continue here







      });









      // perform desired operations ...
    });





