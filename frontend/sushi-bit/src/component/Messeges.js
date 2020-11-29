import React from 'react';
import Messege from './Messege';

export default function Messeges(props) {
    return (
        props.Messeges.map((element) => {
            return <Messege messege ={element} key = {element.id}/>
        })
    )
}
