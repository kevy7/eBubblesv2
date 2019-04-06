//This is a simple Home page
import React, { Component } from 'react';
import Navbar from './subComponents/Navbar';


/*
Learn how to create and display a sign in and sign up modal
*/

class Home extends Component {

    //No state declaration needed here

    render(){
        return (
            <div className="Home">
                
                <div>
                    <section className="hero is-info">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    Welcome to Event Bubbles beta!
                                </h1>
                                <h2 className="subtitle">
                                    Home Page
                                </h2>
                            </div>
                        </div>


                        

                    </section>

                </div>
            </div>
        );
    }
}


export default Home;