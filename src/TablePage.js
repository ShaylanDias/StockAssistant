import React from 'react';
import Link from 'react-router-dom';
// import Table from './Table.js'

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [new Table("Top Gainers", ['fuck', 'JavaScript'], [['test1', 'hi'], ['test2', 'he;llo']]),
      new Table("Top Losers", ['test', 'second'], [['test1', 'hi'], ['test2', 'he;llo']]),
      new Table("Highest Volume Traded", ['test', 'second'], [['test1', 'hi'], ['test2', 'he;llo']])

    ]
    }
    // this.generateRow = generateRow
    // this.generateHeader = generateHeader
    // this.generateRows = generateRows
    // this.generateTable = generateTable
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
      <body >
      <h2>{name}</h2>
      <table class="ui fixed celled table">
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
        return <td>{value}</td>
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
      <tr class="ui inverted red table">
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

// function generateTable(name, header, rows) {
//   return (
//     <>
//     <h2>{name}</h2>
//     <table class="ui celled table">
//     <thead>
//         {this.generateHeader(header)}  
//     </thead>
//     <tbody>
//         {this.generateRows(rows)}
//     </tbody>
//     </table>
//     </>
//   )
// }

// function generateRow(row) {
//   return (
//   <>
//   <tr>
//   {row.map((value) => {
//       return <td>{value}</td>
//   })}
//   </tr>
//   </>
//   )
// }

// function generateRows(rows) {
//   return (
//       <>
//       {
//       rows.map((value) => {   
//           return(<>{generateRow(value)}</>)    
//       })}
//       </>
//   )
// }

// function generateHeader(header) {
//   return (
//     <>
//     <tr>
//     {header.map((value) => {
//         return <th>{value}</th>
//     })}
//     </tr>
//     </>
//   )
// }