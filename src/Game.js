import React from 'react';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.countdown = this.countdown.bind(this);
    this.state = {
      timer: 20,
      date: this.getRandomDate(),
      interval: setInterval(this.countdown, 1000),
    }
  }

  countdown() {
    if (this.state.timer === 0) {
      clearInterval(this.state.interval);
      alert("Hello");
      this.setState({
        timer: 20,
        date: this.getRandomDate(),
        interval: setInterval(this.countdown, 1000),
      });

    } else {
      this.setState({timer : this.state.timer - 1});
    }
  }

  getRandomDate() {
    var start = 1325376000000;
    var end = 1572566399000;
    var date = new Date(Math.floor(Math.random() * (end - start + 1)) + start);
    console.log(date.toLocaleDateString());
    return date;
  }

  render() {
    return(
      <div>
        <h1>{this.state.timer}</h1>
        <h1>{this.state.date.toLocaleString('default', {month : 'long'})} {this.state.date.getFullYear()}</h1>
      </div>
    )
  }
}
