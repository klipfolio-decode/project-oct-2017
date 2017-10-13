// Initialize Firebase
var config = {
  apiKey: "AIzaSyAGUD_dENazGQje5TVhCe7pAqf4YlaNgOA",
  authDomain: "klipfolio-e40dd.firebaseapp.com",
  databaseURL: "https://klipfolio-e40dd.firebaseio.com",
  projectId: "klipfolio-e40dd",
  storageBucket: "",
  messagingSenderId: "269386088678"
};
firebase.initializeApp(config);

var database = firebase.database();

var nameRef = firebase.database().ref().child('data');

// nameRef.on('value', snap => document.getElementById('data').innerText = snap.val());

nameRef.on('value', snap => {
  var dataString = JSON.stringify(snap.val());
  var data = JSON.parse(dataString);

  console.log(data)
});
