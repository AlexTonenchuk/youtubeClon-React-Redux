import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentTime, selectSpecifiedTime, setSpecifiedTime } from "../videoList/videoListSlice";


export function CurrentTime (props) {

    const dispatch = useDispatch()
    const id = props.id
    const currentTime = useSelector( (state)=> selectCurrentTime(state, id) )


    return (
        <div>
            {currentTime}
            <button
                onClick = {()=> dispatch(setSpecifiedTime({id, specifiedTime:10}))}
            >
                wow10
            </button>
        </div>
    )
}