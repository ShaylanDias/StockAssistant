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

  // api call, update balance
  handleInput() {
    this.setState({
      balance: 1000,
      stock: "",
    })
    this.restart();

  }

  render() {
    return(
      <div>
        <h1>${this.state.balance}</h1>
        <h1>{this.state.timer}</h1>
        <h1>{this.state.date.toLocaleString('default', {month : 'long'})} {this.state.date.getFullYear()}</h1>
        <input
          placeholder="Stock Name"
          onChange={(e) => this.handleChange(e)}
          />
        <button onClick={this.handleInput}>Submit</button>
      </div>
    )
  }
}
