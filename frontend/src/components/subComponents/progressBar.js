import React, { Component } from "react";
import styles from '../subComponents/progressBar/progressBar.module.css';

class progressBar extends Component {
    render(){
        return (
            <div className={styles.progressBar}>
                {/* <progress className="progress is-large is-info" max="100">60%</progress> */}
                <div>
                    <div class="fa-7x">
                        <i class="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default progressBar;


//return <progress class="progress is-large is-info" max="100">60%</progress>