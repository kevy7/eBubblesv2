import React, { Component } from 'react';

import "../../../styles/userCardUserBox.css";


const userCardUserBox = (props) => {
    
    return (
        //Make the height for userCardUserBox to be 150px
        <div className="userCardBox">
            <div className="userCardImage">
                <figure className="image is-64x64">

                    <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                
                </figure>
            </div>
            
            <div className="userCardName">
                <p>{props.userName}</p>
            </div>
        </div>
    );
};

export default userCardUserBox;