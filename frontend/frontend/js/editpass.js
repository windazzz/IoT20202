var firebaseConfig = {
    apiKey: "AIzaSyABbE3k9BSC4SZppDDIYL6mRDeBvH7ynYM",
    authDomain: "iotsmartgarden2020.web.app",
    databaseURL: "https://iotsmartgarden2020-default-rtdb.firebaseio.com",
    projectId: "iotsmartgarden2020-default-rtdb",
    storageBucket: "iotsmartgarden2020.appspot.com",
    messagingSenderId: "787710934587"
};
firebase.initializeApp(firebaseConfig);

var nameV, usernameV, passV;

function Ready(){
nameV = document.getElementById('name').value;
usernameV = document.getElementById('username').value;
passV = document.getElementById('newpass').value;
}

document.getElementById('insert').onclick = function(){
Ready();
firebase.database().ref('user1/' + nameV).set({
    username: usernameV,
    password: passV
});
}
document.getElementById('update').onclick = function(){
firebase.database().ref('user1').once('value', function(snapshot){
    var username = document.getElementById("username");
    var oldpass = document.getElementById("oldpass");
    snapshot.forEach(
        function(ChildSnapshot){
        let name = ChildSnapshot.val().username;
        let old = ChildSnapshot.val().password;
        if (username.value==name && oldpass.value == old){  
            Ready();
            firebase.database().ref('user1/' + nameV).update({
                password: passV
            });
        }
        }
    );
    
});
}