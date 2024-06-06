import React, { useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Opt from "../options/options";
import { useState } from "react";
import { useAuth } from "../../firebase/authContext";
import { Link, useNavigate } from "react-router-dom";
import Creatable from "react-select/creatable";
import Select from "react-select";
import { Helmet } from "react-helmet";
import Reddi from "../../assets/images/Reddit.jpg";
import Logo from "../../assets/images/logo-twitter.webp";
import Google from "../../assets/images/Google-News.png";
const TITLE = "Update Preferences | My Web Feed";

const UpdatePreferences = () => {
  const { currentUser } = useAuth();
  const [twitter, setTwitter] = useState([]);
  const [news, setNews] = useState([]);
  const [reddit, setReddit] = useState([]);
  const history = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      currentUser.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
      const result = await fetch(`http://localhost:8000/api/preferences/${currentUser.uid}`, {headers: {
        "Authorization": idToken,
        "Content-Type": "application/json",
      }});
      const body = await result.json();

      setNews(body.news);
      setReddit(body.reddit);
      setTwitter(body.twitter);
    })}

    fetchData();
  }, [currentUser]);

  async function onSubmit(e) {
    e.preventDefault();
    if (news.length === 0 || reddit.length === 0 || twitter.length === 0) {
      return setError("Error: Atleast one option need to be selected");
    }
    currentUser.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
    await fetch(`http://localhost:8000/api/preferences/${currentUser.uid}`, {
      method: "put",
      body: JSON.stringify({ twitter: twitter, reddit: reddit, news: news }),
      headers: {
        "Authorization": idToken,
        "Content-Type": "application/json",
      },
    })});
    history("/");
  }

  const handleChange1 = (twitter) => setTwitter(twitter);
  const handleChange2 = (news) => setNews(news);
  const handleChange3 = (reddit) => setReddit(reddit);
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div style={{ margin: 20 }}>
        {error && (
          <Alert className="text-center" variant="danger">
            {error}
          </Alert>
        )}
      </div>

      <Form onSubmit={onSubmit}>
        <div
          className="text-center"
          style={{ minWidth: "15rem", fontFamily: "Pacifico", marginTop: 50 }}
        >
          <h1 style={{ fontSize: 40 }}>Update your tags</h1>
        </div>

        <div className="text-center" style={{ margin: 10 }}>
          {" "}
          <img
            style={{ height: "15rem", width: "25rem" }}
            src={Google}
            alt=""
          />
        </div>
        <Creatable
          value={news}
          isMulti
          onChange={handleChange2}
          options={Opt.News}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <div className="text-center" style={{ margin: 10 }}>
          <img style={{ height: "10rem", width: "20rem" }} src={Logo} alt="" />
        </div>
        <Select
          value={twitter}
          isMulti
          onChange={handleChange1}
          options={Opt.Twitter}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <div className="text-center" style={{ margin: 10 }}>
          {" "}
          <img style={{ height: "10rem", width: "20rem" }} src={Reddi} alt="" />
        </div>
        <Creatable
          value={reddit}
          isMulti
          onChange={handleChange3}
          options={Opt.Reddit}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <div className="text-center" style={{ marginTop: 50 }}>
          <Button variant="success" className="w-100" type="submit">
            Update
          </Button>
        </div>
        <div
          className="text-center"
          style={{ marginTop: 10, marginBottom: 50 }}
        >
          <Link to="/">
            <Button className="w-100" variant="success">
              Cancel
            </Button>
          </Link>
        </div>
      </Form>
    </>
  );
};
export default UpdatePreferences;
