import React, { Component } from 'react';
import axios from 'axios'

// Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

class RssSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            rssFeedWHO: ''
        }
    }
    componentDidMount(){
        axios.get("https://www.who.int/rss-feeds/news-english.xml").then(async (response) => {
            var parser = new DOMParser();
            var xmlDoc = await parser.parseFromString(response.data,"text/xml");
            // console.log(xmlToJson)
            var JsonData = xmlToJson(xmlDoc)
            if(response.status === 200){
                this.setState({rssFeedWHO: JsonData})
            }
        })
    }

    refreshData(){
        var self = this;
        setInterval(() => {
            // self.setState({isLoading: true})
            axios.get("https://www.who.int/rss-feeds/news-english.xml").then(async (response) => {
                var parser = new DOMParser();
                var xmlDoc = await parser.parseFromString(response.data,"text/xml");
                // console.log(xmlToJson)
                var JsonData = xmlToJson(xmlDoc)
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
                    <span className = "myfeed">NEWS FEED</span>
                        {this.state.rssFeedWHO.rss.channel.item.map((rss, index) => {

                            return (
                                <div key = {index} className = "eacharticle">
                                    {/* <img src = "./images/love.jpg" className = "blogimage"/> */}
                                    <span className = "blogtype">Health</span>
                                    <span className = "blogheading"><a href = {rss.link['#text']} target="_blank">{rss.title['#text']}</a></span>
                                    <span className = "blogdescription">{rss.description['#text']}</span>
                                    <span className = "blogdetails">
                                        <span className = "blogbyanddate">POSTED BY: {rss['a10:author']['a10:name']['#text'] === " " ? <a href = {this.state.rssFeedWHO.rss.channel.link['#text']} target="_blank">WHO</a> : rss['a10:author']['a10:name']['#text']}</span>
                                        <span className = "blogcomments">Date: {rss.pubDate['#text']}</span>
                                    </span>
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

export default RssSection;