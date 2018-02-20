	
	var sports = ["footy","rugby","basketball","hockey","tennis","baseball","volleyball","football"];
	
      function displayGifs(){
          $("#gifs").empty();
      var sport = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=12";

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          for (var i = 0; i < response.data.length; i++) {

          var gifsDiv = $("<div class='gifsDiv col-xs-12 col-sm-6 col-md-4 col-lg-4'>");

          var results = response.data;
         
            var rating = $("<p>").text("Rating: " + results[i].rating);

            gifsDiv.append(rating);
          var gifImage = $("<img>");

            gifImage.attr("src", results[i].images.fixed_height_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifsDiv.append(gifImage);
           
              
            $("#gifs").prepend(gifsDiv);
            
          $(gifImage).on("click", function() {
     
      var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
          }

        });
  }


  function displayButtons() {

       	

       	for(var i = 0; i < sports.length; i++){
      		
       		// $("#sports").append("<button class='btn btn-sport'" + i + "data-name='" + sports[i] + "'>" + sports[i] + "</button>");
       		var sportButton = $('<button>') 
        sportButton.addClass('btn btn-sport'); // Added a class 
        sportButton.attr('data-name', sports[i]); // Added a data-attribute
        sportButton.text(sports[i]); // Provided the initial button text
        $('#sports').append(sportButton); // Added the button to the HTML

 	};

 };
      
	$("#add-sport").on("click", function(event) {
		
		event.preventDefault();
		
		var searchInput = $("#search-input").val().trim().toLowerCase();

		
			if(searchInput !== "") {
      sports.push(searchInput);
    }
		
		$("#search-input").val("");
		
    $("#sports").empty();
		displayButtons();
	});
  $(document).on("click", ".btn", displayGifs);
	
  

	displayButtons();





	 

	