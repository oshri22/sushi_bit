import React from 'react'

export default function Messege(props) {
    return (
        <div style = {{borderBottom :"solid 1px", padding: "0px 50px"}}>
            <p>from user - {props.messege.user}</p>
            <div dangerouslySetInnerHTML={{__html:props.messege.text}}></div>

        </div>
    )
}
