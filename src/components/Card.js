import React, { useEffect, useState } from "react";
import Note from "./Note";
import { useLocation } from "react-router";
import axios from "./axios"

function Card({fetchUrl}){
    const [title,setTitle] = useState("") ;
    const [paragraph,setParagraph] = useState("") ;
    let route = useLocation().pathname ;
    let decomposedRoute = route.split("/") ;
    let user ;
    if(decomposedRoute[1] == "users"){
        user = decomposedRoute[2] ;
    }
    
    useEffect(() => {
        async function fetchUsers(){
            const requestUsers = await axios.get(fetchUrl) ;
            let userInfo = (requestUsers.data.filter((elem) => elem["id"] == user)).at(0) ;
            setTitle(userInfo["username"]) ;
            let x = userInfo ;
            setParagraph("Name : "+x["name"]+"\n\Email : "+x["email"]+"\n\Phone : "+x["phone"]+"\n\Website : "+x["website"]) ;
            return requestUsers ;
        }
        if(decomposedRoute[1] == "users"){
            fetchUsers() ;
        }
    },[user,route,fetchUrl,decomposedRoute])
    if(route.length > 1)
        return <Note cltype="note" title={title} paragraph={paragraph} />
    return <Note cltype="note" title="Welcome to Pinterest" paragraph={" A social media experiment\n_\nExplore different users and their posts"} />
    
}


export default Card ;