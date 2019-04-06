import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import eventsReducer from './eventsReducer';
import selectEventReducer from './selectEventReducer';


export default combineReducers({
    //List out the reducers that we're trying to combine and place them in here
    auth: authReducer,
    err: errorReducer,
    events: eventsReducer,
    selectedEvent: selectEventReducer
});