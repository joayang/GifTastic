$( document ).ready(function() {
// An array of animals, new animals will be pushed into this array;
var animals = ["Alligator","Bear","Butterfy","cat","Camel","dog", "Elephant","Fox","goat","Pengun"];
// Creating Functions & Methods
// Function that displays all gif buttons
function displayGifButtons(){
    $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
    for (var i = 0; i < animals.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", animals[i]);
        gifButton.text(animals[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new action button
function addNewButton(){
    $("#addGif").on("click", function(event){
        event.preventDefault();
    var action = $("#action-input").val().trim();
    if (action == ""){
      return false; // user cannot add a blank button
    }
    animals.push(action);   // add new item to an array
    displayGifButtons();
    $("#action-input").val("");
    });
}
// Function to remove last action button
function removeLastButton(){ 
    $("#removeGif").on("click", function(event){
    event.preventDefault();
    animals.pop();
    displayGifButtons();
    return false;
    });
}
// Function that displays all of the gifs
function displayGifs(){
    var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=XB2nFfpRrofvlGuKHUu8FNZGllU1GmNT&limit=10";
    console.log(queryURL); // displays the constructed url
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function(response) {
        //console.log(response); console test to make sure something returns
        $("#gifsView").empty(); // erasing anything in this div id so that it doesn't keep any from the previous click
        var results = response.data; //shows results of gifs
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){
            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating information of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still images
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated images
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // getting still image of gif, adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling displayGifButton addNewButton, removeLastButton functions
displayGifButtons(); // displays list of animals already created
addNewButton();  // add button from user
removeLastButton();  // remove button when user click remove last animal button
// Document Event Listeners
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});