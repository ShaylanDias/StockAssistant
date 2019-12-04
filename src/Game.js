import React from 'react';
import Chart from 'chart.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.countdown = this.countdown.bind(this);
    this.restart = this.restart.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.initializeChart = this.initializeChart.bind(this);
    this.state = {
      timer: 20,
      date: this.getRandomDate(),
      interval: setInterval(this.countdown, 1000),
      stock: "",
      balance: 1000,
      displayStock: "",
      displayDate: undefined,
      startPrice: 0,
      endPrice: 0,
      prices: [],
      days: [],
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
          endPrice: Math.floor(end * 100) / 100,
          prices: open,
          days: Array.from(Array(open.length-1), (e,i)=>i+1)
        });
        this.initializeChart();
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

  initializeChart() {
    var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.state.days,
                datasets: [{
                    label: 'Price',
                    data: this.state.prices,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });
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
                  <canvas id="myChart" width="400" height="400"></canvas>
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
