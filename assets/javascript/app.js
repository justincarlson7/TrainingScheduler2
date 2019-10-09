$("#add-train-btn").on("click", function() {
  $("#buzzer")
    .get(0)
    .play();
});

var config = {
  apiKey: "AIzaSyApGchRDvuO9KcVaczJnOvtPoPuvlRiqGo",
  authDomain: "scheduler-ac29f.firebaseapp.com",
  databaseURL: "https://scheduler-ac29f.firebaseio.com",
  projectId: "scheduler-ac29f",
  storageBucket: "",
  messagingSenderId: "505022250745",
  appId: "1:505022250745:web:2e65296a62068a8017ac28"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName")
    .val()
    .trim();
  var trainDestination = $("#destination")
    .val()
    .trim();
  var trainTime = $("#trainTime")
    .val()
    .trim();
  var trainFrequency = $("#frequency")
    .val()
    .trim();

  var trainInfo = {
    Train: trainName,
    Destination: trainDestination,
    Time: trainTime,
    Frequency: trainFrequency
  };

  database.ref().push(trainInfo);

  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTime").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  var trainName = childSnapshot.val().Train;
  var trainDestination = childSnapshot.val().Destination;
  var trainTime = childSnapshot.val().Time;
  var trainFrequency = childSnapshot.val().Frequency;

  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var tMinutesTillTrain = trainFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainHMM = nextTrain.format("HH:mm");
  var departureLine = $("<tr>").append(
    $("<th>").text(trainName),
    $("<th>").text(trainDestination),
    $("<th>").text(trainFrequency),
    $("<th>").text(nextTrainHMM),
    $("<th>").text(tMinutesTillTrain)
  );
  $("#newDeparture > tbody").append(departureLine);
});
