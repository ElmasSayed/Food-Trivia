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
      //todo get pic from giphy
      $("#p2-img").attr("src", );
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

//Player entry and Disconnect Handling

  function getInGame() {
  //To send disconnect message to chat
    var chatDataDisc = database.ref("/chat/" + Date.now());

    if (currentPlayers < 4) {
      if(playerOneExists) {
        
        if (playerTwoExists) {
        	if (playerThreeExists) {
        		playerNum = 4;
        	} else {	
        		playerNum = 3;
        	}
        } else {
        	playerNum = 2;
        }
      } else {
      	playerNum = 1;
      }
    

    //Key based on player number
    playerRef = database.ref("/players/" + playerNum);

    //Player object
    playerRef.set({
    	name: username,
    	points: 0,
    	active: null
    });

    // Remove player object on disconnect
    playerRef.onDisconnect().remove();

    //If a user disconnects, end the current game by setting null
    currentTurnRef.onDisconnect().remove();

    //Send disconnect message to chat
    chatDataDisc.onDisconnect().set({
    	name: username,
    	time: firebase.database.ServerValue.TIMESTAMP,
    	message: "has disconnected.",
    	idNum: 0
    });

    //Remove name from input box
    $("#swap-zone").html("<h2>Hi " + username + "! You are Player " + playerNum + "</h2>");

  } else {
  	$("#swap-zone").html("<h2> Sorry, Game Full! Try Again Later!</h2>");
  }
 }


// Start the game if four players
 playersRef.on("child_added", function(snapshot) {
 	if (currentPlayers === 4) {
 		//set turn to 1, which starts the game
 		currentTurnRef.set(1);

 		//check if an active player flag is set on only one player
 		var actives = 0;

 		if () {
 			
 		}
 	}
 });
