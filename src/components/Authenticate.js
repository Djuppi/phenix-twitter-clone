import React from 'react';

import { checkSession } from '../services/session'

class Authenticate extends React.Component {
    async componentDidMount() {
        const isAuthenticated = await checkSession();
        const { history } = this.props;


        if(!isAuthenticated) {
            history.replace('/login');
        } else {
            history.replace('/home');
        }
    }
    
    render(){
        return(
            <div>
                Authenticating...
            </div>
        )
    }
};

export default Authenticate;