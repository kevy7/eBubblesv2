import React, { Component } from 'react';

class Hero extends Component {

    render(){
        return(
            <div className="Hero">
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title has-text-centered	">
                                {this.props.title}
                            </h1>
                            <h2 className="subtitle has-text-centered	">
                                {this.props.subtitle}
                            </h2>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Hero;