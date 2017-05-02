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
var chatData = database.ref("/chat");
var playersRef = database.ref("players");
var currentStageRef = database.ref("stage");
var username = "Guest";
var currentPlayers = null;
var currentStage = null;
var playerNum = false;
var playerOneExists = false;
var playerTwoExists = false;
var playerOneData = null;
var playerTwoData = null;
var currentAnswer = null;
var countries = [];

// USERNAME LISTENERS
// Start button - takes username and tries to get user in game
$("#start").click(function() {
  if ($("#username").val() !== "") {
    username = escapeHtml($("#username").val()).trim();
    getInGame();
  }
});

// listener for 'enter' in username input
$("#username").keypress(function(e) {
  if (e.keyCode === 13 && $("#username").val() !== "") {
    username = escapeHtml($("#username").val()).trim();
    getInGame();
  }
});

//function to replace special characters
function escapeHtml(text) {
  var map = {
    '&': '',
    '<': '',
    '>': '',
    '"': '',
    "'": '',
    '$': '',
    '(': '',
    ')': '',
    '#': ''
  };
  return text.replace(/[&<>"'$()#]/g, function(m) { 
    return map[m]; 
  });
}

function playerWon(num) {
  if (num === 1) {
    playersRef.child("1").child("score").set(playerOneData.wins + 1);
  } else {
    playersRef.child("2").child("score").set(playerTwoData.wins + 1);
  }
}

// CHAT LISTENERS
// Chat send button listener, grabs input and pushes to firebase. (Firebase's push automatically creates a unique key)
$("#chat-send").click(function() {
  if ($("#chat-input").val() !== "") {

    var message = escapeHtml($("#chat-input").val());

    chatData.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      idNum: playerNum
    });

    // check for answer.  
    if (currentStage === 1) {
      
      if (message.toLowerCase() == currentAnswer.toLowerCase()) {
        
        
        $("#current-stage").html("<h2>Player " + playerNum + " wins.")
        if (playerNum === 1) {
          currentStageRef.set(2);
          console.log("currentStageRef set to stage 2");
        } else {
          currentStageRef.set(3);
        }
      }
    }

    $("#chat-input").val("");
  }
});

// Chatbox input listener

$("#chat-input").keypress(function(e) {
  if (e.keyCode === 13 && $("#chat-input").val() !== "") {

    var message = escapeHtml($("#chat-input").val());

    chatData.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      idNum: playerNum
    });
     
    $("#chat-input").val("");
  }
});

// Update chat on screen when new message detected - ordered by 'time' value
chatData.orderByChild("time").on("child_added", function(snapshot) {

  // If idNum is 0, then its a disconnect message and displays accordingly
  // If not - its a user chat message
  if (snapshot.val().idNum === 0) {
    $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }
  else {
    $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }

  // Keeps div scrolled to bottom on each update.
  $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
});

// Tracks changes in key which contains player objects
playersRef.on("value", function(snapshot) {

  // length of the 'players' array
  currentPlayers = snapshot.numChildren();

  // Check to see if players exist
  playerOneExists = snapshot.child("1").exists();
  playerTwoExists = snapshot.child("2").exists();

  // Player data objects
  playerOneData = snapshot.child("1").val();
  playerTwoData = snapshot.child("2").val();

  // If theres a player 1, fill in name and win loss data
  if (playerOneExists) {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
                    playerOneData.name + "&api_key=dc6zaTOxFJmzC&limit=3";
    var p1pic;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
      if (response.pagination.count === 0) {
        p1pic = "assets/images/egg.jpg";
      } 
      else {
      p1pic = results[0].images.fixed_height.url;
      
      }
      $("#player1-pic").attr("src", p1pic);
    });


    $("#player1-name").text(playerOneData.name);
    $("#player1-score").text("Score: " + playerOneData.score);
  }
  else {

    // If there is no player 1, clear win/loss data and show waiting
    $("#player1-name").text("Waiting for Player 1");
    $("#player1-pic").attr("src", "assets/images/egg.jpg");
    $("#player1-score").empty();
  }

  // If theres a player 2, fill in name and win/loss data
  if (playerTwoExists) {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
                    playerTwoData.name + "&api_key=dc6zaTOxFJmzC&limit=3";
    var p2pic;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
      if (response.pagination.count === 0) {
        p2pic = "assets/images/egg.jpg";
      } 
      else {
        p2pic = results[0].images.fixed_height.url;
        console.log(p2pic);
      }
      $("#player2-pic").attr("src", p2pic);

    });

    $("#player2-name").text(playerTwoData.name);
    $("#player2-score").text("Score: " + playerTwoData.score);
  }
  else {

    // If no player 2, clear win/loss and show waiting
    $("#player2-name").text("Waiting for Player 2");
    $("#player2-pic").attr("src", "assets/images/egg.jpg");
    $("#player2-score").empty();
  }
});

// TODO Change logic
// Detects changes in current stage key
currentStageRef.on("value", function(snapshot) {

  // Gets current stage from snapshot
  currentStage = snapshot.val();
  console.log(currentStage + " snapshot.val in cStageRef");

  // Don't do the following unless you're logged in
  if (playerNum) {

    // For stage 1
    if (currentStage === 1) {
      //Pick Random Country see Kathrin
      //currentAnswer
      currentAnswer = "test";
      console.log("answer is test");
      //Display Clues
      $("#result").html("<h2>Fill in clues</h2>");

      //Initialize Timer
    }
    //Player 1 got it right
    else if (currentStage === 2) {
      //Show Result


      //Add points

      //Update database

      //Reset game if both players still present
      var moveOn = function() {

        $("#clues").empty();
        $("#flag").attr("src", "");
        $("#result").empty();
        $("#timer").text(60);

        // check to make sure players didn't leave before timeout
        if (playerOneExists && playerTwoExists) {
          currentStageRef.set(1);
        }
      };



      //  show results for 2 seconds, then resets
      setTimeout(moveOn, 2000);
    //Player 2 got it right
    } else if (currentStage === 3) {

    }

    else {

      //  if (playerNum) {
      //    $("#player" + playerNum + " ul").empty();
      //  }
      $("#current-stage").html("<h2>Waiting for another player to join.</h2>");
      
    }
  }
});

// When a player joins, checks to see if there are two players now. If yes, then it will start the game.
playersRef.on("child_added", function(snapshot) {

  if (currentPlayers === 1) {

    // set stage to 1, which starts the game
    currentStageRef.set(1);
    console.log("playersRef set currentStage to 1");
  }
});

// Function to get in the game
function getInGame() {

  // For adding disconnects to the chat with a unique id (the date/time the user entered the game)
  // Needed because Firebase's '.push()' creates its unique keys client side,
  // so you can't ".push()" in a ".onDisconnect"
  var chatDataDisc = database.ref("/chat/" + Date.now());

  // Checks for current players, if theres a player one connected, then the user becomes player 2.
  // If there is no player one, then the user becomes player 1
  if (currentPlayers < 2) {

    if (playerOneExists) {
      playerNum = 2;
    }
    else {
      playerNum = 1;
    }

    // Creates key based on assigned player number
    playerRef = database.ref("/players/" + playerNum);

    // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
    playerRef.set({
      name: username,
      score: 0
    });

    // On disconnect remove this user's player object
    playerRef.onDisconnect().remove();

    // If a user disconnects, set the current stage to 'null' so the game does not continue
    currentStageRef.onDisconnect().remove();

    // Send disconnect message to chat with Firebase server generated timestamp and id of '0' to denote system message
    chatDataDisc.onDisconnect().set({
      name: username,
      time: firebase.database.ServerValue.TIMESTAMP,
      message: "has disconnected.",
      idNum: 0
    });

    // Remove name input box and show current player number.
    $("#swap-zone").html("<h2>Hi " + username + "! You are Player " + playerNum + "</h2>");
  }
  else {

    // If current players is "2", will not allow the player to join
    alert("Sorry, Game Full! Try Again Later!");
  }
}

