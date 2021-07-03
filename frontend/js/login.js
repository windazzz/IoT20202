function validateLogin() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    function getTemp() {
        var abc;
        var dataRef = db.ref('/data/temperature');
        dataRef.on('value', function(snapshot) {
            // snapshot.forEach(function(childSnapshot) {
            var childData = snapshot.val();
            abc = childData;
            document.getElementById('temp').innerHTML = childData;
            // });
        });
        console.log(abc);
    }
    // if() {
    //     return true;
    // } else {
    //     return false;
    // }
}