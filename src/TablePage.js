import React from 'react';
import Link from 'react-router-dom';
import Table from './Table.js'

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
        <Table name='Top Gainers'> </Table>
        <Table name='Top Losers'> </Table>
        <Table name='Highest Volume Traded'> </Table>
      </>
    )
  }
}
