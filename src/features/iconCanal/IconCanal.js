import React from 'react'
import styles from './iconCanal.module.css'
import { Link } from 'react-router-dom';

export function IconCanal (props) {
    return (
        <Link to={`/one/`+props.id}>
            <div 
                className={styles.iconCanal}>
            </div>
        </Link>
    )
} 