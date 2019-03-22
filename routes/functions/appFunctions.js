var axios = require("axios");
var db = require("../../models");

module.exports = {
//Get all info for a particular transit stop.
    getInfo: function(req,res){
        var station = req.body.station;
        var weatherURL = req.body.URLs.weatherURL;
        var eventsURL = req.body.URLs.eventsURL;
        var metroURL = req.body.URLs.metroURL;
        var moviesURL = req.body.URLs.moviesURL;
        var line = req.body.line;

        axios.all([
          axios.get(weatherURL),
          axios.get(eventsURL),
          axios.get(metroURL, { crossdomain: true }),
          axios.get(moviesURL)
        ]).then(axios.spread(function(resp1, resp2, resp3, resp4) {
            var resp1 = resp1.data;
            var resp2 = resp2.data;
            var resp3 = resp3.data;
            var resp4 = resp4.data;

            res.json({resp1,resp2,resp3,resp4});
        }));
    },
    setDB: function(req,res){

        var j = 0;
        var resp = req.body.response;
        var resp1 = resp.data.resp1;
        var resp2 = resp.data.resp2; //EVENTS
        var resp3 = resp.data.resp3;
        var resp4 = resp.data.resp4;

        // console.log(resp1)
        // console.log(resp2)
        // console.log(resp3)
        // console.log(resp4)

        // Loop through responses = req.body.response.data
        // If not possible to simplify, continue without

        /*TEMP - MUST CLEAN UP WHEN CODE UPDATED TO STORE ADD'L DATA*/
        console.log("TEST START");
        // if (!jQuery.isEmptyObject(resp2._embedded)) {
            console.log("TEST");
            console.log(resp2._embedded.events)
            console.log("TEST2")
            while (j < resp2._embedded.events.length && j < 10) {
                console.log(resp2._embedded.events[j])
                console.log(`TEST${j+3}`)
                var event = resp2._embedded.events[j];
                var venue = event._embedded.venues[0].name
                var date = event.dates.start.localDate//moment(events.dates.start.localDate).format("dddd, MMMM Do YYYY")
                var name = event.name
                var distance = event.distance
                var img = event.images[0].url
                var url = event.url
                var genre = "";

                if (event.classifications) {
                    genre = event.classifications[0].segment.name;
                } else {
                    genre = "N/A";
                }

                console.log(venue,genre,name,date,distance,img,url);

                db.Event.create({venue,genre,name,date,distance,img,url}).then(function(dbEvent) {
                    res.json(dbEvent);
                }); 

                j++;
            } //end while loop

        // } //end if statement

        /*END TEMP*/
    }
}