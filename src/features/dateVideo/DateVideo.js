import React from "react";
import { useSelector } from 'react-redux'
import { selectCreatDate } from '../videoList/videoListSlice'


export function DateVideo (props) {
    const id = props.id
    const date = useSelector((state)=> selectCreatDate(state, id))
    const now = new Date()
    const createDate = new Date(date)
    let dayInterval = Math.floor((now-createDate)/1000/60/60/24)
    let  period 
    if (dayInterval<30) {
            if( dayInterval===1 || dayInterval===21) { 
                period = `${dayInterval} день назад`
            } else if ( dayInterval===2||
                        dayInterval===3||
                        dayInterval===4||
                        dayInterval===22||
                        dayInterval===23||
                        dayInterval===24) { 
                period = `${dayInterval} дня назад`
            } else { 
                period = `${dayInterval} дней назад`
            }
    } else if (dayInterval>29 && dayInterval<365){
            dayInterval = Math.floor(dayInterval/30) 
            if( dayInterval===1) { 
                period = `${dayInterval} месяц назад`
            } else if ( dayInterval===2||
                        dayInterval===3||
                        dayInterval===4) { 
                            period = `${dayInterval} месяцa назад`
            } else { 
                period = `${dayInterval} месяцев назад`
            }
    } else if (dayInterval>365){
            dayInterval = Math.floor(dayInterval/365) 
            if( dayInterval===1) { 
                period = `${dayInterval} год назад`
            } else if ( dayInterval===2||
                        dayInterval===3||
                        dayInterval===4) { 
            period = `${dayInterval} года назад`
            } else { 
                period = `${dayInterval} лет назад`
            }
    }
    return (
        <div> {period} </div>
    )
}