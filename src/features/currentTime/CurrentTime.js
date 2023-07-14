import React, {useState} from "react";


export function CurrentTime (props) {

    const [time, setTime] = useState('0')

    let video = props.video

    if (video){
        video.ontimeupdate = () => {
            setTime(Math.floor(video.currentTime))
        }
    }

    return (
        <div>
            {time}
        </div>
    )
}