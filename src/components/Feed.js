import React from 'react';
import jwtDecode from 'jwt-decode';
import { getTweets, postTweet } from '../services/tweets'
import { Link } from 'react-router-dom';

class Feed extends React.Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('twitter_clone_token');
        const payload = jwtDecode(token)

        this.state = {
            tweets: [],
            isLoading: false,
            error: null,
            message: '',
            session: payload,
        }
        
    }
    
    async componentDidMount() {
       await this.populateTweets();
    }

    async populateTweets() {
        try{
            this.setState({ isLoading: true })
            const tweets = await getTweets();
            this.setState({ tweets, isLoading: false })
        } catch(error) {
            this.setState({ error });
        }
    }

    handleInputChange(field, event) {
        this.setState({ 
            [field]: event.target.value,
         })
    }

    async handleSubmitTweet() {

        const { message } = this.state;

        if(!message) {
            return;
        }
        await postTweet(message); 
        await this.populateTweets()
        this.setState({
            message: '',
        })
    }

    render(){
        const {
            tweets,
            isLoading,
            error,
            message,
            session: {
                name,
                handle,
                img
            } = {}
         } = this.state;
         if(error) {
             return ( 
                 <div>Unable to fetch tweets: {error.message}</div>
             )
         }

         if(isLoading){
             return(
                 <div>
                     Loading tweets...
                 </div>
             )
         }

         const tweetElements = tweets.map(({ id, message, name, handle, created_at }) => {
             
             return ( 
                 <div key={id} className="tweet">
                     <img src={img}></img>
                     <p className="handle"><strong>{name}</strong> @{handle} </p>
                     <p>{message}</p>
                 </div>
             )
         })

        return(
            <div className="feed">
                <h1>Feed for {name} @{handle}</h1>
                <div>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={message} onChange={this.handleInputChange.bind(this, 'message')} />
                    <button onClick={this.handleSubmitTweet.bind(this)}>Post</button>
                </div>
                <div>
                    <Link to='/logout'>Logout</Link>
                </div>
                <div className="tweets">
                    {tweetElements}
                </div>
            </div>
        )
    }
};

export default Feed;