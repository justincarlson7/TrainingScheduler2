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

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName")
      .val()
      .trim();
    var trainDestination = $("#destination")
      .val()
      .trim();
    var trainTime = moment(
      $("#trainTime")
        .val()
        .trim(),
      "HH:mm"
    ).format("X");
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

    //TODO: make this a modal with an image of a train

    alert("Train Added - Make this a Modal!!!");

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().Train;
    var trainDestination = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().Time;
    var trainFrequency = childSnapshot.val().Frequency;

    var formatTrainTime = moment.unix(trainTime).format("HH:mm");
    var formatTrainFrequency = moment.utc(moment(trainFrequency, "HH:mm").format("HH:mm"));
console.log(formatTrainFrequency)
    console.log(formatTrainTime);
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);




    // var startTime = moment().diff(moment(trainTime, "X"), "start time");

    	// First Time (pushed back 1 year to make sure it comes before current time)
      // var firstTimeConverted = moment(timeStart, "HH:mm").subtract(1, "years");
      // console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
  
      // Difference between the times
      var diffTime = currentTime.diff(formatTrainTime, "minutes");
      // console.log("DIFFERENCE IN TIME: " + diffTime);

      var mins = moment.utc(moment(formatTrainTime, "HH:mm").diff(moment(currentTime, "HH:mm"))).format("HH:mm");
      console.log(mins)
  
      // Time apart (remainder)
      var tRemainder = mins % formatTrainFrequency;

      var remainder = moment.utc(moment(mins, "HH:mm").diff(moment(formatTrainFrequency, "HH:mm"))).format("HH:mm");
      console.log(remainder);
  
       // Minute Until Train
      var tMinutesTillTrain = trainFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
      var formattedTime = moment(nextTrain).format("HH:mm");
  

    var departureLine = $("<tr>").append(
      $("<th>").text(trainName),
      $("<th>").text(trainDestination),
      $("<th>").text(trainFrequency),
      $("<th>").text(formatTrainTime),
      $("<th>").text(mins)
    );
    $("#newDeparture > tbody").append(departureLine);
  });