// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const db =admin.firestore()


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// exports.writeToFirestore = functions.firestore
//     .document('emergencies/EViT4RDxbCEToQTegUlb')
//     .onWrite((change, context) => {
//         db.doc('helpers/f5qN3KANbjLGphglgEIM').set({
//
//             'city' : 'zurich',
//             'country' : 'CH',
//             'location' : '[78° N, 7° E]',
//             'name' : 'mark',
//             'phone' : '7777777',
//             'speciality': 'med'
//
//              });
//
//         document.write("hellooo")
//     });


exports.getData = functions.https.onRequest((req, res) => {
    const docRef = db.collection('emergencies').doc('EViT4RDxbCEToQTegUlb');
    //console.log(docRef)
    const getDoc = docRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document for hackZurich!');
                return res.send('Not Found')
            }
            console.log(doc.data());
            return res.send(doc.data());
        })
        .catch(err => {
            console.log('Error getting document', err);
        });



});



exports.getEmergency= functions.firestore
    //specifying our emergency collection
    .document('emergencies/{emergencyId}') //we need a wildercard {emergencyId} to specify any new document created, not sure if this is right
    .onCreate((snap, context) => {
        // Get an object representing the document
        const newValue = snap.data();

        // Getting the location of the emergency
        const location = newValue.location;
        //Getting the emergency type
        //const emergencyType = newValue.type;

        document.write(location)
        //
        // // Getting data from helpers collection to get the nearest helper
        //
        //
        // const snapshot = db.collection('helpers').get();
        //
        //
        // //should we create a array here to store all helpers objects
        //
        // snapshot.forEach((doc) => {
        //
        //     //The whole idea here is to get the locations from the helpers and then match
        //     //to the emergency location(line 22)
        //     const allInfoAboutHelper = doc.data();
        //     const helperLocation = allInfoAboutHelper.location;
        //
        //     /////the codes should continue here
        //
        // });

        // perform desired operations ...
    });







