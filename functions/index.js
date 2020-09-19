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


function calcCrow(lat1, lon1, lat2, lon2)
{
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value)
{
    return Value * Math.PI / 180;
}

console.log(calcCrow(59.3293371,13.4877472,59.3225525,13.4619422).toFixed(3));



exports.getEmergency= functions.firestore
    .document('emergencies/{emergencyId}')
    .onCreate((snap, context) => {
        // Get an object representing the document
        const newValue = snap.data();

        // Getting the location of the emergency
        const location = newValue.location;


        console.log(location)
        var helper_list = {}
        const lat_reference = location._latitude  // latitude
        const long_reference = location._longitude // longitude



        // const snapshot = db.collection('helpers').get();
        const getHelpers = () => {
            return db.collection('helpers')
                .get()
                .then(querySnapshot => {
                    const users = [];
                    querySnapshot.forEach(doc => {
                        users.push({
                            data: doc.data(),
                            id: doc.id,
                            ref: doc.ref
                        });
                    });
                    return users;
                });
        };


        // eslint-disable-next-line promise/catch-or-return,promise/always-return
        getHelpers().then(helperDocs => {
            //console.log(helperDocs);
            helperDocs.map(doc => {
                //console.log('name: ', doc.name);
                //console.log("Esra");
                const allInfoAboutHelper = doc.data;
                const helperLocation = allInfoAboutHelper.location;
                //console.log("Esra");
                //console.log(helperLocation._latitude);
                const helperId = doc.id;
                //const distance = calcCrow(lat_reference, long_reference, helperLocation._latitude, helperLocation._longitude).toFixed(3);
                const distance = calcCrow(1, 2, 3, 4).toFixed(3);
                helper_list[helperId] = distance;
                //console.log("Esra");
                //console.log(helper_list[helperId]);

            });
        });

        //console.log("Esra");
        console.log(helper_list);



        // convert dictionary key-value pairs into an array of pairs
        var items = Object.keys(helper_list).map(function(key){
            return [key, helper_list[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
            return first[1] - second[1];
        });

        const k = 5
        // Create a new array with only the first 5 items
        var kNearestIds = items.map(function(v){ return v[0] }).slice(0, k)
        console.log(kNearestIds);
        console.log("Esra")
        return kNearestIds






    });





