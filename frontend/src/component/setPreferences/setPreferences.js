import React from "react";
import Select from "react-select";
import { Form, Button, Alert } from "react-bootstrap";
import Opt from "../options/options";
import { useState } from "react";
import { useAuth } from "../../firebase/authContext";
import { useNavigate } from "react-router-dom";
import Creatable from "react-select/creatable";
import { Helmet } from "react-helmet";
import Reddi from "../../assets/images/Reddit.jpg";
import Logo from "../../assets/images/logo-twitter.webp";
import Google from "../../assets/images/Google-News.png";

const TITLE = "Set Preferences | My Web Feed";

const SetPreferences = () => {
  const { currentUser } = useAuth();
  const [twitter, setTwitter] = useState([]);
  const [news, setNews] = useState([]);
  const [reddit, setReddit] = useState([]);
  const history = useNavigate();
  const [error, setError] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
      if (news.length === 0 || reddit.length === 0 || twitter.length === 0) {
        return setError("Error: Atleast one option need to be selected");
      }
      var store = require("store");
      store.set(currentUser.email, { restricted: false });
      currentUser.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
      await fetch(`http://localhost:8000/api/preferences/${currentUser.uid}`, {
        method: "post",
        body: JSON.stringify({ twitter: twitter, reddit: reddit, news: news }),
        headers: {
          "Authorization": idToken,
          "Content-Type": "application/json",
        },
      });
      history("/news/");
    })
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
          style={{ minWidth: "30rem", fontFamily: "Pacifico", marginTop: 50 }}
        >
          <h1 style={{ fontSize: 40 }}>Select your favourite tags</h1>
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
          defaultValue={news}
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
          defaultValue={twitter}
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
        <Select
          defaultValue={reddit}
          isMulti
          onChange={handleChange3}
          options={Opt.Reddit}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <div className="text-center" style={{ margin: 50 }}>
          <Button variant="success" className="w-100" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};
export default SetPreferences;
