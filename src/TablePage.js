import React from 'react';
import Table from './Table.js'
import Data from './Data.js'
import {emptyTable} from './Data.js'


const tableHeader = ["Symbol", "Name", "Price", "Change", "% Change"]

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [
        <Table key={0} data = {this.data[0]}/>,
        <Table key={1} data = {this.data[1]}/>,
        <Table key={2} data = {this.data[2]}/>
      ]
    }
  }

  data = [new Data("Top Gainers", tableHeader, emptyTable), new Data("Top Losers", tableHeader, emptyTable), new Data("Highest Volume Traded", tableHeader, emptyTable)]

  componentDidMount() {
    this.makeAPICall()
  }

  render() {
    return(
      <>
        {this.state.tables}
      </>
    )
  }

  makeAPICall() {
    let page = this
    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers?region=US&lang=en", {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
              "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
          }
      })
      .then(response => {
          response.json().then(data => {
            let parse = function(ind) {
              let res = data["finance"]["result"][ind]["quotes"]
              var rows = []
              console.log(res)
              for (let i = 0; i < res.length; i++) {
                  let row_data = res[i]
                  rows.push([row_data["symbol"]])
              }
              page.data[ind].rows = rows
            }

            for(let i = 0; i < this.data.length; i++) {
              parse(i)
              var symbols = ''
              console.log(this.data)
              console.log(i)
              console.log(this.data[i].rows)
              for(let ind = 0, len = this.data[i].rows.length - 1; ind < len; ind++) {
                symbols += this.data[i].rows[ind] + ','
              }
              symbols += this.data[i].rows[this.data[i].rows.length-1]
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
                  for(let j = 0, len = this.data[i].rows.length; j < len; j++) {
                    let relData = data["quoteResponse"]["result"][j]
                    this.data[i].rows[j] = [this.data[i].rows[j][0], relData["shortName"], roundToTwo(relData["regularMarketPrice"]),
                    roundToTwo(relData["regularMarketChange"]), roundToTwo(relData["regularMarketChangePercent"])]
                  }
                  
                  this.setState({
                    tables: [
                      <Table key={0} data = {this.data[0]}/>,
                      <Table key={1} data = {this.data[1]}/>,
                      <Table key={2} data = {this.data[2]}/>
                    ]
                  })
                }) 
              })
              .catch(err => {
                console.log(err);
              });
            }
          })
      })
      .catch(err => {
          console.log(err);
      });
    }
}

function roundToTwo(num) {
  return parseFloat(Math.round(num * 100) / 100).toFixed(2);
}