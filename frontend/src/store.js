import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //this will default to localStorage
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import reducers from './reducers'; //All of our reducers were combined and returned in here

const initialState = {}; //Our initial state is going to be set empty

const middleware = [thunk]; //We made this into an array in case we wanted to pass in other middlewares

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducer,
    initialState,
    //applyMiddleware(...middleware)

    
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) 
    
);

export const persistor = persistStore(store);

/*
const store = createStore(reducers, initialState, applyMiddleware(...middleware));
    
*/

