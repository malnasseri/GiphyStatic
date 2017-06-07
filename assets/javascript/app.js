	
	var sports = ["Football","Basketball","Hockey","Tennis","Baseball","Volleyball"];
	
      function displayGifs(){

      var sport = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          for (var i = 0; i < sports.length; i++) {

          var gifsDiv = $("<div class='gifsDiv'>");

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

       	$("#sports").html("");

       	for(var i = 0; i < sports.length; i++){
      		
       		$("#sports").append("<button class=btn btn-sport" + i + "data-name='" +sports[i]+ "'>" + sports[i] + "</button>");
       		var a = $(".sport");
          
           a.attr("data-name", sports[i]);
           
           a.text(sports[i]);
 	};

 };
      
	$("#add-sport").on("click", function(event) {
		
		event.preventDefault();
		
		var searchInput = $("#search-input").val().trim();



		if(searchInput != "") {
			sports.push(searchInput);
		}
		$("#search-input").val("");
		

		displayButtons();
	});
  $(document).on("click", ".btn", displayGifs);
	
  displayButtons();

	





	 

	