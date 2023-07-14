import styles from './durationVideo.module.css'

export function DurationVideo (props) {
    // красиво как!
    let hhmmss='00:00'
    if (props.video){
        let duration, s, m, h, ss, mm, hh 
        duration = Math.floor(props.video.duration)
        s = duration%60
        m = (duration-s)/60%60
        h = (duration-m*60-s)/3600%60
        ss = s<10 ? ('0'+s) : s
        mm = m> 0 ? (m+':') : '00:'
        hh = h> 0 ? (h+':') : ''
        hhmmss = `${hh}${mm}${ss}`
    } 
    return (
        <div className={styles.durationVideo}> 
            {hhmmss} 
        </div>
    )
}


