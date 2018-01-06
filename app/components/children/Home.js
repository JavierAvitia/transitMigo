import React, { Component } from "react";
import Time from "./grandchildren/Time";
import API from "../../utils/API";
import moment from "moment";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:null,
      lastMarkerPos: { lat: 34.048775, lng: -118.258615 },
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
      ]
    };
    // Binding getQuotes to our component since we'll be passing this
    // method to child components
    this.getTime = this.getTime.bind(this);
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

    this.setState({
      date
    });
    this.renderMap();
  }

  populateMarkers(latLongArr,map) {

    latLongArr.forEach(function(line, j) {
      console.log(line)

      var info = [];
      info.length = line[2].length;

      var infowindow = new google.maps.InfoWindow();
      var marker, i;
      //do not change from i, it is same i of station index!
      line[2].forEach(function(stations, i) {
          marker = new google.maps.Marker({

              position: new google.maps.LatLng(stations[1], stations[2]),
              map: map,
              icon: line[1]

          });

          google.maps.event.addListener(infowindow, 'domready', function() {
              $('.weather').parent().parent().css({ 'width': '350px', 'height': '350px' });
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                 /* if (functions.prevWindow != null)
                      functions.prevWindow.close();*/
//modify to make API call to backend.

                  /*functions.addInfo(stations, line[0]).then(function() {
                      infowindow.setContent(functions.info);
                      infowindow.open(map, marker);
                      functions.prevWindow = infowindow;
                  });*/

              }
          })(marker, i));

          marker.addListener('click', function() {
              map.setZoom(16);
              /*functions.lastMarkerPos = this.getPosition();*/
              map.setCenter(this.getPosition());
              var styleSelector = document.getElementById('style-selector');
              map.setOptions({
                  styles: styles["retro"],
                  draggable: false,
                  disableDoubleClickZoom: true
              });
          });

          /*functions.markersArr.push(marker);*/

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

      });
    });
  }

  // A helper method for rendering one panel for each quote
  renderMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.048775, lng: -118.258615 },
        zoom: 10,
        mapTypeControl: false,
        clickableIcons: false
    });
    this.populateMarkers(this.state.transitLines,map);
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
