import React from "react";

export default class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockInfo: [],
      price: ""
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("https://api.iextrading.com/1.0/stock/aapl/company"),
      fetch("https://api.iextrading.com/1.0/stock/aapl/price")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([json1, json2]) =>
        this.setState({
          stockInfo: json1,
          price: json2
        })
      );
  }

  render() {
    return (
      <div className="container">
        <h2>
          {this.state.stockInfo.symbol}: ${this.state.price}
        </h2>
        <p>Sector: {this.state.stockInfo.sector}</p>
        <p>Company Name: {this.state.stockInfo.companyName}</p>
        <p>
          Website: <a href="www.apple.com">{this.state.stockInfo.website}</a>
        </p>
        <p>CEO: {this.state.stockInfo.CEO}</p>
        <p>{this.state.stockInfo.description}</p>
      </div>
    );
  }
}
