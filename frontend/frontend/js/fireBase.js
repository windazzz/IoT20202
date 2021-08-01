var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
    apiKey: "AIzaSyABbE3k9BSC4SZppDDIYL6mRDeBvH7ynYM",
    authDomain: "iotsmartgarden2020.firebaseapp.com",
    databaseURL: "https://iotsmartgarden2020.firebaseio.com",
    projectId: "iotsmartgarden2020",
    storageBucket: "iotsmartgarden2020.appspot.com",
    messagingSenderId: "787710934587"
  };
if(!hasInit){
    firebase.initializeApp(config);
    hasInit = true;
}


