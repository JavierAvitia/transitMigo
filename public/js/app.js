	$(document).on("click", "#btnMov", function() {
	$("#windowChoice").text("Movies Nearby");
	$("#movies").addClass("active");
	$("#events").removeClass("active");
});

$(document).on("click", "#btnEvnt", function() {
	$("#windowChoice").text("Events Nearby");
	$("#events").addClass("active");
	$("#movies").removeClass("active");
});

$(document).on("click", ".stuff", function(e){
	if (e.target.tagName.toLowerCase() != 'a') {

		var station = $(this).find('img').attr('station');
		var line = $(this).find('img').attr('line');
		var img = $(this).find('img').attr('src');
		var type = 'event';
		var detailsObj = {};
		var details;

		detailsObj.venue = $(this).find('span.venue').text();
		detailsObj.genre = $(this).find('span.genre').text();
		detailsObj.date = $(this).find('span.date').text();
		detailsObj.name = $(this).find('span.name').text();
		detailsObj.distance = $(this).find('span.distance').text();
		detailsObj.link = $(this).find('a').attr('href');
		
		alert("Event saved!");

		details = JSON.stringify(detailsObj);	

		

		$.post("/api/save", { line, station, img, type, details },
	    	function(data){
	        	console.log(data);
	    	}
	    );
	};
});
//can fix, below if works!
$(document).on("click", ".movies_info", function(e){
	if (e.target.tagName.toLowerCase() != 'a') {
		// e.stopPropagation();

		var station = $(this).find('img').attr('station');
		var line = $(this).find('img').attr('line');
		var img = $(this).find('img').attr('src');
		var detailsObj = {};
		var type = 'movie';

		detailsObj.rating = $(this).find("h4 .rating").text();
		detailsObj.title = $(this).find("h4 .title").text();	
		detailsObj.date = $(this).find('span.date').text();
		detailsObj.theaters = [];

		$(this).find(".cineTime").each(function(index,cT){
			var cineObj = {};

			cineObj.name = $(cT).find("h6").text();
			cineObj.showtimes = [];

			$(cT).find("a").each(function(index,link){
				var href = $(link).attr("href");
				var showtime = $(link).text();			
				var linkObj = { showtime, href };

				cineObj.showtimes.push(linkObj);
			})

			detailsObj.theaters.push(cineObj);

		});

		alert("Movie saved!");

		var details = JSON.stringify(detailsObj);

		$.post("/api/save", { line, station, img, type, details },
	    	function(data){
	        	console.log(data);
	    	}
	    );
	};
});