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
    }
}