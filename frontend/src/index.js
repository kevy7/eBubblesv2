import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //This is a react component that stores your state data - centralized data for re-rendering
//import { createStore } from 'redux'; //we're importing the createStore function from redux, this is used to create a central 'store' for your data
//Implementing React routers
import { BrowserRouter as Router } from 'react-router-dom'; //our 'App' component has to be wrapped within our browerRouter
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './components/App'; //importing our App component
//import reducers from './reducers'; //Will automatically route to our index.js file within our reducers folder
//All of the files above are necessary to create our web application
import { store } from './store';
import { persistor } from './store';


//We're going to create our 'store' of centralized data with the createStore function below
//reducers were combined in our index.js file found within ./reducers
ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>,
    document.querySelector("#root")
);

