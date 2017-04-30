 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCkHIlr8v0zS57zLeVFdCmeWeUYCFpztdo",
    authDomain: "groupproject1-496a1.firebaseapp.com",
    databaseURL: "https://groupproject1-496a1.firebaseio.com",
    projectId: "groupproject1-496a1",
    storageBucket: "groupproject1-496a1.appspot.com",
    messagingSenderId: "370391785809"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var chatData = firebase.ref("/chat");
  var playerRef = database.ref("players");
  var currentTurnRef = database.ref("turn");
  var username = "guest";
  var currentPlayers = null;
  var currentTurn = null;
  var playerNum = false;
  var playerOneExists = false;
  var playerTwoExists = false;
  var playerThreeExists = false;
  var playerFourExists = false;
  var playerOneData = null;
  var playerTwoData = null;
  var playerThreeData = null;
  var playerFourData = null;

  //Player enters game
  //Need to add check for name validation
  //Button listener
  $("#start").click(function() {
  	if ($("#username").val() !== "") {
  		username = ($("#username").val());
  		getInGame();
  	}
  });

  //Enter key listener
  $("#username").keypress(function(e) {
  	if (e.keyCode === 13 && $("#username").val() !== "") {
  		username = $("#username").val();
  		getInGame();
  	}
  });

  //Tracker for player objects
  playersRef.on("value", function(snapshot) {
    currentPlayers = snapshot.numChildren();

    //Check if players exist
    playerOneExists = snapshot.child("1").exists();
    playerTwoExists = snapshot.child("2").exists();
    playerThreeExists = snapshot.child("3").exists();
    playerFourExists = snapshot.child("4").exists();

    //Player data objects
    playerOneData = snapshot.child("1").val();
    playerTwoData = snapshot.child("2").val();
    playerThreeData = snapshot.child("3").val();
    playerFourData = snapshot.child("4").val();

    if (playerOne Exists) {
      $("#p1-name").text(playerOneData.name);
      //todo add picture from image site
      $("#p1-score").text(playerOneData.points + " points");

    }
    else {
      //If no player 1
      $("#p1-name").text("Waiting for Player 1");
      $("#p1-img").attr("src", "");
      $("#p1-score").empty();
    }

    if (playerTwoExists) {
      $("#p2-name").text(playerTwoName.name);
      //todo add pic
      $("#p2-score").text(playerTwoData.points + " points");
    }
    else {
      $("#p2-name").text("Waiting for Player 2");
      $("#p2-img").attr("src", "");
      $("#p2-score").empty();
    }

    if (playerThreeExists) {
      $("#p3-name").text(playerThreeName.name);
      //todo Add pic
      $("#p3-score").text(playerThreeData.points + " points");
    }
    else {
      $("#p3-name").text("Waiting for Player 3");
      $("#p3-img").attr("src", "");
      $("#p3-score").empty();
    }

    if (playerFourExists) {
      $("#p4-name").text(playerFourName.name);
      //todo Add pic
      $("#p4-score").text(playerFourData.points + " points");
    }
    else {
      $("#p4-name").text("Waiting for Player 4");
      $("#p4-img").attr("src", "");
      $("#p4-score").empty();
    }

  }


