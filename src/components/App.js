import React from "react";
import Header from "./Header"
import Footer from "./Footer" 
import Card from "./Card"
import UserList from "./UserList";
import {BrowserRouter as Router, Route} from 'react-router-dom' ; 
import Posts from "./Posts";

function App(){
    return <Router>
        <div>
            <Header/>
            <Card fetchUrl="/users"/>
            <Posts cltype="posts" fetchUrl="/posts" />
            <UserList fetchUrl="/users"/>
            <Footer/>
        </div>
    </Router>
}

export default App ;