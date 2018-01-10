import React, { Component } from "react";
import Time from "./grandchildren/Time";
import API from "../../utils/API";
import moment from "moment";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:null,
      prevWindow: null,
      lastMarkerPos: { lat: 34.048775, lng: -118.258615 },
      weather: "",
      info: "",
      eventType: "",
      radius: 5,
      sortMethod: "distance,asc",
      currentDate: moment().format().substr(0, 19) + "Z", //format for TM api startDateTime/endDateTime
      weekDate: moment().add(14, 'day').format().substr(0, 19) + "Z",
      prevWindow: null,
      transitLines: [
        //REDLINE
        //https://maps.google.com/mapfiles/ms/icons/red-dot.png
        [
            ["Red Line", 802], "", [
                ['Union Station', 34.055599, -118.233456, 80214],
                ['Civic Center / Grand Park', 34.055442, -118.245244, 80213],
                ['Pershing Square', 34.048424, -118.251584, 80212],
                ['7th Street / Metro Center', 34.048775, -118.258615, 80211],
                ['Westlake / MacArthur Park', 34.057220, -118.275904, 80210],
                ['Wilshire / Vermont', 34.062539, -118.290880, 80209],
                ['Vermont / Beverly', 34.076710, -118.291938, 80208],
                ['Vermont / Santa Monica', 34.090496, -118.292032, 80207],
                ['Vermont / Sunset', 34.098378, -118.291433, 80206],
                ['Hollywood / Western', 34.101498, -118.308962, 80205],
                ['Hollywood / Vine', 34.101153, -118.325783, 80204],
                ['Hollywood / Highland', 34.101727, -118.339255, 80203],
                ['Universal City / Studio City', 34.139095, -118.362394, 80202],
                ['North Hollywood', 34.168839, -118.376613, 80201]
            ]
        ],
        //end line
        //BLUELINE
        [
            ["Blue Line", 801], "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", [
                ['7th Street / Metro Center Station', 34.048175, -118.258915, 80122],
                ['Pico Station', 34.040474, -118.266393, 80121],
                ['Grand / LATTC Station', 34.032968, -118.268942, 80120],
                ['San Pedro Station', 34.026809, -118.255494, 80119],
                ['Washington Station', 34.019967, -118.243069, 80118],
                ['Vernon Station', 34.003232, -118.243293, 80117],
                ['Slauson Station', 33.988811, -118.243360, 80116],
                ['Florence Station', 33.974084, -118.243280, 80115],
                ['Firestone Station', 33.959591, -118.243191, 80114],
                ['103rd Street / Watts Towers Station', 33.942542, -118.243156, 80113],
                ['Willowbrook / Rosa Parks Station', 33.928331, -118.239053, 80112],
                ['Compton Station', 33.897428, -118.224295, 80111],
                ['Artesia Station', 33.876115, -118.222503, 80110],
                ['Del Amo Station', 33.848198, -118.211015, 80109],
                ['Wardlow Station', 33.819733, -118.195952, 80108],
                ['Willow Station', 33.806788, -118.189763, 80107],
                ['Pacific Coast Highway Station', 33.789401, -118.189359, 80106],
                ['Anaheim Street Station', 33.781793, -118.189376, 80105],
                ['5th Street Station', 33.773358, -118.189383, 80154],
                ['1st Street Station', 33.768862, -118.189424, 80153],
                ['Downtown Long Beach Station', 33.768043, -118.193101, 80101],
                ['Pacific Avenue Station', 33.772253, -118.193690, 80102]
            ]
        ],
        //end line
        //PURPLELINE
        [
            ["Purple Line", 805], "https://maps.google.com/mapfiles/ms/icons/purple-dot.png", [
                ['Union Station', 34.055199, -118.233456, 80214],
                ['Civic Center / Grand Park', 34.055042, -118.245244, 80213],
                ['Pershing Square', 34.048024, -118.251584, 80212],
                ['7th Street / Metro Center', 34.048375, -118.258615, 80211],
                ['Westlake / MacArthur Park', 34.056820, -118.275904, 80210],
                ['Wilshire / Vermont', 34.062139, -118.290880, 80209],
                ['Wilshire / Normandie', 34.061608, -118.300931, 80215],
                ['Wilshire / Western', 34.062097, -118.308847, 80216]
            ]
        ],
        //end line
        //EXPOLINE
        [
            ["Expo Line", 806], "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=E%7C10C4FF", [
                ['7th Street / Metro Center Station', 34.048358, -118.259254, 80122],
                ['Pico Station', 34.040656, -118.266847, 80121],
                ['LATTC / Ortho Institute Station', 34.029264, -118.273941, 80123],
                ['Jefferson / USC Station', 34.021968, -118.278327, 80124],
                ['Exposition Park / USC Station', 34.018170, -118.285671, 80125],
                ['Exposition / Vermont Station', 34.018318, -118.291802, 80126],
                ['Exposition / Western Station', 34.018342, -118.308914, 80127],
                ['Exposition / Crenshaw Station', 34.022722, -118.336401, 80128],
                ['Farmdale Station', 34.023960, -118.346678, 80129],
                ['Exposition / La Brea Station', 34.024828, -118.355144, 80130],
                ['La Cienega / Jefferson Station', 34.026360, -118.372123, 80131],
                ['Culver City Station', 34.027879, -118.388858, 80132],
                ['Palms Station', 34.029293, -118.404250, 80133],
                ['Westwood / Rancho Park Station', 34.036796, -118.424521, 80134],
                ['Exposition / Sepulveda Station', 34.035416, -118.434290, 80135],
                ['Exposition / Bundy Station', 34.031666, -118.453036, 80136],
                ['26th Street / Bergamot Station', 34.028001, -118.469102, 80137],
                ['17th Street / Santa Monica College Station', 34.023156, -118.480391, 80138],
                ['Downtown Santa Monica Station', 34.014019, -118.491398, 80139]
            ]
        ],
        //end line
        //GOLDLINE
        [
            ["Gold Line", 804], "https://maps.google.com/mapfiles/marker_yellow.png", [
                ['Atlantic Station', 34.033367, -118.155009, 80401],
                ['East LA Civic Center Station', 34.033352, -118.161200, 80402],
                ['Maravilla Station', 34.033303, -118.168146, 80403],
                ['Indiana Station', 34.034280, -118.192164, 80404],
                ['Soto Station', 34.043719, -118.210042, 80405],
                ['Mariachi Plaza Station', 34.047211, -118.219646, 80406],
                ['Pico / Aliso Station', 34.047637, -118.225904, 80407],
                ['Little Tokyo / Arts District Station', 34.050040, -118.237899, 80408],
                ['Union Station', 34.056051, -118.234757, 80409],
                ['Chinatown Station', 34.063861, -118.235809, 80410],
                ['Lincoln Heights / Cypress Park Station', 34.081166, -118.220256, 80411],
                ['Heritage Square Station', 34.087479, -118.212954, 80412],
                ['Southwest Museum Station', 34.098404, -118.206474, 80413],
                ['Highland Park Station', 34.111166, -118.192605, 80414],
                ['South Pasadena Station', 34.115189, -118.157796, 80415],
                ['Fillmore Station', 34.133474, -118.148193, 80416],
                ['Del Mar Station', 34.141808, -118.148251, 80417],
                ['Memorial Park Station', 34.147835, -118.147727, 80418],
                ['Lake Station', 34.151812, -118.131591, 80419],
                ['Allen Station', 34.152395, -118.113956, 80420],
                ['Sierra Madre Villa Station', 34.147730, -118.081368, 80421],
                ['Arcadia Station', 34.142667, -118.029040, 80422],
                ['Monrovia Station', 34.133050, -118.003233, 80423],
                ['Duarte / City of Hope Station', 34.132497, -117.967519, 80424],
                ['Irwindale Station', 34.129033, -117.932434, 80425],
                ['Azusa Downtown Station', 34.135768, -117.906787, 80426],
                ['APU / Citrus College Station', 34.136797, -117.891637, 80427]
            ]
        ],
        //end line
        //GREENLINE
        [
            ["Green Line", 803], "https://maps.google.com/mapfiles/marker_green.png", [
                ['Redondo Beach Station', 33.894577, -118.369161, 80301],
                ['Douglas Station', 33.905288, -118.383232, 80302],
                ['El Segundo Station', 33.916187, -118.386777, 80303],
                ['Mariposa Station', 33.923288, -118.387579, 80304],
                ['Aviation / LAX Station', 33.929612, -118.377150, 80305],
                ['Hawthrone / Lennox Station', 33.933416, -118.351733, 80306],
                ['Crenshaw Station', 33.925231, -118.326407, 80307],
                ['Vermont / Athens Station', 33.928660, -118.291698, 80308],
                ['Harbor Freeway Station', 33.928681, -118.281095, 80309],
                ['Avalon Station', 33.927490, -118.265171, 80310],
                ['Willowbrook / Rosa Parks Station', 33.928240, -118.238031, 80311],
                ['Long Beach Boulevard Station', 33.925011, -118.210230, 80312],
                ['Lakewood Boulevard Station', 33.913066, -118.140266, 80313],
                ['Norwalk Station', 33.914116, -118.104085, 80314]
            ]
        ],
        //end line
      ],
      styles: {
        default: null,
        silver: [{
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [{ color: '#616161' }]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#bdbdbd' }]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{ color: '#eeeeee' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#757575' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#e5e5e5' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9e9e9e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#ffffff' }]
            },
            {
                featureType: 'road.arterial',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#757575' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#dadada' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#616161' }]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9e9e9e' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{ color: '#e5e5e5' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{ color: '#eeeeee' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#c9c9c9' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9e9e9e' }]
            }
        ],

        retro: [
            { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#c9b2a6' }]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#dcd2be' }]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#ae9e90' }]
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#93817c' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{ color: '#a5b076' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#447530' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#f5f1e6' }]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{ color: '#fdfcf8' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#f8c967' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#e9bc62' }]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{ color: '#e98d58' }]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#db8555' }]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#806b63' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#8f7d77' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#ebe3cd' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{ color: '#b9d3c2' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#92998d' }]
            }
        ]
      }
    };
    // Binding getQuotes to our component since we'll be passing this
    // method to child components
    this.getTime = this.getTime.bind(this);
    this.addInfo = this.addInfo.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.populateMarkers = this.populateMarkers.bind(this);
  }
  // Getting all quotes when the component mounts
  componentDidMount() {
    this.getTime();
  }

  getTime() {
    var time = moment();
    var date = time.format("dddd, MMMM Do YYYY");
    var currentDate = time.format().substr(0, 19) + "Z";
    var weekDate = time.add(14, 'day').format().substr(0, 19) + "Z";

    this.setState({
      date,
      currentDate,
      weekDate
    });
    this.renderMap();
  }

  addInfo(station,line){
    console.log(station,line);
    axios.get(`/api/metro/${line[1]}/${station[3]}`).then(function(data){
      console.log(data);
      return data;
    });
  }

  addInfoo(station, line) {
        //sync ajax calls
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=100&latlong=" +
            station[1] + "," + station[2] +
            "&radius=" + this.state.radius + "&unit=miles&sort=" + this.state.sortMethod +
            "&startDateTime=" + this.state.currentDate +
            "&endDateTime=" + this.state.weekDate +
            "&apikey=HSapqKFWyAlQB7MxBkl3dvnFWzTWBkQ9";
        if (this.state.eventType != '') {
            var append = "&classificationName=" + this.state.eventType;
            queryURL += append;
        }
        return axios.all([
          axios.get("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='(" +
            station[1] + "," + station[2] + ")') and u='f'&format=json"),
          axios.get(queryURL),
          axios.get("https://api.metro.net/agencies/lametro-rail/routes/" + line[1] + "/stops/" +
            station[3] + "/predictions/", { crossdomain: true }),
          axios.get("https://data.tmsapi.com/v1.1/movies/showings?startDate=" +
            this.state.currentDate.slice(0, 10) + "&lat=" + station[1] + "&lng=" + station[2] +
            "&api_key=cuen8da9wsfaewzvecfxd7ga")
        ]).then(function(resp1, resp2, resp3, resp4) {

            /*console.log(JSON.parse(resp3[0]));*/
            resp3 = JSON.parse(resp3[0]);

            var upcomingTrain = "";
            var weatherIcon = "";

            for (var i = 0; i < resp3.items.length && i < 3; i++) {

                upcomingTrain += moment().add(resp3.items[i].minutes, 'minutes').format("h:mm A") + " / ";

            }

            var nearby = "";
            var j = 0;

            this.state.weather = "Local weather: " +
                resp1[0].query.results.channel.item.forecast[0].high + "H/ " +
                resp1[0].query.results.channel.item.forecast[0].low + "L/" +
                resp1[0].query.results.channel.item.forecast[0].text;

            //console.log(resp1[0].query.results.channel.item.forecast[0].text.toLowerCase().search("sun"));

            if (resp1[0].query.results.channel.item.forecast[0].text.toLowerCase().search("sun") > -1) {

                weatherIcon = "<i class='fa fa-sun-o' aria-hidden='true'></i>";

            } else if (resp1[0].query.results.channel.item.forecast[0].text.toLowerCase().search("cloud") > -1) {

                weatherIcon = "<i class='fa fa-cloud' aria-hidden='true'></i>";

            } else if (resp1[0].query.results.channel.item.forecast[0].text.toLowerCase().search("rain") > -1) {

                weatherIcon = "<i class='fa fa-tint' aria-hidden='true'></i>";

            }

            //begin   

            if (jQuery.isEmptyObject(resp2[0]._embedded)) {

                nearby = "Check again soon for more events!";

            } else {

                while (j < resp2[0]._embedded.events.length && j < 10) {

                    var genre = "";

                    if (resp2[0]._embedded.events[j].classifications) {
                        genre = resp2[0]._embedded.events[j].classifications[0].segment.name;
                    } else {
                        genre = "N/A";
                    }

                    nearby += ("<div class='stuff'>" +
                        "<span class='position'>" + (j + 1) +
                        ". </span>" + resp2[0]._embedded.events[j]._embedded.venues[0].name +
                        " (" + genre + ")<span id='eventDate'> - " +
                        resp2[0]._embedded.events[j].dates.start.localDate +
                        "</span><br>" +
                        resp2[0]._embedded.events[j].name +
                        " - " +
                        (resp2[0]._embedded.events[j].distance).toFixed(2) +
                        "mi<br>" +
                        "<img src=" + resp2[0]._embedded.events[j].images[0].url +
                        " alt='event_img' width='115' station='" +
                        station[0] + "' line='" +
                        line[0] + "'>" +
                        "<a href=" + resp2[0]._embedded.events[j].url +
                        " target='_blank'>Purchase tickets now!</a></div><hr>");
                    j++;
                } //end while loop
            } //end if statement


            var k = 0;
            var movies = "";



            if ((resp4[0].length === 0)) {

                movies = "There are no movie theaters nearby!";

            } else {



                var moviesObj = {};

                for (var i = 0; i < resp4[0].length; i++) {

                    var theatreName = "";
                    moviesObj[resp4[0][i].title] = {};

                    var poster;
                    var ratings;


                    if (resp4[0][i].ratings) {

                        ratings = resp4[0][i].ratings[0].code;

                    } else {

                        ratings = "N/A";


                    }


                    poster = "<img class='movie_poster' src='https://dlby.tmsimg.com/" + resp4[0][i].preferredImage.uri +
                        "?api_key=gvmc8sysuqe8pwpshucfnn33' height=150 station='" +
                        station[0] + "' line='" +
                        line[0] + "'>";





                    for (var j = 0; j < resp4[0][i].showtimes.length; j++) {



                        if (resp4[0][i].showtimes[j].ticketURI) {

                            var timeCompare = (resp4[0][i].showtimes[j].dateTime).slice(11, 16);

                            var tempTime = moment(timeCompare, "HH:mm").format("h:mm A");

                            tempTime = "<a href='" + resp4[0][i].showtimes[j].ticketURI + "+" + timeCompare +
                                "' target=_blank> " + tempTime + " </a>";


                            if (!moviesObj[resp4[0][i].title][resp4[0][i].showtimes[j].theatre.name]) {

                                moviesObj[resp4[0][i].title][resp4[0][i].showtimes[j].theatre.name] = [];

                            }

                            moviesObj[resp4[0][i].title][resp4[0][i].showtimes[j].theatre.name].push(tempTime);

                        }


                    } //end inner for loop 


                    var times = "";

                    (Object.keys(moviesObj)).forEach(function(movie) {

                        times = "";


                        (Object.keys(moviesObj[movie])).forEach(function(theatre) {

                            times += "<br />" + "<h6>" + theatre + "</h6>";



                            for (var i = 0; i < Object.keys(moviesObj[movie][theatre]).length; i++) {

                                times += (moviesObj[movie][theatre][i] + "&nbsp;");
                            };


                        })

                    })


                    if (times != '') {
                        movies += "<div class='movies_info'>"

                            +
                            poster

                            +
                            "<h4><strong>"

                            +
                            resp4[0][i].title

                            +
                            "</strong>"

                            +
                            "&emsp;Rated: "

                            +
                            ratings

                            +
                            "</h4>"

                            +
                            "<span>"

                            +
                            times

                            +
                            "</span>"

                            +
                            "</div>"


                            +
                            "<hr>";
                    }

                } //end outter for loop



                //console.log(moviesObj);


            } //end else statement
            // console.log(weatherIcon)

            this.state.info = ("<div class='station'><strong>" + station[0] + " - (" + moment(date).format("M/D/YY") + ")" +
                "<br>Upcoming Trains <i class='fa fa-train'></i> (real-time): " + upcomingTrain.slice(0, upcomingTrain.length - 2) +
                "</strong>" + "</div><div class='weather'>" + this.state.weather + " " + weatherIcon + "</div><hr>" +
                "<div id='myCarousel' class='carousel slide' data-ride='carousel' data-interval='false'>" +
                "<!-- Indicators -->" +
                "<ol class='carousel-indicators'>" +
                "<li data-target='#myCarousel' data-slide-to='0' class='active'></li>" +
                "<li data-target='#myCarousel' data-slide-to='1'></li>" +
                "</ol>" +
                "<!-- Wrapper for slides -->" +
                "<div class='carousel-inner'>" +
                "<div class='item active'>" +
                nearby +
                "</div>" +
                "<div class='item'>" +
                movies +
                "</div>" +
                "</div>" +
                "<!-- Left and right controls -->" +
                "<a class='left carousel-control' href='#myCarousel' data-slide='prev'>" +
                "<span class='glyphicon glyphicon-chevron-left'></span>" +
                "<span class='sr-only'>Previous</span>" +
                "</a>" +
                "<a class='right carousel-control' href='#myCarousel' data-slide='next'>" +
                "<span class='glyphicon glyphicon-chevron-right'></span>" +
                "<span class='sr-only'>Next</span>" +
                "</a>" +
                "</div>");
        }) //end statement


        //end
  }

  populateMarkers(latLongArr,styles,map) {
    //var prevWindow = this.state.prevWindow;

    latLongArr.forEach(function(line, j) {
      /*console.log(line)*/

      var info = [];
      info.length = line[2].length;

      var infowindow = new google.maps.InfoWindow();
      var marker, i;
      //do not change from i, it is same i of station index!
      line[2].forEach(function(stations, i) {
          /*console.log(this);*/
          marker = new google.maps.Marker({

              position: new google.maps.LatLng(stations[1], stations[2]),
              map: map,
              icon: line[1]

          });

          google.maps.event.addListener(infowindow, 'domready', function() {
              $('.weather').parent().parent().css({ 'width': '350px', 'height': '350px' });
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
              // console.log(this);
              return function() {

                  console.log(this);

                  if (this.state.prevWindow != null){
                    this.state.prevWindow.close();
                  }

//modify to make API call to backend.

                  this.addInfo(stations, line[0])/*.then(function() {
                      infowindow.setContent(this.state.info);
                      infowindow.open(map, marker);
                      this.state.prevWindow = infowindow;
                  });*/

              }.bind(this)
          }.bind(this))(marker, i));

          marker.addListener('click', function() {
              map.setZoom(16);
              /*this.lastMarkerPos = this.getPosition();*/
              map.setCenter(this.getPosition());
              // var styleSelector = document.getElementById('style-selector');
              map.setOptions({
                  styles: styles["retro"],
                  draggable: false,
                  disableDoubleClickZoom: true
              });
          });

          /*this.markersArr.push(marker);*/

          google.maps.event.addListener(infowindow, 'closeclick', function() {

              map.setOptions({
                  styles: styles["silver"],
                  draggable: true,
                  disableDoubleClickZoom: false,
                  center: this.position,
                  zoom: 13,
                  mapTypeControl: false,
                  clickableIcons: false
              });
          });

      }.bind(this));
    }.bind(this));
  }

  /*NEED TO MOVE ALL THE GIANT ARRAY INTO A UTILS AND IMPORT THEM*/
  /*POLYLINES NEED TO BE AUTOMATIC OR TEMPORARILY HARD-CODED AS IN PROJECT ONE*/
  /*FUNCTIONS OBJECT FROM PROJECT ONE NEEDS TO BE CONVERTED INTO REACT STATE PROPERTIES OR COMPONENT FUNCTIONS*/

  // A helper method for rendering one panel for each quote
  renderMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.048775, lng: -118.258615 },
        zoom: 10,
        styles: this.state.styles["silver"],
        mapTypeControl: false,
        clickableIcons: false
    });
    this.populateMarkers(this.state.transitLines,this.state.styles,map);
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1>Welcome, {this.props.username}!</h1>
          <p>{this.state.date}</p>
          <div className="row">
            <hr />
            <div id="map">
              {/*Google map will render here.*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
