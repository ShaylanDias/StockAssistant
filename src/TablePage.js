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
        <Table name='Top Gainers' header={['hello', 'test2']} rows = {[['1', '2'],['3', '4']]}> </Table>
        <Table name='Top Losers' header={['hello', 'test2']} rows = {[['1', '2'],['3', '4']]}> </Table>
        <Table name='Highest Volume Traded' header={['hello', 'test2']} rows = {[['1', '2'],['3', '4']]}> </Table>
      </>
    )
  }
}
