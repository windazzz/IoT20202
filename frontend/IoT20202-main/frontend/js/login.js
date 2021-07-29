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
        
      var firebaseRef = firebase.database().ref().child('login');
      
      firebaseRef.once("value").then(function(snapshot){
        var loginInfo=snapshot.val();
        document.getElementById("login").addEventListener("click",function(){
          var username = document.getElementById("username");
          var password = document.getElementById("password");
          if (username.value==loginInfo.username && password.value==loginInfo.password){
            location.href = "control.html";
          }else if(username.value!=loginInfo.username){
            username.style.borderColor="red";
          }else if(password.value!=loginInfo.password){
            password.style.borderColor="red";
          }
        });
      });

      document.getElementById('password').addEventListener("input",function(){
        document.getElementById("password").style.borderColor="#ccc";
      });
      document.getElementById('username').addEventListener("input",function(){
        document.getElementById("username").style.borderColor="#ccc";
      });
