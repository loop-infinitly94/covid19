import React, { Component } from 'react';
import axios from 'axios'
import * as lib from './lib'

class RssSectionGoogle extends Component {

    constructor(props){
        super(props);
        this.state = {
            rssFeedWHO: ''
        }
    }
    componentDidMount(){
        axios.get("https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml").then(async (response) => {
            // console.log(response)

            var parser = new DOMParser();
            var xmlDoc = await parser.parseFromString(response.data,"text/xml");
            // console.log(xmlToJson)
            var JsonData = lib.xmlToJson(xmlDoc)
            // console.log(JsonData)

            if(response.status === 200){
                this.setState({rssFeedWHO: JsonData})
            }
        })
    }

    refreshData(){
        var self = this;
        setInterval(() => {
            // self.setState({isLoading: true})
            axios.get("https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml").then(async (response) => {
            console.log(response)

            var parser = new DOMParser();
            var xmlDoc = await parser.parseFromString(response.data,"text/xml");
            // console.log(xmlToJson)
            var JsonData = lib.xmlToJson(xmlDoc)
            // console.log(JsonData)

            if(response.status === 200){
                this.setState({rssFeedWHO: JsonData})
            }
        })
        }, 10 * 60 * 1000);
    }

    render() {
        // console.log(this.state.rssFeedWHO)
        if(Object.keys(this.state.rssFeedWHO).length > 0) {
            return (
                <div className ="blogsection">
                    <div className = "blogpost" >
                    <span className = "myfeed">World News - The NewYork Times</span>
                        {this.state.rssFeedWHO.rss.channel.item.map((rss, index) => {
                            console.log(rss)
                            return (
                                <div key = {index} className = "eacharticle">
                                    {/* <img src = "./images/love.jpg" className = "blogimage"/> */}
                                    <span className = "blogtype">Health</span>
                                    <span className = "blogheading"><a href = {rss.link['#text'] !== undefined ? rss.link['#text'] : "#"} target="_blank">{rss.title['#text']}</a></span>
                                    <span className = "blogdescription">{lib.stripHtml(rss.description['#text'])}</span>
                                    {/* <span className = "blogdetails">
                                        <span className = "blogbyanddate">POSTED BY: {rss['author']['#text'] === " " ? <a href = {this.state.rssFeedWHO.rss.channel.link['#text']} target="_blank">The NewYork Times</a> : rss['author']['#text']}</span>
                                        <span className = "blogcomments">Date: {rss.pubDate['#text']}</span>
                                    </span> */}
                                </div>
                            )
                        })}
                        
                        
                    </div>
                </div>
                
            );
        }
        else{
            return null;
        }
    }
}

export default RssSectionGoogle;