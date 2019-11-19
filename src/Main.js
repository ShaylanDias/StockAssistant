import React from 'react';
import {Route, Switch} from 'react-router-dom';
import News from './News.js';
export default function Main() {
  return(
    <Switch>
      <Route path="">
          <News/>
      </Route>
    </Switch>
  )
}
