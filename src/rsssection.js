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

    render() {
        console.log(this.state.rssFeedWHO)
        return (
            <section className ="blogsection">
                <div className = "blogpost" >
                <span className = "myfeed">MY FEED</span>
                    <div className = "eacharticle">
                        {/* <img src = "./images/love.jpg" className = "blogimage"/> */}
                        <span className = "blogtype">Horoscopes</span>
                        <span className = "blogheading">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nibh ac neque pharetra</span>
                        <span className = "blogdetails">
                            <span className = "blogbyanddate">POSTED BY: Abc Xyz</span>
                            <span className = "blogcomments">400 COMMENTS</span>
                        </span>
                    </div>
                    <div className = "eacharticle">
                        {/* <img src = "./images/love.jpg" className = "blogimage"/> */}
                        <span className = "blogtype">Horoscopes</span>
                        <span className = "blogheading">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nibh ac neque pharetra</span>
                        <span className = "blogdetails">
                            <span className = "blogbyanddate">POSTED BY: Abc Xyz</span>
                            <span className = "blogcomments">400 COMMENTS</span>
                        </span>
                    </div>
                    <div className = "eacharticle">
                        {/* <img src = "./images/love.jpg" className = "blogimage"/> */}
                        <span className = "blogtype">Horoscopes</span>
                        <span className = "blogheading">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nibh ac neque pharetra</span>
                        <span className = "blogdetails">
                            <span className = "blogbyanddate">POSTED BY: Abc Xyz</span>
                            <span className = "blogcomments">400 COMMENTS</span>
                        </span>
                    </div>
                </div>
            </section>
            
        );
    }
}

export default RssSection;