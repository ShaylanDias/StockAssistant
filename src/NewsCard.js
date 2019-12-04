import React from "react";

class NewsCard extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="fixedH">
            <a href={this.props.link} target="_blank">
            <div class= "ui card">
                <div class="image">
                <img src={this.props.imageURL}></img>
                </div>
                <div class="content">
                    <a class="header">{this.props.heading}</a>
                </div>
            </div>
            </a>
            </div>
        );
    }
}

export default NewsCard;