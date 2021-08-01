// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyABbE3k9BSC4SZppDDIYL6mRDeBvH7ynYM",
    authDomain: "iotsmartgarden2020.web.app",
    databaseURL: "https://iotsmartgarden2020-default-rtdb.firebaseio.com",
    projectId: "iotsmartgarden2020-default-rtdb",
    storageBucket: "iotsmartgarden2020.appspot.com",
    messagingSenderId: "787710934587"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);


firebase.database().ref('user').once('value', function (snapshot) {

    document.getElementById("login").addEventListener("click", function () {
        var username = document.getElementById("username");
        var password = document.getElementById("password");
        snapshot.forEach(
            function (ChildSnapshot) {
                let name = ChildSnapshot.val().username;
                let pass = ChildSnapshot.val().password;
                let control = ChildSnapshot.val().control;
                if (username.value == name && password.value == pass) {
                    location.href = "control.html";
                    localStorage.setItem('userControl', control);
                } else if (username.value != name && password.value == pass) {
                    username.style.borderColor = "red";
                } else if (password.value != pass && username.value == name) {
                    password.style.borderColor = "red";
                } else if (password.value != pass && username.value != name) {
                    username.style.borderColor = "red";
                }
            }
        );
    });
});