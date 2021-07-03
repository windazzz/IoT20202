var config = {
    apiKey: "AIzaSyABbE3k9BSC4SZppDDIYL6mRDeBvH7ynYM",
    authDomain: "iotsmartgarden2020.web.app",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://iotsmartgarden2020-default-rtdb.firebaseio.com",
    storageBucket: "iotsmartgarden2020.appspot.com"
};

firebase.initializeApp(config);

var db = firebase.database();

//led
function turnOnLight() {
    var dataRef = db.ref('/control/led');
    dataRef.set(1);
}

function turnOffLight() {
    var dataRef = db.ref('/control/led');
    dataRef.set(0);
}

//end led


//edit pump
function turnOnPump() {
    var dataRef = db.ref('/user/quangtm/id');
    dataRef.set(4);
    // var dataRef = db.ref('/testdata/control/2/led');
    // dataRef.set(1);
}

function turnOffPump() {
    var dataRef = db.ref('/control/pump');
    dataRef.set(0);
}
//end pump

// get temp
// function getTemp() {
//     var dataRef = db.ref('/data/temperature');
//     dataRef.on('value', function(snapshot) {
//         // snapshot.forEach(function(childSnapshot) {
//         var childData = snapshot.val();
//         document.getElementById('temp').innerHTML = childData;
//         // });
//     });
// }
function getTemp() {
    var abc;
    var dataRef = db.ref('/user').childNodes;
    dataRef.on('value', function(snapshot) {
        // snapshot.forEach(function(childSnapshot) {
        var childData = snapshot.val();
        abc = childData;
        document.getElementById('temp').innerHTML = childData;
        // });
    });
    console.log(abc[0]);
}
//end get temp