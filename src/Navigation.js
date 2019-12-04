import React from 'react';
import Link from 'react-router-dom';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
          <div class="ui menu">
            <a class="active item" href = "">
              Home
            </a>
            <a class="item" href = "/Game">
              Game
            </a>
            <a class="item" href = "">
              Watchlist
            </a>
            <a class="item" href = "/News">
              News
            </a>
        </div>
        
      </div>
    );
  }
}
