import React from "react"
import Select from 'react-select';
import {Form, Button, Alert } from "react-bootstrap";
import Opt from "../component/Options";
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import Creatable from 'react-select/creatable';
import { Helmet } from 'react-helmet';
const TITLE= "Set Preferences | My Web Feed"
const MyComponent=()=> {
    const { currentUser} = useAuth()
    const [twitter, setTwitter] = useState([])
    const [news, setNews] = useState([])
    const [reddit, setReddit] = useState([])
    const history = useHistory()
    const [error, setError] = useState("")
  async function onSubmit(e){
    e.preventDefault()
     try{
      if(news.length===0 || reddit.length ===0 || twitter.length===0){
        return setError("Error: Atleast one option need to be selected")
      }
      var store = require('store')
      store.set(currentUser.email, { restricted: false })
      await fetch(`/api/set-preferances/${currentUser.email}`, {
                method: 'post',
                body: JSON.stringify({ twitter: twitter, reddit: reddit, news: news }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            history.push("/news/")
          }
      catch{

      }}
        
    const handleChange1=(twitter)=> setTwitter(twitter); 
    const handleChange2 =(news) => setNews(news);
    const handleChange3 = (reddit) => setReddit(reddit);
    
      return (
        <>
        <Helmet><title>{TITLE}</title></Helmet>
       <div style={{margin:20}}>{error && <Alert className="text-center" variant="danger">{error}</Alert>}</div>
        <Form onSubmit={onSubmit}>
        
        <div style={{minWidth:"30rem", fontFamily: "Pacifico", marginTop: 50}}><h1 style={{fontSize: 40}}>Select your favourite tags</h1></div>
        
       <div className="text-center" style={{margin:10}}> <img  style={{ height : "15rem", width: "25rem", }} src="https://flipweb.org/wp-content/uploads/2019/09/Google-News.png" alt=""/></div> 
       <Creatable
          defaultValue={news}
          isMulti
          onChange={handleChange2}
          options={Opt.News}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      <div className="text-center" style={{margin:10}}><img  style={{ height : "10rem", width: "20rem",  }} src="https://cdn.iphoneincanada.ca/wp-content/uploads/2016/02/twitter-logo.png" alt=""/></div>
      <Select
          defaultValue={twitter}
          isMulti
          onChange={handleChange1}
          options={Opt.Twitter}
          className="basic-multi-select"
          classNamePrefix="select"
        />
     <div className="text-center" style={{margin:10}}> <img  style={{ height : "10rem", width: "20rem", }} src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo-2017-present.jpg" alt=""/></div> 
     <Select
          defaultValue={reddit}
          isMulti
          onChange={handleChange3}
          options={Opt.Reddit}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      <div className="text-center" style={{margin:50}}>
      <Button variant="success" className="w-100" type="submit">
                  Save
                </Button></div>
      </Form>
      </>
       
      );
    }
  export default MyComponent;