import React from 'react';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.countdown = this.countdown.bind(this);
    this.restart = this.restart.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      timer: 20,
      date: this.getRandomDate(),
      interval: setInterval(this.countdown, 1000),
      stock: "",
      balance: 1000,
      displayStock: "",
      displayDate: undefined,
      startPrice: 0,
      endPrice: 0
    }
  }

  restart() {
    clearInterval(this.state.interval);
    this.setState({
      timer: 20,
      date: this.getRandomDate(),
      interval: setInterval(this.countdown, 1000),
    });
  }

  countdown() {
    if (this.state.timer === 0) {
      // alert("Hello");
      this.restart();
    } else {
      this.setState({timer : this.state.timer - 1});
    }
  }

  getRandomDate() {
    var start = 1325376000000;
    var end = 1572566400000;
    var date = new Date(Math.floor(Math.random() * (end - start)) + start);
    return date;
  }

  // update this.state.stock
  handleChange(event) {
    this.setState({
      stock: event.target.value
    })
  }

  // after submitting a stock name
  handleInput() {
    var stockName = this.state.stock.toUpperCase();
    // beginning of the month
    var year = this.state.date.getFullYear();
    var month = this.state.date.getMonth();
    var startTime = new Date(year, month, 1).valueOf() / 1000;
    // beginning of the next month
    var endTime = new Date(year, month % 12 + 1, 1).valueOf() / 1000;
    // endTime open - startTime open
    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-histories?region=US&lang=en&symbol=" + stockName + "&from=" + startTime + "&to=" + endTime + "&events=div&interval=1d", {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    		"x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
    	}
    })
    .then(response => {
    	console.log(response);
      response.json().then(data => {
        var open = data["chart"]["result"][0]["indicators"]["quote"][0]["open"];
        var start = open[0];
        var end = open[open.length - 1];
        var update = this.state.balance + ((end - start) / start * this.state.balance);
        this.setState({
          balance: Math.floor(update * 100) / 100,
          displayStock: stockName,
          displayDate: new Date(year, month, 1),
          startPrice: Math.floor(start * 100) / 100,
          endPrice: Math.floor(end * 100) / 100
        });
      })
      .catch(err => {
        console.log(err);
        alert("Invalid Stock Symbol");
      });
    })
    .catch(err => {
    	console.log(err);
    });
    // update balance
    this.restart();
  }

  render() {
    return(
      <div>
        <div className="ui three column grid">
          <div className="column">
            <div className="ui segment">
              <h1>${this.state.balance}</h1>
            </div>
          </div>
          <div className="two wide column">
            <div className="ui segment">
              <h1>{this.state.timer}</h1>
            </div>
          </div>
          <div className="eight wide column">
            <div className="ui segment">
              <h1>{this.state.date.toLocaleString('default', {month : 'long'})} {this.state.date.getFullYear()}</h1>
              <div className="ui action input">
                <input
                  placeholder="Stock Name"
                  onChange={(e) => this.handleChange(e)}
                />
                <button className="ui button" onClick={this.handleInput}>Submit</button>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div>
          {this.state.displayDate ? (
            <div className="ui centered raised teal card">
              <div className="content">
                <div className="header">
                  <h1>{this.state.displayStock}</h1>
                </div>
                <div className="meta">
                  <h4>{this.state.displayDate.toLocaleString('default', {month : 'long'})} {this.state.displayDate.getFullYear()}</h4>
                </div>
                <div className="description">
                  <div className="ui two tiny teal statistics">
                    <div className="statistic">
                      <div className="value">
                        ${this.state.startPrice}
                      </div>
                      <div className="label">
                        Start Price
                      </div>
                    </div>
                    <div className="statistic">
                      <div className="value">
                        ${this.state.endPrice}
                      </div>
                      <div className="label">
                        End Price
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    )
  }
}
