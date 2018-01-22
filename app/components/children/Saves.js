import React, { Component } from "react";
import Save from "./grandchildren/Save";
import API from "../../utils/API";

class Saves extends Component {
  constructor() {
    super();
    this.state = {
      saves: []
    };
    // Binding getQuotes to our component since we'll be passing this
    // method to child components
    this.getSaves = this.getSaves.bind(this);
  }
  // Getting all quotes when the component mounts
  componentDidMount() {
    this.getSaves();
  }
  // 
  getSaves() {
    API.getSaves().then((res) => {
      // console.log(res);
      this.setState({ saves: res.data });
      // this.state.quotes.map(quote => console.log(quote.id));
    });
  }
  // A helper method for rendering one panel for each quote
  renderSaves(choice) {

    if(choice){
      var saves = this.state.saves.filter( (save, i) => i % 2 === 0);
    } else{
      var saves = this.state.saves.filter( (save, i) => i % 2 != 0);
    }

    return saves.map(save => (
      <Save
        save={save}
        key={save.id}
        getSaves={this.getSaves}
      />
    ));
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <hr />
          <div className="col-xs-12 col-sm-6">
            {this.renderSaves(true)}
          </div>
          <div className="col-xs-12 col-sm-6">
            {this.renderSaves(false)}
          </div>
        </div>
      </div>
    );
  }
}

export default Saves;
