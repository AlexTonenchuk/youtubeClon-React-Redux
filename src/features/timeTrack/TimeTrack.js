import React from "react";
import { useState } from "react";
import styles from './timeTrack.module.css'


export function TimeTrack (props) {

    const [state, setState] = useState({visibility: styles.hide,
                                        leftPopup: 0,
                                        timeInPopup: 0})
    const showPopup=()=>setState((state)=>({...state, visibility: styles.visible}))
    const hidePopup=()=>setState((state)=>({...state, visibility: styles.hide}))
    const movePopup = (e) => {
        setState((state)=>{
            const time = e.clientX*props.duration/e.target.parentElement.clientWidth
            return (
                {...state, 
                leftPopup: e.clientX, 
                timeInPopup: time}
            )
        })
    }
    const changeCurrentTime =()=>{
        props.setCurrentTime(state.timeInPopup)
    }

    return (
        <div>
            <div className = {styles.timeTrack}
                        onMouseOver = {showPopup}
                        onMouseOut = {hidePopup}
                        onMouseMove = {movePopup}
                        onClick = {changeCurrentTime}
                        title={'222'}        >
                
                <div className = {styles.red}
                    style={{width: props.currentTime*100/props.duration + '%' }}     >
                </div>
            </div>
            <div className = {styles.popup +' '+ state.visibility}
                    style={{left:state.leftPopup}}    >
                    {Math.floor(state.timeInPopup)}
            </div>

        </div>
    )
}



