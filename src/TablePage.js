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
            let res = data["finance"]["result"][0]["quotes"]
            var rows = []
            for (let i = 0; i < res.length; i++) {
                let row_data = res[i]
                rows += [row_data["symbol"], row_data["fullExchangeName"]]
              }
            console.log(res)
            this.setState({
                tables: [new Table("Top Gainers", tableHeader, rows),
                new Table("Top Losers", tableHeader, ['i']),
                new Table("Highest Volume Traded", tableHeader, ['i'])  
            ]
            })
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