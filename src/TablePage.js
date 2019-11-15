import React from 'react';
import Link from 'react-router-dom';
// import Table from './Table.js'

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [new Table("Top Gainers", ['fuck', 'JavaScript', '', '', ''], [['test1', 'hi'], ['test2', 'he;llo']]),
      new Table("Top Losers", ['test', 'second', '', '', ''], [['test1', 'hi'], ['test2', 'he;llo']]),
      new Table("Highest Volume Traded", ['test', 'second', '', '', ''], [['test1', 'hi'], ['test2', 'he;llo']])

    ]
    }
    // this.generateRow = generateRow
    // this.generateHeader = generateHeader
    // this.generateRows = generateRows
    // this.generateTable = generateTable
  }

  componentDidMount() {
    fetch('apidojo-yahoo-finance-v1.p.rapidapi.com', {
      "x-rapidapi-key": '179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9'
    }).then(response => response.json())
    .then(data => alert(data))
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

var titleStyle = {
  color: '#1b71b1',
  'text-align': 'center'
};

var tableStyle = {
  'margin-top': '30px',
  'margin-left': '100px',
  'margin-right': '100px'
};
