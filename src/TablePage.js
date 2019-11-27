import React from 'react';
import Link from 'react-router-dom';
import Table from './Table.js'
import Data from './Data.js'
import {emptyTable, emptyRow} from './Data.js'


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

   let setData = async function(symbol, table, ind) {
    console.log("SET DATA CALLED")
    await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=" + symbol, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
      }
    })
    .then(response => {
      let result = response.json().then(data => {
        table.rows[ind] = [symbol, data["price"]["shortName"], data["price"]["regularMarketPrice"]["raw"],
                data["price"]["regularMarketChange"]["raw"], data["price"]["regularMarketChangePercent"]["fmt"]]
        console.log(page.data)
        page.setState({
          tables: [
            <Table key={0} data = {page.data[0]}/>,
            <Table key={1} data = {page.data[1]}/>,
            <Table key={2} data = {page.data[2]}/>
          ]
        })
      })
    })
    .catch(err => {
      console.log("Error on stock data call", err);
      alert("error: " + symbol + ", " + err)
      this(symbol, table, ind)
    });
  }

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
          
          for (let i = 0, len = page.data.length; i < len; i++) {
            parse(i)
            for (let j = 0, len = page.data[i].rows.length; j < len; j++) {
              setData(page.data[i].rows[j][0], page.data[i], j)
            }
          }
        })
    })
    .catch(err => {
        console.log(err);
    });
  }

}