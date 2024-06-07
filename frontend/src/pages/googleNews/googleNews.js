import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ReactLoading from "react-loading";
import News from "../../component/news/news";
import { useAuth } from "../../firebase/authContext";
import { Helmet } from "react-helmet";
const TITLE = "News | My Web Feed";
const GoogleNews = () => {
  const [progress, setProgress] = useState(false);
  const { currentUser } = useAuth();
  const [news, setNews] = useState([]);
  useEffect(() => {

      currentUser.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
      const result = await fetch(`http://localhost:8000/api/news/${currentUser.uid}`, {headers: {
        "Authorization": idToken,
        "Content-Type": "application/json",
      }});
      const body = await result.json();
      setNews(body);
      setProgress(true)
    })

  }, [currentUser]);

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
        </div>): (
        <News props={news} />)}
      </Container>
    </>
  );
};

export default GoogleNews;
