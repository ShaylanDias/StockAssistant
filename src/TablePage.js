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
        <Table data = {this.data[0]}/>,
        <Table data = {this.data[1]}/>,
        <Table data = {this.data[2]}/>
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

    var tables = [new Data("Top ", tableHeader, emptyTable),
    new Data("Top ", tableHeader, emptyTable),
    new Data("Highest  Traded", tableHeader, emptyTable)
   ]

   let page = this

   let setData = async function(symbol, table, ind) {
    await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=" + symbol, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
      }
    })
    .then(response => {
      let result = response.json().then(data => {
      console.log(data)
        table.rows[ind] = [symbol, data["price"]["shortName"], data["price"]["regularMarketPrice"]["raw"],
                data["price"]["regularMarketChange"]["raw"], data["price"]["regularMarketChangePercent"]["fmt"]]
        page.setState({
          tables: [
            <Table data = {page.data[0]}/>,
            <Table data = {page.data[1]}/>,
            <Table data = {page.data[2]}/>
          ]
        })
        // for (let i = 0; i < page.state.tables.length; i++) {
        //   // console.log(page.state.tables[i].props.)
        //   page.state.tables[i].changeTable(tables[i])
        // }
      })
    })
    .catch(err => {
      console.log(err);
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
        let result = response.json().then(data => {
          let parse = function(ind) {
            let res = data["finance"]["result"][ind]["quotes"]
            var rows = []
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                let row_data = res[i]
                rows.push([row_data["symbol"]])
            }
            tables[ind].rows = rows
          }
          
          for (let i = 0, len = tables.length; i < len; i++) {
            parse(i)
            for (let j = 0, len = tables[i].rows.length; j < len; j++) {
              setData(tables[i].rows[j][0], tables[i], j)
            }
          }
        })
    })
    .catch(err => {
        console.log(err);
    });
  }

}