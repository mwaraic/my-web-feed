import express from 'express';
import {MongoClient} from 'mongodb';
import path from 'path';
const app= express();
const needle = require('needle');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
let googleNewsAPI = require("google-news-json");
const reddit = require('scrap-reddit')
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static(path.join(__dirname,'/build')));
const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');
    
        await operations(db);
    
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
}
app.get('/api/news/:name', async (req, res) => {
    withDB(async (db) => {
        const currentUser = req.params.name;
        const preferances = await db.collection('preferances').findOne({ name: currentUser })
        const tags=preferances.news;
   var collection=[]
   for(var i=0; i<tags.length;i++){
    
    let news= await googleNewsAPI.getNews(googleNewsAPI.SEARCH,tags[i].value, "en-GB");
    collection.push(news.items)
}   
var final=[]
for(var i=0; i<tags.length;i++){
   
   final= final.concat(collection[i])

}  
    res.status(200).json(final)
    }, res);
   
})

app.get('/api/reddit/:name', async (req, res) => {
    withDB(async (db) => {
        const currentUser = req.params.name;
        const preferances = await db.collection('preferances').findOne({ name: currentUser })
        const tags=preferances.reddit;
    var collection=[]
   for(var i=0; i<tags.length;i++){
    const post = await reddit.topPost(tags[i].value)
    collection.push(post.data)
   }
   var final=[]
for(var i=0; i<tags.length;i++){
   
   final= final.concat(collection[i])

}  
    res.status(200).json(final)
}, res);
   
})

app.get('/api/tweets/:name', async (req, res) => {
    withDB(async (db) => {
        const currentUser = req.params.name;
        const preferances = await db.collection('preferances').findOne({ name: currentUser })
        const tags=preferances.twitter;
    var collection=[]

    for(var i=0;i<tags.length;i++){

        const userId = tags[i].value;
        const url = `https://api.twitter.com/2/users/${userId}/tweets`;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.BEARER_TOKEN;

const getUserTweets = async () => {
    let userTweets = [];

    // we request the author_id expansion so that we can print out the user name later
    let params = {
        "max_results": 10,
        "tweet.fields": "created_at",
        "expansions": "author_id"
    }

    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    let userName;
    console.log("Retrieving Tweets...");

    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            userName = resp.includes.users[0].username;
            if (resp.data) {
                userTweets.push.apply(userTweets, resp.data);
            }
            if (resp.meta.next_token) {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }
 
    collection =collection.concat(userTweets)
    if(collection.length===tags.length*10){
        res.status(200).json(collection)
    }
}

const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
   
}
getUserTweets();}

        
}, res);
   
})

app.get('/api/preferances/:name', async (req, res) => {
    withDB(async (db) => {
        const NewUser = req.params.name;
        const preferances = await db.collection('preferances').findOne({ name: NewUser})
        res.status(200).json(preferances);
    }, res);
})

app.post('/api/update-preferances/:name', (req, res) => {
    const { twitter, reddit, news} = req.body;
    const NewUser = req.params.name;

    withDB(async (db) => {
        
        await db.collection('preferances').updateOne({ name: NewUser }, {
            '$set': {
                twitter:twitter, news: news, reddit: reddit
            },
        });
      res.status(200).json('maaz')
    }, res);
    
});

app.post('/api/set-preferances/:name', (req, res) => {
    const { twitter, reddit, news} = req.body;
    const NewUser = req.params.name;

    withDB(async (db) => {
        
        await db.collection('preferances').insertOne(
            {name: NewUser, twitter: twitter, reddit: reddit, news:news }
        )
      res.status(200).json('maaz')
    }, res);
    
});
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname +'/build/index.html'))
})
app.listen(8000, () =>console.log('Listening on port 8000'));