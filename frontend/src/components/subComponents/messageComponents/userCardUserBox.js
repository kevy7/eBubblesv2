import React, { Component } from 'react';

import "../../../styles/userCardUserBox.css";

//convert this from a functional component to a class-based component
class userCardUserBox extends Component {

    onSubmit = (e) => {
        e.preventDefault();

        

        //an action needs to be called here to push this.props.userID into your state
    }

    render(){
        return (
            //Whenever the userCardBox component is clicked, we need to initiate an action


            <div className="userCardBox" onClick={this.onSubmit}>
                <div className="userCardImage">
                    <figure className="image is-64x64">

                        <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                    
                    </figure>
                </div>
                
                <div className="userCardName">
                    <p>{this.props.userName}</p>
                </div>
            </div>
        )
    }
};

export default userCardUserBox;