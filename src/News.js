import React from "react";
import NewsCard from './NewsCard.js';
class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsData: [],
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
                    var dataNews = data["items"]["result"];
                    this.setState({newsData: dataNews});
                }
                );
            })
            .catch(err => {
                console.log(err);
            });
    }
//     const img = [];
//     for (let i = 0; i < 10; i++) {
//     var check = data["items"]["result"][i]["main_image"];
//     if (check == null) {
//     img[i] = "https://uwosh.edu/facilities/wp-content/uploads/sites/105/2018/09/no-photo.png";
//     alert(img[i]);
// } else {
//     img[i] = check["original_url"];
//     alert(img[i]);
// }
// }
// this.setState.image = img;
    mapping(){
        return this.state.newsData.map(function(newsItem) {
            if (newsItem.main_image == null) {
                return (
                    <NewsCard heading={newsItem.title} imageURL={"https://uwosh.edu/facilities/wp-content/uploads/sites/105/2018/09/no-photo.png"} link={newsItem.link}>
                    </NewsCard>
                )
            } else {
                return (
                    <NewsCard heading={newsItem.title} imageURL={newsItem.main_image.original_url} link={newsItem.link}>
                    </NewsCard>
                )
            }

        })
    }
    render(){
        return (
            <div className="ui grid container">
                {this.APIcall()}{this.mapping()}
            </div>
        );
    }
}

export default News;