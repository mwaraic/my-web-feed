import dotenv from "dotenv";
dotenv.config();
const BEARER_TOKEN = process.env.BEARER_TOKEN;
var needle = require("needle");

const getUserTweets = async (userId) => {
  let userTweets = [];

  // we request the author_id expansion so that we can print out the user name later
  let params = {
    max_results: 10,
    "tweet.fields": "created_at",
    expansions: "author_id",
  };

  const options = {
    headers: {
      "User-Agent": "v2UserTweetsJS",
      authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  let userName = null;

  while (hasNextPage && userTweets.length < 10) {
    let resp = await getPage(params, options, nextToken, userId);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      userName = resp.includes.users[0].username;
      if (resp.data) {
        userTweets.push.apply(userTweets, resp.data);
      }
      if (resp.meta.next_token) {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
      break;
    }
  }

  return userTweets;
};

const getPage = async (params, options, nextToken, userId) => {
  const url = `https://api.twitter.com/2/users/${userId}/tweets`;

  if (nextToken) {
    params.pagination_token = nextToken;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(
        `${resp.statusCode} ${resp.statusMessage}:\n${JSON.stringify(resp.body)}`,
      );
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

export default getUserTweets;
