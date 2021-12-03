import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {Link,useNavigate} from 'react-router-dom' ;
import Note from "./Note";
import axios from "./axios"


function Posts({title,cltype,fetchUrl}){
    const [posts,setPosts] = useState([]) ;
    let nav = useNavigate() ;
    let route = useLocation().pathname ;
    let decomposedRoute = route.split("/") ;
    let user = -1 , post = -1 ;
    if(decomposedRoute[1] == "users")
        user = decomposedRoute[2]  ; // route is in form "/users/xx"
    if(decomposedRoute[3] != undefined)
        post = decomposedRoute[3] ;
    useEffect(() => {
        async function fetchPosts(){
            const requestPosts = await axios.get(fetchUrl) ;
            let userPosts = requestPosts.data.filter((elem) => elem["userId"]==user)
                .sort((x,y) => x["id"]<y["id"])
                    .slice(0,5) ;
            if(post != -1)
                userPosts = userPosts.filter((elem) => elem["id"]==post)
            if(user==-1)
                userPosts = [{"id" : -1 ,"title":"Browse available users","body" : "Click on a username to start"}] ;
            if(userPosts.length==0)
                userPosts = [{"id" : -1 ,"title":"No posts available","body" : "Choose a different user"}] ;
            setPosts(userPosts) ;
            //console.log(userPosts) ;
            return requestPosts ;
        }
        fetchPosts() ;
    },[fetchUrl,user,post])

    if(decomposedRoute[4]==="edit")
    return <div className={cltype}>
            <h1>{"Post #"+post}</h1>
            <div>
                <button onClick={() => {nav(decomposedRoute.slice(0,decomposedRoute.length-1).join("/"))}} className="styled"> cancel </button>
                <button onClick={async function x(){ 
                    var newTitle = document.getElementById('inputTitle').value ;
                    var text = document.getElementById('inputParagraph').value ;
                    document.getElementById('inputTitle').value = "" ;
                    document.getElementById('inputParagraph').value = "Done" ;
                    
                    let toUpdate = posts.at(0) ;
                    toUpdate["title"] = newTitle ;
                    toUpdate["body"] = text ;

                    const res = await axios.put("/posts/"+post,toUpdate);

                    }} className="styled"> submit </button>
            </div>
            
            <ul>
            {posts.map((post) => (
                <Link to={"/users/"+post["userId"]+"/"+post["id"]}>
                    <li key={post["id"]}>
                        <Note cltype="post" title={post["title"]} paragraph = {post["body"]} />
                    </li>
                </Link>
            ))}
            </ul>
            <div className="inputTitleDiv">
                <h3>Choose a title</h3>
                <input id="inputTitle"></input>
            </div>
            <div className="inputParagraphDiv">
                <h2>Write your paragraph</h2>
                <textarea id="inputParagraph"></textarea>
            </div>

        </div>

    if(post != -1)
    return <div className={cltype}>
            <h1>{"Post #"+post}</h1>
            <div>
                <button onClick={() => {nav(route+"/edit")}} className="styled"> edit </button>
                <button onClick={async function x(){
                        setPosts ([{"id" : -1 ,"title":"Post deleted","body" : "Choose a different post"}])
                        const res = await axios.delete("/posts/"+post);
                    }} className="styled"> delete </button>
            </div>
            
            <ul>
            {posts.map((post) => (
                <Link to={"/users/"+post["userId"]+"/"+post["id"]}>
                    <li key={post["id"]}>
                        <Note cltype="post" title={post["title"]} paragraph = {post["body"]} />
                    </li>
                </Link>
            ))}
            </ul>

        </div>

    if(decomposedRoute[1] == "users")
        return <div className={cltype}>
            <h1>{title}</h1>
            <ul>
            {posts.map((post) => (
                <Link to={"/users/"+post["userId"]+"/"+post["id"]}>
                    <li key={post["id"]}>
                        <Note cltype="post" title={post["title"]} paragraph = {post["body"]} />
                    </li>
                </Link>
            ))}
            </ul>

        </div>
        
    return <div className={cltype}>
        <h1>{title}</h1>
        <ul>
        {posts.map((post) => (
            <li key={post["id"]}>
                    <Note cltype="post" title={post["title"]} paragraph = {post["body"]} />
            </li>
        ))}
        </ul>

    </div>
}

export default Posts ;