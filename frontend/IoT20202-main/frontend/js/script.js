$(document).ready(function() {
    checkTemp();
    checkHumidity();
    checkLed();
});


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

// quạt
function checkTemp() {
    var dataRef = db.ref('/test/device/1/data/temperature');
    dataRef.on('value', function(snapshot) {
        // snapshot.forEach(function(childSnapshot) {
        var childData = snapshot.val();
        document.getElementById('temp').innerHTML = childData;
        // });
        if(childData < 10) {
            document.getElementById('tempAlert').innerHTML = 'Quá lạnh';
        } else if(childData >= 10 && childData <= 35) {
            document.getElementById('tempAlert').innerHTML = 'Bình thường';
        } else if(childData > 35) {
            document.getElementById('tempAlert').innerHTML = 'Quá nóng';
        }
    });
    var panRef = db.ref('/test/device/1/control/servo');
    panRef.on('value', function(snapshot) {
        // snapshot.forEach(function(childSnapshot) {
        var childData = snapshot.val();
        if(childData == 0) {
            document.getElementById('tempControl').innerHTML = 'Đang tắt';
            document.getElementById('turnOnPan').style.display = "block";
            document.getElementById('turnOffPan').style.display = "none";
        } else {
            document.getElementById('tempControl').innerHTML = 'Đang bật';
            document.getElementById('turnOnPan').style.display = "none";
            document.getElementById('turnOffPan').style.display = "block";
        }
    });
}

function turnOnPan() {
    var dataRef = db.ref('/test/device/1/control/servo');
    dataRef.set(1);
    document.getElementById('tempControl').innerHTML = 'Đang bật';
    document.getElementById('turnOnPan').style.display = "none";
    document.getElementById('turnOffPan').style.display = "block";
}

function turnOffPan() {
    var dataRef = db.ref('/test/device/1/control/servo');
    dataRef.set(0);
    document.getElementById('tempControl').innerHTML = 'Đang tắt';
    document.getElementById('turnOnPan').style.display = "block";
    document.getElementById('turnOffPan').style.display = "none";
}



// vòi nước
function checkHumidity() {
    var dataRef = db.ref('/test/device/1/data/humid');
    dataRef.on('value', function(snapshot) {
        // snapshot.forEach(function(childSnapshot) {
        var childData = snapshot.val();
        document.getElementById('humidityPercent').innerHTML = childData;
        // });
        if(childData < 0.5) {
            document.getElementById('humidityAlert').innerHTML = 'Quá khô';
        } else if(childData >= 0.5 && childData <= 2) {
            document.getElementById('humidityAlert').innerHTML = 'Bình thường';
        } else if(childData > 2) {
            document.getElementById('humidityAlert').innerHTML = 'Quá ẩm';
        }
    });
    var panRef = db.ref('/test/device/1/control/pump');
    panRef.on('value', function(snapshot) {
        // snapshot.forEach(function(childSnapshot) {
        var childData = snapshot.val();
        if(childData == 0) {
            document.getElementById('humidityControl').innerHTML = 'Đang tắt';
            document.getElementById('turnOnPump').style.display = "block";
            document.getElementById('turnOffPump').style.display = "none";
        } else {
            document.getElementById('humidityControl').innerHTML = 'Đang bật';
            document.getElementById('turnOnPump').style.display = "none";
            document.getElementById('turnOffPump').style.display = "block";
        }
    });
    console.log(document.cookie)
}



function turnOnPump() {
    var dataRef = db.ref('/test/device/1/control/pump');
    dataRef.set(1);
    document.getElementById('humidityControl').innerHTML = 'Đang bật';
    document.getElementById('turnOnPump').style.display = "none";
    document.getElementById('turnOffPump').style.display = "block";
}

function turnOffPump() {
    var dataRef = db.ref('/test/device/1/control/pump');
    dataRef.set(0);
    document.getElementById('humidityControl').innerHTML = 'Đang tắt';
    document.getElementById('turnOnPump').style.display = "block";
    document.getElementById('turnOffPump').style.display = "none";
}

// led
// vòi nước
function checkLed() {
    var dataRef = db.ref('/test/device/1/data/light');
    dataRef.on('value', function(snapshot) {
        // snapshot.forEach(function(childSnapshot) {
        var childData = snapshot.val();
        console.log(childData);
        document.getElementById('ledStatus').innerHTML = childData;
        // });
        if(childData < 0.5) {
            document.getElementById('ledAlert').innerHTML = 'Tối';
        } else if(childData >= 0.5 && childData <= 2) {
            document.getElementById('ledAlert').innerHTML = 'Sắp tối';
        } else if(childData > 2) {
            document.getElementById('ledAlert').innerHTML = 'Sáng';
        }
    });
    var ledRef = db.ref('/test/device/1/control/led');
    ledRef.on('value', function(snapshot) {
        // snapshot.forEach(function(childSnapshot) {
        var childData = snapshot.val();
        if(childData == 0) {
            document.getElementById('ledControl').innerHTML = 'Đang tắt';
            document.getElementById('turnOnLed').style.display = "block";
            document.getElementById('turnOffLed').style.display = "none";
        } else {
            document.getElementById('ledControl').innerHTML = 'Đang bật';
            document.getElementById('turnOnLed').style.display = "none";
            document.getElementById('turnOffLed').style.display = "block";
        }
    });
}



function turnOnLed() {
    var dataRef = db.ref('/test/device/1/control/led');
    dataRef.set(1);
    document.getElementById('ledControl').innerHTML = 'Đang bật';
    document.getElementById('turnOnLed').style.display = "none";
    document.getElementById('turnOffLed').style.display = "block";
}

function turnOffLed() {
    var dataRef = db.ref('/test/device/1/control/led');
    dataRef.set(0);
    document.getElementById('ledControl').innerHTML = 'Đang tắt';
    document.getElementById('turnOnLed').style.display = "block";
    document.getElementById('turnOffLed').style.display = "none";
}

// //led
// function turnOnLight() {
//     var dataRef = db.ref('/control/led');
//     dataRef.set(1);
// }

// function turnOffLight() {
//     var dataRef = db.ref('/control/led');
//     dataRef.set(0);
// }

// //end led


// //edit pump
// function turnOnPump() {
//     var dataRef = db.ref('/user/quangtm/id');
//     dataRef.set(4);
//     // var dataRef = db.ref('/testdata/control/2/led');
//     // dataRef.set(1);
// }

// function turnOffPump() {
//     var dataRef = db.ref('/control/pump');
//     dataRef.set(0);
// }
// //end pump

// // get temp
// function getTemp() {
//     var dataRef = db.ref('/data/temperature');
//     dataRef.on('value', function(snapshot) {
//         // snapshot.forEach(function(childSnapshot) {
//         var childData = snapshot.val();
//         document.getElementById('temp').innerHTML = childData;
//         // });
//     });
// }
// //end get temp

// //test user
// // function getTemp() {
// //     var abc;
// //     var dataRef = db.ref('/user').childNodes;
// //     dataRef.on('value', function(snapshot) {
// //         // snapshot.forEach(function(childSnapshot) {
// //         var childData = snapshot.val();
// //         abc = childData;
// //         document.getElementById('temp').innerHTML = childData;
// //         // });
// //     });
// //     console.log(abc[0]);
// // }