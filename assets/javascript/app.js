$(document).ready(function(){

//================================
//SETUP variables
//================================

var cars = ['Ford Mustang','Trans Am','Dodge Challenger','Dodge Charger','Chevelle','Chevy Camaro','Ford Cobra','Dodge Viper'];
console.log(cars);

//To Hold State of Gifs
var state

//Display Car Array
displayCars(cars);

// ======================
//FUNCTIONS
// ======================

//Function to Display the Original Cars Array that we start with
function displayCars(carsArray){
    $(".topics").empty();
    //Loop through Cars array to create buttons
    for (i=0; i <cars.length; i++) {
      var staticDiv = $("<button>");
      staticDiv.addClass("allCars");
      staticDiv.attr("value", cars[i]);
      staticDiv.text(cars[i]);
      // staticDiv.attr("val",cars[i])
      $(".topics").append(staticDiv);
    }
  }

// This function will hold the results we get from the user's search via HTML
  $('#submit').click(function(e){
      //Grab the Search Term the User Enters in the TextField
      e.preventDefault();
      var search = $('#searchTerm').val().trim();
      console.log(search);
      //Add the New Search term to the Original Cars array
      cars.push(search);
      console.log(cars);
      displayCars(cars);
  })
  console.log(cars);


// Function for AJAX Call and Creat GIF Divs for display
$(".allCars").click(function() {
  // This variable will hold the API key given to us from GIPHY
  var APIkey = '83924bd3c22a49f49846ddd69574552e';
  var attrValue = $(this).attr("value");
  var newImgDiv = $("<div class='image'>");

  //queryURLBase will begin our API request string. The search will be appended to the appropriate position
  var queryURL = "https://api.giphy.com/v1/gifs/search?" + "api_key=" + APIkey + "&q=" + attrValue + "&rating=pg";

  //The AJAX function uses queryURL and GETS the JSON
  // data associated with it.
  $.ajax({
    //This runQuery function expects one parameter:
    //the the final URL to retrieve the giphys
    url: queryURL,
    method: "GET"
      }).done(function(response){
        var results = response.data;
        console.log(results);
          //Loop through response data
          for (i = 0; i<10; i++) {
          //Log the URL so we have acces to it for troubleshooting
          var carDiv = $("<div id='gif'>");
          var rating = results[i].rating;
          var stillGif = results[i].images.fixed_height_still.url;
          var motionGif = results[i].images.fixed_height.url;
          var image = $('<img>');
          var p = $("<p>").text("Rating: " + rating.toUpperCase());
          //Build Image

          image.attr("src", stillGif);
          image.attr("data-still", stillGif);
          image.attr("data-motion", motionGif);
          image.attr("data-state", "still")
          image.addClass("allGifs");

          carDiv.prepend(p);
          carDiv.append(image);
          $(".photos").append(carDiv);
      };
        console.log("----------------------");
        console.log("URL: " + queryURL);
        console.log("----------------------");
    })
    $('.photos').empty();
  })

//  Animate the GIFS!
  $(".allGifs").click(function(){
    var state = $(this).attr("data-state");
    //Check to see if the Gifs DataState is still, If so switch to motionstate
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-motion"));
      $(this).attr("data-state", "motion");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  })

});
