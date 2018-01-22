import React, { Component } from "react";
import API from "../../../utils/API";
import Cine from "./greatgrandchildren/Cine";

class Save extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.save.id,
      img: props.save.img,
      type: props.save.type,
      line: props.save.line,
      station: props.save.station,
      details: JSON.parse(props.save.details)
    };
  }

  favoriteSave(save) {
    API.favoriteSave(save).then(this.props.getSaves);
  }
   // deleteQuote deletes a quote in the db and then
  // reloads all quotes in our app
  deleteSave(id) {
    API.deleteSave(id).then(this.props.getSaves);
  }

  renderCine(cines){
    return cines.map( (cine,index) => (
      <Cine
        cine={cine}
        key={index}
      />
    ));
  }

  render() {
    return (
      <div className="col-sm-6">
        <div className="panel panel-default">
          <div className="panel-body">
            <i
              onClick={() => this.favoriteSave(this.props.save)}
              style={styles.priorityStyle}
              className={this.props.save.priority ? "fa fa-star gold" : "fa fa-star-o"}
              aria-hidden="true"
            />
            <i
              onClick={() => this.deleteSave(this.state.id)}
              style={styles.deleteStyle}
              className="fa fa-trash-o"
              aria-hidden="true"
            />
            {this.state.type === 'movie' &&
              <span>
                <h5>{this.state.details.title} ({this.state.line})</h5> 
                @{this.state.station}:  &lt;2mi
                <hr/>
                <div className="col-xs-6">
                  <img src={this.state.img} className="movie" width='150' style={styles.imgStyle}/>
                </div>
                <div className="col-xs-6 text-center">
                  {this.state.details.date}
                  <hr/>
                  <h4>Rated: <br/> {this.state.details.rating}</h4>
                </div>
                <div className="col-xs-12">
                  <hr/>
                </div>                
                {this.renderCine(this.state.details.theaters)}
              </span>
            }
            {this.state.type === 'event' &&
              <span>
                <h5>{this.state.details.name} ({this.state.line})</h5>
                @{this.state.station}: {this.state.details.distance}
                <hr/>
                <div className="text-center">
                  {this.state.details.venue} {this.state.details.genre}
                  <img src={this.state.img} className="event" height='150' style={styles.imgStyle}/>
                  {this.state.details.date}
                </div>
                <hr/>
                <div className="text-center" style={styles.buttonStyle}>
                  <a href={this.state.details.link} target='_blank' style={styles.linkStyle}>
                      Purchase Tickets
                  </a>
                </div> 
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  priorityStyle: {
    cursor: "pointer",
    marginRight: 5,
    float: "left"
  },
  deleteStyle: {
    cursor: "pointer",
    marginLeft: 5,
    color: "red",
    float: "right"
  },
  buttonStyle: {
    display: "block",
    margin: "0 auto",
    padding: "0.5em",
    border: "black solid 1px",
    borderRadius: "0.3em",
    backgroundColor: "#025aa5",
    padding: "0.5em",
    width: "10em"
  },
  imgStyle: {
    display: "block",
    margin: "0 auto"
  },
  linkStyle: {
    cursor: "pointer",
    textDecoration: "none",
    color: "white"
  }
};

export default Save;
