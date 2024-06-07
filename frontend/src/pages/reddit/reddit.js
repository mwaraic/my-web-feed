import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useAuth } from "../../firebase/authContext";
import { Helmet } from "react-helmet";
import Reddi from "../../assets/images/Reddit.jpg";
const TITLE = "Reddit | My Web Feed";
const Reddit = () => {
  const [progress, setProgress] = useState(false);
  const [reddit, setReddit] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
      currentUser.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
      const result = await fetch(`http://localhost:8000/api/reddit/${currentUser.uid}`, {headers: {
        "Authorization": idToken,
        "Content-Type": "application/json",
      }});
      const body = await result.json();
      setReddit(body);
      setProgress(true)
    });
  }, [currentUser]);
  function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
  }
  try {
    return (
      <>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Container>
          {!progress ? (
          <div style={{ marginLeft: "50%" }}>
              <ReactLoading
                type={"spinningBubbles"}
                color={"black"}
                height={"50%"}
                width={"50%"}
              />
          </div>)
          : (
          reddit.map((d, key) => (
            <Card key={key} style={{ minWidth: "20rem", margin: 10 }}>
              <Card.Body>
                <Card.Title>{d.subreddit_name_prefixed}</Card.Title>
                {/* eslint-disable-next-line */}
                <div className="text-center">
                  <img
                    width="200"
                    height="100"
                    src={d.thumbnail}
                    alt=""
                    onError={(e) => (
                      (e.target.onerror = null), (e.target.src = Reddi)
                    )}
                  />
                </div>{" "}
                <h4>
                  <a href={d.url}>{d.title}</a>
                </h4>
                <div dangerouslySetInnerHTML={{ __html: urlify(d.selftext) }} />
              </Card.Body>
            </Card>
          )))}
        </Container>
      </>
    );
  } catch {
    return <h2>null</h2>;
  }
};

export default Reddit;
