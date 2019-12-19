import React from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../services/session'

class Signup extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            signupForm: {
                name: '',
                handle: '',
                password: '',
                img: '',
            },
            isLoading: false,
            error: null,
        }
    }

    handleInputChange(field, event) {
        this.setState({
            signupForm: {
                ...this.state.signupForm,
                [field]: event.target.value,
            }
        })
    }

    async handleSubmitAttempt(event) {
        event.preventDefault();
        const { history } = this.props;
        const { name, handle, password, img } = this.state.signupForm;

        try{
            this.setState({ isLoading: true });
            await createUser({ name, handle, password, img })
            history.replace('/login')
        } catch(error) {
            this.setState({ error })
        }
    }

    render(){
        const avartars = ['./svg/boy.svg', './svg/boy-1.svg', './svg/girl.svg', './svg/girl-1.svg']
        return(
            <div className="startcontainer">
                <img src="./Logo.png"></img>
                <h2>Signup</h2>
                <form>
                    <div>
                        <label>
                            Name:
                            <input 
                            type="text"
                            value={this.state.signupForm.name}
                            onChange={this.handleInputChange.bind(this, 'name')}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Username:
                            <input 
                            type="text"
                            value={this.state.signupForm.handle}
                            onChange={this.handleInputChange.bind(this, 'handle')}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input 
                            type="text"
                            value={this.state.signupForm.password}
                            onChange={this.handleInputChange.bind(this, 'password')}/>
                        </label>
                        <div className="avatar">
                            <p>Choose avatar:</p>
                            <div>
                            <label >
                                
                                <input type="radio" name="avatar" id="av1" className="avatar-img" value={avartars[0]} onChange={this.handleInputChange.bind(this, 'img')} />
                                    <img formFor="av1" src={avartars[0]}/>
                            </label>
                            </div>
                            <div>
                                <label>
                                <input type="radio" name="avatar" id="av2" className="avatar-img" value={avartars[1]} onChange={this.handleInputChange.bind(this, 'img')} />
                                <img src={avartars[1]}></img>
                                </label>
                            </div>
                            <div>
                                <label>
                                <input type="radio" name="avatar" id="av3" className="avatar-img" value={avartars[2]} onChange={this.handleInputChange.bind(this, 'img')} />
                                <img src={avartars[2]}></img>
                                </label>
                            </div>
                            <div>
                                <label>
                                <input type="radio" name="avatar" id="av4" className="avatar-img" value={avartars[3]} onChange={this.handleInputChange.bind(this, 'img')} />
                                <img src={avartars[3]}></img>
                                </label>
                            </div>
                    </div>
                    </div>
                    <button onClick={this.handleSubmitAttempt.bind(this)}>Create user</button>
                </form>
                <div className="log-sign">
                    <p>Already a user?</p> <Link to='/login'>Login</Link>
                </div>
            </div>
        )
    }
};

export default Signup;