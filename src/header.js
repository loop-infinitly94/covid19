import React from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';

function Header(props) {
    
    return (
        <div className = "Header">
            <span className = "headerImage"><Link to="/"><img src = "./TheCovidAnalysis_V1_Header.png"/></Link></span>
            {/* <span className = "headerTitle">The Covid Analysis</span> */}
            <div className = "menu">
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