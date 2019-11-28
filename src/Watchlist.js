import React from 'react';
import Table from './Table.js'
import Data from './Data.js'
import {emptyRow} from './Data.js'


const tableHeader = ["Symbol", "Name", "Price", "Change", "% Change"]

export default class TablePage extends React.Component {

    data = new Data("Watchlist", tableHeader, [[<div class="ui fluid input"><input onChange={this.handleInput} type="text" placeholder="Symbol..."/></div>, '', '', '', '']])
    // x = [<div style={inputSpacing} class="ui fluid input"><input type="text" placeholder="Symbol..."/></div>, '', '', '', '']

    constructor(props) {
        super(props);        
        this.state = {
          table: <Table data = {this.data}/>
        }
      }

      componentDidMount() {
        let symbols = document.getElementById("symbols")
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=" + symbols, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                  "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
                }
              })
              .then(response => {
                console.log(response);
                response.json().then(data => {
                  console.log(data)
                //   for(let i = 0, len = this.data[i].rows.length; j < len; j++) {
                //     let relData = data["quoteResponse"]["result"][j]
                //     this.data[i].rows[j] = [this.data[i].rows[j][0], relData["shortName"], roundToTwo(relData["regularMarketPrice"]),
                //     roundToTwo(relData["regularMarketChange"]), roundToTwo(relData["regularMarketChangePercent"])]
                //   }
                  
                //   this.setState({
                //     tables: [
                //       <Table key={0} data = {this.data[0]}/>,
                //       <Table key={1} data = {this.data[1]}/>,
                //       <Table key={2} data = {this.data[2]}/>
                //     ]
                //   })
                }) 
              })
              .catch(err => {
                console.log(err);
              });
      }

      render() {
        return(
            <>
            {this.state.table}
            </>
          )
      }

      handleInput(event) {
        let entered = event.target.value
        if (entered[entered.length -1] === '\n') {

        }
      };

}


function roundToTwo(num) {
    return parseFloat(Math.round(num * 100) / 100).toFixed(2);
  }