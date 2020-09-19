const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp();

const db =admin.firestore()


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



//this function gets data from the document ->EViT4RDxbCEToQTegUlb in collection -> emergencies
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


//this function gets any new document (emergencyId) from emergencies collection and prints the location
//of the new emergency for now
exports.getEmergency= functions.firestore
    .document('emergencies/{emergencyId}')
    .onCreate((snap, context) => {
        // Get an object representing the document
        const newValue = snap.data();

        // Getting the location of the emergency
        const location = newValue.location;
        //Getting the emergency type
        //const emergencyType = newValue.type;

        console.log(location)
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




