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
  renderSaves() {
    return this.state.saves.map(save => (
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
          {this.renderSaves()}
        </div>
      </div>
    );
  }
}

export default Saves;
