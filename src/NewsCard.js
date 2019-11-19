import React from "react";

class NewsCard extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <img className="ui fluid image" src={this.props.card.imageURL}></img>
                <div className="ui sizer vertical segment">
                    <div className="ui huge header">{this.props.card.heading}</div>
                </div>
            </div>
        );
    }
}

export default NewsCard;