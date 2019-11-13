import React from 'react';
import Link from 'react-router-dom';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        /*
        * Contains the data rows for the table.
        * Rows are arrays of Strings, assumes all rows are the same length.
        */
        rows: this.props.rows,
        /*
        * Contains the header data for the table as an array. Should be the same length as the row lengths
        */
        header: this.props.header,
        name: this.props.name
      };
      this.generateRow = generateRow
      this.generateHeader = generateHeader
      this.generateRows = generateRows
  }


  render() {
    return(
        <>
        <h2>{this.state.name}</h2>
        <table class="ui celled table">
        <thead>
            {this.generateHeader()}  
        </thead>
        <tbody>
            {this.generateRows()}
        </tbody>
      </table>
      </>
    )
  }
}


var generateRow = function(row) {
    return (
    <>
    <tr>
    {row.map((value) => {
        return <td>value</td>
    })}
    </tr>
    </>
    )
}

var generateRows = function() {
    return (
        <>
        {
        this.state.rows.map((value) => {   
            return(generateRow(value))    
        })}
        </>
    )
}

var generateHeader = function() {
    return (
      <>
      <tr>
      {this.state.header.map((value) => {
          return <th>value</th>
      })}
      </tr>
      </>
    )
}