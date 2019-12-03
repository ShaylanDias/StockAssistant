import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Navigation from './Navigation.js';
import News from './News.js';
export default function Main() {
  return(
    <Switch>

      <Route path="/News">
          <News/>
      </Route>
    </Switch>
  )
}
