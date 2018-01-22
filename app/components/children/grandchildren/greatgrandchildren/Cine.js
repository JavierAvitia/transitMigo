import React, { Component } from "react";

class Cine extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	name: props.cine.name,
    	showtimes: props.cine.showtimes
    };
  }

  renderShowtime(){
    return this.state.showtimes.map( (showtime, i) => (
      <div className="col-xs-3 col-sm-4" key={i}>
      	<a href={showtime.href} target="_blank">
      		{showtime.showtime}
      	</a>
      </div>
    ));
  }

  render() {
    return (
      <div className="col-xs-12">
      	<h6>{this.state.name}</h6>
        {this.renderShowtime()}
      </div>
    );
  }
}

export default Cine;
