import React from "react";
import {Link} from 'react-router-dom' ;

function Header(){
    return <header>
        <div>
            <Link to={"/"}>
                <img id="insta" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
                    alt="<instagram logo>" height="30" width="30"></img>
            </Link>
            <Link to={"/"}>
                <h1 id = "headTitle">Snapchat</h1>
            </Link>
        </div>
    </header>
}



export default Header ;