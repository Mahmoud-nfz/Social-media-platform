import React from "react";

function Note({paragraph,cltype,title}){
    return <div className={cltype}>
        <h1>{title}</h1>
        <p>{paragraph}</p>
    </div>
}

export default Note ;