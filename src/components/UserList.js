import React, {useState,useEffect} from "react";
import {Link} from 'react-router-dom' ;
import axios from './axios'
function UserList({fetchUrl}){
    const [users,setUsers] = useState([]) ;
    useEffect(() => {
        async function fetchUsers(){
            const requestUsers = await axios.get(fetchUrl) ;
            setUsers(requestUsers.data) ;
            return requestUsers ;
        }
        fetchUsers() ;
    },[fetchUrl])
    /*
    console.log("hiiiii") ;
    console.log(users) ;
    */
    return <div class="userlist">
        <h1> Users </h1>
        <ul>
    {users.map(user => (
        
        <li  key={user["id"]}> 
            <Link to={"/users/"+user["id"]}> {user["username"]} </Link>
        </li>
    ))}
    </ul>
    </div>
}

export default UserList ;