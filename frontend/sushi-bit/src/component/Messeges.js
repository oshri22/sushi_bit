import React from 'react';
import Messege from './Messege';

export default function Messeges(props) {
    const rev_arr = props.Messeges.reverse();
    return (
        rev_arr.map((element) => {
            return <Messege messege ={element} key = {element.id}/>
        })
    )
}
