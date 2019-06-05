import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { withRouter } from 'react-router-dom';


import Home from './Home'; //Import the Home component. This is the page that any user can view when they're logged off.
import Login from './Login'; //Import the Login page
import SignUp from './SignUp'; //Page for user to sign up to our website
import Events from './Events';
import EventDescription from './EventDescription';
import PrivateRoute from './subComponents/PrivateRoute';
import Navbar from './subComponents/Navbar';
import CreateEvent from './createEvent';
import EventEditPage from './EventEditPage';
import UserProfile from './userProfile';
import Users from './users';
import DisplayMessages from './subComponents/displayMessages';


//Look at this.props.children https://til.hashrocket.com/posts/c5725d4d01-react-wrapper-components-with-nested-children


class App extends React.Component {

    //don't need to declare a state here since we don't need data for this page
    //<Route path='/about' component={About} />
    render(){
        return(
            <div id="mainBody">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <PrivateRoute exact path='/events' component={Events} />
                    <PrivateRoute exact path="/events/new" component={CreateEvent}/>
                    <PrivateRoute exact path='/events/:id' component={EventDescription} />
                    <PrivateRoute exact path='/events/:id/edit' component={EventEditPage} />
                    <PrivateRoute path="/user/:id" component={UserProfile} />
                    <PrivateRoute path="/users" component={Users} />
                    <PrivateRoute path="/messages" component={DisplayMessages}/>
                </Switch>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {userRegistrationInfo: state.userRegistrationInfo}
}

//The proper way to use withRouter and connect together
//withRouter provides aour component with the ability to access the history object
export default withRouter(connect(mapStateToProps)(App));




/*
How to render a page that doesn't exist
create a route for an emtpy page, react is smart enough to know that the following is a path to an unkown route

<Route component={ErrorPage}>
This will display an error page to the user if the route/path to your webpage is non-existent

*/