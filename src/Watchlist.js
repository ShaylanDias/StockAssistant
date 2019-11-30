import React from 'react';
import Table from './Table.js'
import Data from './Data.js'
import {emptyRow} from './Data.js'


const tableHeader = ["Symbol", "Name", "Price", "Change", "% Change"]
var page

export default class Watchlist extends React.Component {

    inputBox = <div class="ui fluid input"><input onKeyPress={this.handleInput} type="text" placeholder="Symbol..."/></div>
    inputRow = [this.inputBox, '', '', '', '']
    data = new Data("Watchlist", tableHeader, [this.inputRow])

    constructor(props) {
        super(props);        
        this.state = {
          table: <Table data = {this.data}/>
        }
        page = this
      }

      componentDidMount() {
        this.grabStockData()
      }

      grabStockData() {
        let symbols = localStorage.getItem("symbols")
        if (symbols) {
            let symbolArr = this.getSymbols(symbols)
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
                        newRows.push([page.inputBox, '', '', '', ''])
                        console.log(newRows)
                        console.log("SET STATE CALLED")
                        this.data = new Data("Watchlist", tableHeader, newRows)
                        console.log(this)
                        this.setState({
                            table: <Table data = {this.data}/>
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
            {this.state.table}
            </>
          )
      }

      handleInput(event) {
        let key = event.key
        let value = event.target.value.toUpperCase()
        if (key === 'Enter') {
            console.log(key, value)
            if(!getSymbols(localStorage.getItem("symbols")).includes(value)) {
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
                        console.log(page.data.rows)
                        page.data.rows.pop()
                        page.data.rows.push(newRow)
                        page.data.rows.push(page.inputRow)
                        console.log(page.data.rows)
                        page.setState({
                            table: <Table data = {page.data}/>,
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