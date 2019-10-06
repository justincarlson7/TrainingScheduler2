$(document).ready(function(){

var config = {
    apiKey: "AIzaSyApGchRDvuO9KcVaczJnOvtPoPuvlRiqGo",
    authDomain: "scheduler-ac29f.firebaseapp.com",
    databaseURL: "https://scheduler-ac29f.firebaseio.com",
    projectId: "scheduler-ac29f",
    storageBucket: "",
    messagingSenderId: "505022250745",
    appId: "1:505022250745:web:2e65296a62068a8017ac28"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#new-train-btn").on("click",function(event) {
event.preventDefault();

var trainName = $("#trainName").val().trim();
var destination = $("#destination").val().trim();
var trainTime = moment($("#trainName").val().trim(), "HH:mm").format("X");
var frequency = $("#frequency").val().trim();

var trainInfo = {

   Train: trainName,
    Destination: destination,
    Time: trainTime,
   Frequency: frequency

};

console.log(trainInfo);

database.ref().push(trainInfo);

//TODO: make this a modal with an image of a train

alert("Train Added - Make this a Modal!!!");

$("#trainName").val("");
$("#destination").val("");
$("trainTime").val("");
$("frequency").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    var startTime = moment().diff(moment(trainTime, "X"), "start time");

    var departureLine = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(trainTime),
        $("<td>").text(frequency)
     );

    });
});