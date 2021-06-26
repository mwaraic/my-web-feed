import express, { json } from 'express';
import {MongoClient} from 'mongodb';

const app= express();
const needle = require('needle');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
let googleNewsAPI = require("google-news-json");
const reddit = require('scrap-reddit')

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
   const tags=['israelpalestine', 'kardashians', 'residentialschool', 'ontario'];
   var collection=[]
   for(var i=0; i<tags.length;i++){
    
    let news= await googleNewsAPI.getNews(googleNewsAPI.SEARCH,tags[i], "en-GB");
    collection.push(news.items)
}   
var final=[]
for(var i=0; i<tags.length;i++){
   
   final= final.concat(collection[i])

}  
    res.status(200).json(final)
})

app.get('/api/reddit/:name', async (req, res) => {
    const tags=['science', 'AskWomen', 'AskReddit'];

    var collection=[]
   for(var i=0; i<tags.length;i++){
    const post = await reddit.topPost(tags[i])
    collection.push(post.data)
   }
   var final=[]
for(var i=0; i<tags.length;i++){
   
   final= final.concat(collection[i])

}  
    res.status(200).json(final)
})

app.get('/api/tweets/:id', async (req, res) => {
    
        const userId = req.params.id;
        const url = `https://api.twitter.com/2/users/${userId}/tweets`;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAJK%2BQwEAAAAA0pQRjfJzqxD1z9mDnkOC3%2F4zem0%3DgI8JK8k2lHsgaoQwRkVkdpBQA11x3P1dXB3v0FGPvMaOwjDOtk';

const getUserTweets = async () => {

    let userTweets = [];

    // we request the author_id expansion so that we can print out the user name later
    let params = {
        "max_results": 20,
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

    console.dir(userTweets, {
        depth: null
    }
    );
    console.log(`Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`); 
    res.status(200).json(userTweets)
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
getUserTweets();
})

app.get('/api/articles/:name', async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;

        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(articleInfo);
    }, res);
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
    
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1,
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
    
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: articleInfo.comments.concat({ username, text }),
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.get('/hello', (req,res)=> res.send('Hello!'));
app.listen(8000, () =>console.log('Listening on port 8000'));