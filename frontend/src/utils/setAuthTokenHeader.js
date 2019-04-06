import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        //if token is in here, then set the header to always have your auth token
        axios.defaults.headers.common['Authorization'] = token;
    }
    else {
        //Delete the header token if no token is returned
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;