import React, {useEffect} from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';

const toggleMenu = (ev) => {
    // console.log(document.getElementById('menu').style.display)
    if(document.getElementById('menu').style.display === '' || document.getElementById('menu').style.display === 'none'){
        document.getElementById('menu').style.display = 'block';
    }
    else{
        document.getElementById('menu').style.display = 'none'
    }
}

const hideSetting = (ev) => {
    if (document.getElementById('hamburger').contains(ev.target)){
        return
    }
    if (document.getElementById('menu').contains(ev.target)){
        return
    }
    
    document.getElementById('menu').style.display = 'none';
}

function Header(props) {
    var documentClick = document;
    // if (document.getElementById('LiLayout_settingsPopUp').contains(ev.target)){
    //     return
    // }
    // if(document.getElementById('LiLayout_userDetails').contains(ev.target)){
    //   return
    // }
    
    // document.getElementById('LiLayout_settingsPopUp').style.display = 'none';
    useEffect(() => {
        documentClick.addEventListener('click', hideSetting);
    
        return () => {
            document.removeEventListener('click', hideSetting);
        };
    }, [documentClick]);

    return (
        <div className = "Header">
            <span className = "headerImage"><Link to="/"><img src = "./TheCovidAnalysis_V1_Header.png"/></Link></span>
            {/* <span className = "headerTitle">The Covid Analysis</span> */}
            <span className = "hamburger" id = "hamburger" onClick = {(ev) => toggleMenu(ev)}>&#x2630;</span>
            <div className = "menu" id = "menu">
                <ul>
                    <li>
                    <Link className = {window.location.pathname === '/' ? "active" : "notAcive"} to="/">Live Updates </Link>
                    </li>
                    <li>
                    <Link className = {window.location.pathname === '/newsfeedsworld' ? "active" : "notAcive"} to="/newsfeedsworld">World News</Link>
                    </li>
                    <li>
                    <Link className = {window.location.pathname === '/newsfeedswho' ? "active" : "notAcive"} to="/newsfeedswho">WHO Updates</Link>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default withRouter(Header);