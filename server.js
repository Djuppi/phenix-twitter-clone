require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const camelCase = require('camelcase-keys');
const Pool = require('pg').Pool;
const cors = require('cors');


const {authenticate} = require('./middleware')

const secret = process.env.SECRET;

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
})

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Get all tweets with username and handlename:
async function getTweets() {
    const { rows } = await db.query(`
    SELECT 
        tweets.id,
        tweets.message,
        tweets.created_at,
        users.name,
        users.handle
    FROM
        tweets,
        users
    WHERE
        tweets.user_id = users.id
    ORDER BY tweets.created_at DESC
        `);
    return rows.map(camelCase);
}

//Get all tweets by a specific user:
async function getTweetById(handle) {
    const { rows } = await db.query(`
    SELECT 
        tweets.id,
        tweets.message,
        tweets.created_at,
        users.name,
        users.handle
    FROM
        tweets,
        users
    WHERE
        tweets.user_id = users.id
    AND
        users.handle=${handle}`);
    return rows.map(camelCase)
}



//Adds a new tweet as a specific user:
async function addTweet (message, userId) {
    const { rows } = await db.query(`
    INSERT INTO tweets 
        (message, user_id) 
    VALUES 
        ($1, $2) 
    RETURNING *
    `, [message, userId]);
    return camelCase(rows[0]);
}

async function getUsers(){
    const { rows } = await db.query(`SELECT * FROM users ORDER BY users.id`);
    return rows.map(camelCase)
}

async function getUserByHandle(handle) {
    const { rows } = await db.query(`SELECT * FROM users WHERE handle = $1`, [handle])
    return rows[0]
}

async function addUser(name, handle, password, img){
    const { rows } = await db.query(`
    INSERT INTO users
        (name, handle, password, img)
    VALUES
        ($1, $2, $3, $4)
    RETURNING *
    `, [name, handle, password, img]);
    return rows[0]
}

async function editTweet (tweet, id) {
    const { rows } = db.query(`
    UPDATE tweets `)
}

const api = express();

api.get(`/users`, async (req, res) => {
    const users = await getUsers();
    res.send(users)
})



api.get(`/tweets`, async (req, res) => {
    const tweets = await getTweets();
    try{
        res.send(tweets)
    } catch(err){
        res.status(404).send('Page not found!')
    }
})

api.get(`/tweets/:handle`, async (req, res) => {
    const { handle } = req.params;
    const selectedTweet = await getTweetById(handle);
    if(!selectedTweet) {
       return res.status(404).send({Error: `Unknown handle: ${handle}`})
    }
    res.send(selectedTweet);api
})

api.get(`/session`, authenticate,  (req, res) => {
    res.send({
        message: 'You are authenticated'
    });
    
})

api.post(`/session`, async (req, res) => {
    const { handle, password } = req.body;
    try{

    
    const user = await getUserByHandle(handle);

    if(!user) {
        return res.status(401).send({ error: 'Unknown user' })
    }

    if(user.password !== password) {
       return res.status(401).send({ error: 'Wrong password' })
    }

        const token = jwt.sign({
            id: user.id,
            handle: user.handle,
            name: user.name,
            img: user.img
        }, new Buffer(secret, 'base64'));

        res.send({
            token: token
        })
    } catch(error){
        console.log(error.message)
    }
});



api.post('/tweets', authenticate, async (req, res) => {
    const { id } = req.user;
    const { message } = req.body;

    const newTweet = await addTweet(message, id )
    res.send(newTweet);
});

api.post('/signup', async (req, res) => {
    const { name, handle, password, img } = req.body;
    console.log(req.body);
    const newUser = await addUser(name, handle, password, img)
    res.send(newUser);
})

app.use('/api', api);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Twitter is running at http://localhost:${port}`)
})