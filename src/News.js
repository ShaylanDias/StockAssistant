import React from "react";
class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
        }

    }
    APIcall(){
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news?region=US&category=NBEV", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                "x-rapidapi-key": "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9"
            }
        })
            .then(response => {
                console.log(response);
                response.json().then(data => {
                    let res = data["items"]["result"][0]["title"];
                    const api = [];

                }
                )
                const api = [];
                for (let i = 0; i < 10; i++){
                    api[i] = res.items.result.i;
                    alert(api[i]);
                }
                this.setState.arr = api;
            })
            .catch(err => {
                console.log(err);
            });
    }
    render(){
        return (
            <div>{this.APIcall()}</div>
        );
    }
}

export default News;