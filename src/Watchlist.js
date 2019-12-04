import React from 'react';
import Table from './Table.js'
import Data from './Data.js'
import {emptyRow} from './Data.js'


const tableHeader = ["Symbol", "Name", "Price", "Change", "% Change"]
var page

const notificationInputStyle = {
    'marginTop': '30px',
    'marginLeft': '100px',
    'marginRight': '100px',
    'marginBottom': '30px'
  };

export default class Watchlist extends React.Component {

    ceilingInput = 0
    flootInput = 0
    notificationTicker = ''
    intervalID = 11214214

    inputBox = <div class="ui transparent fluid input"><input onKeyPress={this.handleWatchlistTickerInput} type="text" placeholder="Add Ticker..."/></div>
    inputRow = [this.inputBox, <button onClick = {this.clearStorage} class="ui basic blue fluid button">Clear List</button>, '', '', '']
    loadingInputRow = [this.inputBox, <button class="ui basic loading blue fluid button">Clear List</button>, '', '', '']
    notificationTickerInput = <div onKeyPress={function(e) {this.notificationTicker = e.target.value.toUpperCase()}.bind(this)}  class="ui input"><input type="text" placeholder="Add Notification Ticker..."/></div>
    notificationCeilingInput = <div onKeyPress={function(e) {this.ceilingInput = e.target.value}.bind(this)} class="ui input"><input type="text" placeholder="Add Ceiling..."/></div>
    notificationFloorInput = <div onKeyPress={function(e) {this.flootInput = e.target.value}.bind(this)} class="ui input"><input type="text" placeholder="Add Floor..."/></div>
    submitNotification = <button onClick = {this.handleNotificationInput} class="ui basic button">Submit Notification</button>

    notificationInput = 
        <div style={notificationInputStyle}>
            {this.notificationTickerInput}
            {this.notificationCeilingInput}
            {this.notificationFloorInput}
            {this.notificationAmountInput}
            {this.submitNotification}
        </div>

    constructor(props) {
        super(props);        
        this.state = {
          data: new Data("Watchlist", tableHeader, [this.inputRow])
        }
        page = this
      }

    componentDidMount() {
        if(!Notification.permission !== "granted") {
            Notification.requestPermission()
        }
        this.grabStockData()
        this.intervalID = setInterval(
            this.checkNotifications,
            300000
        )
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.state.data) {
            this.setState({
              data: this.state.data
            })
        }
      }

      checkNotifications() {
          console.log(localStorage.getItem("notification"))
        if(localStorage.getItem("notification")) {
            let notifications = JSON.parse(localStorage.getItem("notification"))
            for(let i = 0, len = notifications.length; i < len; i++) {
                let notification = notifications[i]
                let value = notification.symbol
                fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&lang=en&symbol=" + value, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                    "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
                    }
                })
                .then(response => {
                    response.json().then(data => {
                        console.log(data)
                        let price = data["price"]["regularMarketPrice"]["fmt"]
                        let name = data["price"]["shortName"]
                        if(price >= notification.ceiling) {
                            let alert = new Notification(name + " has gone over $" + notification.ceiling)
                        }
                        else if(price < notifications.min) {
                            let alert = new Notification(name + " has gone under $" + notification.floor)
                        }
                    }
                    ).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                });  

            }
        }
      }

      handleNotificationInput() {
        if(!Notification.permission !== "granted") {
            Notification.requestPermission()
        }
        let value = page.notificationTicker
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&lang=en&symbol=" + value, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                    "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
                    }
                })
                .then(response => {
                    response.json().then(data => {
                        console.log(data)
                        let notification = new NotificationData(value, page.notificationCeilingInput.toString(2), page.notificationFloorInput.toString(2))
                        if(!localStorage.getItem("notification")) {
                            localStorage.setItem("notification", JSON.stringify([notification]))
                        }
                        else {
                            let stored = localStorage.getItem("notification")
                            var array = JSON.parse(stored)
                            array.push(stored)
                            localStorage.setItem("notification", JSON.stringify(array))
                        }
                        alert("Notification Added.")
                    }
                    ).catch(err => {
                        console.log(err);
                        new Notification("Failed to Add Notification")
                    });
                }).catch(err => {
                    console.log(err);
                    new Notification("Failed to Add Notification: Incorrect Symbol")
                });  
                  
      }

      grabStockData() {
        let symbols = localStorage.getItem("symbols")
        if (symbols) {
            let symbolArr = this.getSymbols(symbols)
            this.setWatchlistLoading()
            fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=" + symbols, {
                    "method": "GET",
                    "headers": {
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                    "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
                    }
                })
                .then(response => {
                    console.log(response);
                    response.json().then(data => {
                        console.log(data)
                        let newRows = []
                        for(let i = 0, len = symbolArr.length; i < len; i++) {
                            let relData = data["quoteResponse"]["result"][i]
                            newRows.push([symbolArr[i], relData["shortName"], roundToTwo(relData["regularMarketPrice"]),
                            roundToTwo(relData["regularMarketChange"]), roundToTwo(relData["regularMarketChangePercent"])])
                        }
                        newRows.push(page.inputRow)
                        console.log(newRows)
                        console.log("SET STATE CALLED")
                        let newData = new Data("Watchlist", tableHeader, newRows)
                        console.log(this)
                        this.setState({
                            data: newData
                        })
                        console.log(this)
                    }) 
                })
                .catch(err => {
                    console.log(err);
                });
        }
      }

      getSymbols(symbolString) {
        let symbols = []
        var ind = symbolString.indexOf(",")
        while(ind !== -1) {
            symbols.push(symbolString.slice(0, ind))
            symbolString = symbolString.slice(ind + 1, symbolString.length)
            ind = symbolString.indexOf(",")
        }
        return symbols
      }

      render() {
        return(
            <>
                {console.log("Watchlist Rendered")}
                {console.log("Watchlist data", this.state.data)}
                <Table data = {this.state.data}/>
                {this.notificationInput}
            </>
          )
      }

      setWatchlistLoading() {
        var rows = page.state.data.rows
        rows.pop()
        rows.push(page.loadingInputRow)
        page.setState({
            tables: new Data("Watchlist", tableHeader, rows)
        })
      }

      handleWatchlistTickerInput(event) {
        let key = event.key
        let value = event.target.value.toUpperCase()
        if (key === 'Enter') {
            console.log(key, value)
            if(!getSymbols(localStorage.getItem("symbols")).includes(value)) {
                page.setLoading()
                fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&lang=en&symbol=" + value, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                    "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
                    }
                })
                .then(response => {
                    response.json().then(data => {
                        console.log(data)
                        let relData = data["price"]
                        console.log(relData)
                        let newRow = [value, relData["shortName"], relData["regularMarketPrice"]["fmt"],
                        relData["regularMarketChange"]["fmt"], relData["regularMarketChangePercent"]["fmt"]]
                        var rows = page.state.data.rows
                        console.log(rows)
                        rows.pop()
                        rows.push(newRow)
                        rows.push(page.inputRow)
                        console.log(rows)
                        let newData = new Data("Watchlist", tableHeader, rows)
                        page.setState({
                            data: newData
                        })
                        if(!localStorage.getItem("symbols")) {
                            console.log("SET")
                            localStorage.setItem("symbols", value + ",")
                        }
                        else {
                            localStorage.setItem("symbols", localStorage.getItem("symbols") + value + ",")
                        }
                        console.log(localStorage.getItem("symbols"))
                    }) 
                    .catch(err => {
                        console.log(err);
                        alert("Invalid Stock Symbol")
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else {
                alert("Ticker Already Added")
            }
            event.target.value = ""
        }
      };

      setLoading() {
        var rows = page.state.data.rows
        rows.pop()
        rows.push(page.loadingInputRow)
        page.setState({
            tables: new Data("Watchlist", tableHeader, rows)
        })
      }

      clearStorage() {
        localStorage.setItem("symbols", "")
          page.setState({
              data: new Data("Watchlist", tableHeader, [page.inputRow])
          })
      }

}

class NotificationData {
    constructor(symbol, ceiling, floor) {
        this.symbol = symbol
        this.ceiling = ceiling
        this.floor = floor
    }

    toString() {
        return JSON.stringify(this)
    }
}

function roundToTwo(num) {
    return parseFloat(Math.round(num * 100) / 100).toFixed(2);
  }

function getSymbols(symbolString) {
    if(!symbolString) {
        return []
    }
    let symbols = []
    var ind = symbolString.indexOf(",")
    while(ind !== -1) {
        symbols.push(symbolString.slice(0, ind))
        symbolString = symbolString.slice(ind + 1, symbolString.length)
        ind = symbolString.indexOf(",")
    }
    return symbols
}