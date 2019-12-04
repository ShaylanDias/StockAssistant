import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Game from './Game.js';
import TablePage from './TablePage.js';
import News from './News.js';
import Watchlist from './Watchlist.js';

export default function Main() {
  return(
    <Switch>
      <Route exact path='/' component={Game}></Route>
      <Route path='/tables' component={TablePage}></Route>
      <Route path='/news' component={News}></Route>
      <Route path='/watchlist' component={Watchlist}></Route>
    </Switch>
  )
}
