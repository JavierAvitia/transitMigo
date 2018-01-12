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