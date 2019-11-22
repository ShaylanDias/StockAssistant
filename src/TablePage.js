import React from 'react';
import Link from 'react-router-dom';
// import Table from './Table.js'

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [new Table("Top Gainers", tableHeader, emptyTable),
      new Table("Top Losers", tableHeader, emptyTable),
      new Table("Highest Volume Traded", tableHeader, emptyTable)
    ]
    }
  }

  componentDidMount() {
    this.makeAPICall()
  }

  render() {
    return(
      <>
        {this.state.tables.map(
          (table) => {
            return (<>{this.generateTable(table.name, table.header, table.rows)}</>)
          }

        )}
      </>
    )
  }

  makeAPICall() {

    var tables = [new Table("Top Gainers", tableHeader, emptyTable),
    new Table("Top Losers", tableHeader, emptyTable),
    new Table("Highest Volume Traded", tableHeader, emptyTable)
   ]

   let page = this

   let setData = async function(symbol, table, ind, tables) {
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
          tables: tables
        })
      })
    })
    .catch(err => {
      console.log(err);
      alert("error: " + symbol + ", " + err)
      this(symbol, table, ind, tables)
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
              setData(tables[i].rows[j][0], tables[i], j, tables)
            }
          }
        })
    })
    .catch(err => {
        console.log(err);
    });
  }

  generateTable(name, header, rows) {
    return (
      <>
      <body style = {tableStyle}>
      <h2 style={titleStyle}>{name}</h2>
      <table class="ui fixed five column celled table">
      <thead>
          {this.generateHeader(header)}  
      </thead>
      <tbody>
          {this.generateRows(rows)}
      </tbody>
      </table>
      </body>
      </>
    )
  }


  generateRow(row) {
    return (
    <>
    <tr>
    {
      row.map((value) => {
        return <td class = "center aligned" style = {bodyTextStyle}>{value}</td>
    })}
    </tr>
    </>
    )
  }

  generateRows(rows) {
    return (
        <>
        {
        rows.map((value) => {   
            return(<>{this.generateRow(value)}</>)    
        })}
        </>
    )
  }
  
  generateHeader(header) {
    return (
      <>
      <tr class="ui inverted blue center aligned table" style = {{'font-weight': 'bold'}}>
      {header.map((value) => {
          return <th>{value}</th>
      })}
      </tr>
      </>
    )
  }
}


class Table {
    constructor(name, header, rows) {
      this.name = name
      this.header = header
      this.rows = rows
    }
}

const tableHeader = ["Symbol", "Name", "Price", "Change", "% Change"]
const emptyRow = ['-', '-', '-', '-', '-']
const emptyTable = [emptyRow, emptyRow, emptyRow, emptyRow, emptyRow]
const titleStyle = {
  color: '#1b71b1',
  'text-align': 'center'
};

const bodyTextStyle = {
  color: '#1b71b1',
  'font-weight': 'bold'
}

const tableStyle = {
  'margin-top': '30px',
  'margin-left': '100px',
  'margin-right': '100px'
};