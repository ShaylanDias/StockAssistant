import React from 'react';
import Link from 'react-router-dom';
// import Table from './Table.js'

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [new Table("Top Gainers", tableHeader, [['test1', 'hi'], ['test2', 'he;llo']]),
      new Table("Top Losers", tableHeader, [['test1', 'hi'], ['test2', 'he;llo']]),
      new Table("Highest Volume Traded", tableHeader, [['test1', 'hi'], ['test2', 'he;llo']])
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

    var tables = [new Table("Top Gainers", tableHeader, [[]]),
    new Table("Top Losers", tableHeader, [[]]),
    new Table("Highest Volume Traded", tableHeader, [[]])
   ]

    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers?region=US&lang=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
        }
    })
    .then(response => {
        console.log(response);
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
              tables[i].rows[j] = this.grabData(tables[i].rows[j][0])
            }
            console.log(tables[i].rows)
            this.setState({
              tables: tables
            })
          }
        })
    })
    .catch(err => {
        console.log(err);
    });
  }
  
  grabData(symbol) {
    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=" + symbol, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
      }
    })
    .then(response => {
      let result = response.json().then(data => {
        console.log(data)
        return [symbol, data["price"]["shortName"], data["price"]["regularMarketPrice"]["raw"],
                data["price"]["regularMarketChange"]["raw"], data["price"]["regularMarketChangePercent"]["fmt"]]
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
    {console.log((typeof row) + ", " + row)}
    {
      row.map((value) => {
        return <td class = "center aligned">{value}</td>
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
      <tr class="ui inverted blue center aligned table">
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

const titleStyle = {
  color: '#1b71b1',
  'text-align': 'center'
};

const tableStyle = {
  'margin-top': '30px',
  'margin-left': '100px',
  'margin-right': '100px'
};