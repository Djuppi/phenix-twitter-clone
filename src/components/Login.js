import React from 'react';
import { createSession } from '../services/session'
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loginForm: {
                handle: '',
                password: '',
            },
            error: null,
            isLoggingIn: false
        }
    }

    handleInputChange(field, event) {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [field]: event.target.value,
            }
        })
    }

    async handleLoginAttempt(event) {
        event.preventDefault();
        const { history } = this.props;
        const { handle, password } = this.state.loginForm;

        try{
            this.setState({ isLoggingIn: true, error: null })
            const { token, error } = await createSession({ handle, password });

            if(error) {
                throw new Error(error);
            } 

            if(!token) {
                throw new Error('No token recieved - try again');
            }

            localStorage.setItem('twitter_clone_token', token);
            history.push('/');
        } catch(error) {
            this.setState({ error, isLoggingIn: false })
        }
        
        
    }
    render(){

        const { error, isLoggingIn } = this.state;

        return(
            <div className="startcontainer">
                <div>
                <img src="./Logo.png"></img>
                <h2>Login</h2>
                </div>
                <form>
                    <div className="input-group-prepend" >
                        <label>
                            Username:
                            <input 
                                type="text"
                                value={this.state.loginForm.handle}
                                onChange={this.handleInputChange.bind(this, 'handle')}
                                aria-label="Username" aria-describedby="basic-addon1" 
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input 
                                type="password"
                                value={this.state.loginForm.password}
                                onChange={this.handleInputChange.bind(this, 'password')} 
                            />
                        </label>
                    </div>
                    <div>
                        <button onClick={this.handleLoginAttempt.bind(this)}>
                            Login
                        </button>
                        <label>
                        <input type="checkbox"  defaultChecked/>
                            Husk mig!
                        
                        </label>
                    </div>
                    <div className="log-sign">
                    
                    <p>Not a user?</p> <Link to='/signup'>Signup</Link>
                    </div>
                    <div>
                        {isLoggingIn && <p>Logging in...</p>}
                        {error && <p>Unable to log in: {error.message}</p>}
                    </div>
                </form>
            </div>
        )
    }
};

export default Login;