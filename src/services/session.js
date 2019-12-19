const API_URL = '/api';
 
export async function createSession({ handle, password }) {
    const res = await fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ handle, password })
    });
    return await res.json();
}

export async function checkSession() {
    const response = await fetch(`${API_URL}/session`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('twitter_clone_token')
        }
    })
    return response.status === 200;
}

export async function createUser({ name, handle, password, img }) {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, handle, password, img })
    })
    return response.json();
}