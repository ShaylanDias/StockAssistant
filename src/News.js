import React from "react";
class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: [],
            image: [],
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
                    const titl = [];
                    for (let i = 0; i < 10; i++){
                        titl[i] = data["items"]["result"][i]["title"];
                    }
                    this.setState.title = titl;

                    const img = [];
                    for (let i = 0; i < 10; i++) {
                        var check = data["items"]["result"][i]["main_image"];
                        if (check == null) {
                            img[i] = "https://uwosh.edu/facilities/wp-content/uploads/sites/105/2018/09/no-photo.png";
                            alert(img[i]);
                        } else {
                            img[i] = check["original_url"];
                            alert(img[i]);
                        }
                        this.setState.image = img;
                    }
                }
                );
            })
            .catch(err => {
                console.log(err);
            });
    }
    render(){
        return (
            <div>
            <h1>News</h1>
            <div align="center" padding="20%" margin="30%">
                <div class="ui search">
                <div class="ui icon input">
                  <input class="prompt" type="text" placeholder="Search news..."/>
                  <i class="search icon"></i>
                </div>
                <div class="results"></div>
              </div>
            </div>
            <div>{this.APIcall()}</div>
            </div>
        );
    }
}

export default News;
