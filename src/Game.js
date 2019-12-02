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
    var startTime = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 1).valueOf();
    // beginning of the next month
    var endTime = new Date(this.state.date.getFullYear(), this.state.date.getMonth() % 12 + 1, 1).valueOf();
    // endTime open - startTime open
    // update balance
    this.setState({
      balance: 1000,
      stock: "",
    })
    this.restart();

  }

  render() {
    return(
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
    )
  }
}
