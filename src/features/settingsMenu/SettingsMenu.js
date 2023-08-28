import React from 'react'
import styles from './settingsMenu.module.css'

export function SettingsMenu (props) {

    const openSpeedMenu = () =>{
        console.dir('hi openSpeedMenu !')
    }

    return (
        <div className = {styles.settings+' '+props.className}>

            <div className = {styles.row}>
                <div className ={styles.left }>
                    <div className={styles.icon +' '+ styles.anotation }>
                    </div>
                    <div className={styles.name}>
                        {'Аннотации'}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.icon +' '+ styles.switchOn}>
                    </div>
                </div>

            </div>


            <div className = {styles.row}>
                <div className ={styles.left }>
                    <div className={styles.icon+' '+styles.speed }>
                    </div>
                    <div className={styles.name}>
                        {'Cкорость воспроизведения'}
                    </div>
                </div>
                <div className={styles.right}>
                    {'Обычная >'}
                </div>
            </div>


            <div className = {styles.row}>
                <div className ={styles.left }>
                    <div className={styles.icon+' '+styles.subtitles }>
                    </div>
                    <div className={styles.name}>
                        {'Субтитры(1)'}
                    </div>
                </div>
                <div className={styles.right}>
                    {'Выкл. >'}
                </div>
            </div>


            <div className = {styles.row}>
                <div className ={styles.left }>
                    <div className={styles.icon+' '+styles.quality }>
                    </div>
                    <div className={styles.name}>
                        {'Качество'}
                    </div>
                </div>
                <div className={styles.right}>
                    {'Автонастройка(480р) >'}
                </div>
            </div>
        
        </div>
    )
}