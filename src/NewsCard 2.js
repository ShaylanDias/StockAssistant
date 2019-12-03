import React from "react";

const NewsCard = props => {
    function renderBody(){
        return (
            <div>
                <img className="ui fluid image" src={props.imageurl}>
                <h1>{props.heading}</h1>
                    <div className="ui sizer vertical segment">
                        <div className="ui huge header">Huge Header</div>
            </div>
        )
    }
}