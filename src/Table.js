import React from 'react';
import Data from './Data.js'

export default class Table extends React.Component {


    constructor(props) {
        super(props);
        console.log(props)
        this.changeTable = this.changeTable.bind(this);
        this.state = {
          data: props.data//new Data("Top Gainers", tableHeader, emptyTable)
        }
        console.log(this.state.data)
      }

      changeTable(data) {
          this.setState({
              data: data
          })
      }

      render() {
        return(
          <>
            <>{this.generateTable(this.state.data.name, this.state.data.header, this.state.data.rows)}</>
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