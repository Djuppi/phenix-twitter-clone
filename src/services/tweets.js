const API_URL = '/api';

export async function getTweets() {
    const response =  fetch(`${API_URL}/tweets`);
    return (await response).json()

}

export async function postTweet(message) {
    const response = await fetch(`${API_URL}/tweets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('twitter_clone_token')
        },
        body: JSON.stringify({ message })
    })

    return response.json()
}