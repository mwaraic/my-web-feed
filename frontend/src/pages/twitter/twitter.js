import React, { useState, useEffect } from "react";
import Tweet from "../../component/tweet/tweet";
import ReactLoading from "react-loading";
import { useAuth } from "../../firebase/authContext";
import { Helmet } from "react-helmet";

const TITLE = "Twitter | My Web Feed";
const Twitter = () => {
  const [progress, setProgress] = useState(false);
  const { currentUser } = useAuth();
  const [twitter, setTwitter] = useState([]);

  useEffect(() => {
      currentUser.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
        const result = await fetch(`http://localhost:8000/api/tweets/${currentUser.uid}`, {headers: {
          "Authorization": idToken,
          "Content-Type": "application/json",
        }});
        const body = await result.json();
        setTwitter(body);
        setProgress(true);
      })
  }, [currentUser]);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {!progress ? (
      <div style={{ marginLeft: "50%" }}>
          <ReactLoading
            type={"spinningBubbles"}
            color={"black"}
            height={"50%"}
            width={"50%"}
          />
      </div>) : (
      <Tweet props={twitter} />)}
    </>
  );
};

export default Twitter;
