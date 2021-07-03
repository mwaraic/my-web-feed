import React, { useEffect } from "react"
import Select from 'react-select';
import {Form, Button } from "react-bootstrap";
import Opt from "../component/Options";
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import {Link, useHistory } from "react-router-dom"

const UpdatePreferances=()=> {
    const { currentUser} = useAuth()
    const [twitter, setTwitter] = useState([])
    const [news, setNews] = useState([])
    const [reddit, setReddit] = useState([])
    const history = useHistory()
    const [preferances, setPreferances]= useState({ twitter:[], reddit: [], news:[] }) 

    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/preferances/${currentUser.email}`)  
            const body= await result.json(); 
            setPreferances(body)
        }
            fetchData();
    },[currentUser]);

  async function onSubmit(e){
    e.preventDefault()
     try{
         
      await fetch(`/api/update-preferances/${currentUser.email}`, {
                method: 'post',
                body: JSON.stringify({ twitter: twitter, reddit: reddit, news: news }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            history.push("/")
          }
      catch{

      }}
        
    const handleChange1=(twitter)=> setTwitter(twitter); 
    const handleChange2 =(news) => setNews(news);
    const handleChange3 = (reddit) => setReddit(reddit);
      return (
        <>
        
        <Form onSubmit={onSubmit}>
       
        <div className="text-center" style={{minWidth:"15rem", fontFamily: "Pacifico", marginTop: 50}}><h1 style={{fontSize: 40}}>Update your tags</h1></div>
        
       <div className="text-center" style={{margin:10}}> <img  style={{ height : "15rem", width: "25rem", }} src="https://flipweb.org/wp-content/uploads/2019/09/Google-News.png" alt=""/></div> 
       <Select
          defaultValue={preferances.news}
          isMulti
          onChange={handleChange2}
          options={Opt.News}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      <div className="text-center" style={{margin:10}}><img  style={{ height : "10rem", width: "20rem",  }} src="https://cdn.iphoneincanada.ca/wp-content/uploads/2016/02/twitter-logo.png" alt=""/></div>
      <Select
          defaultValue={preferances.twitter}
          isMulti
          onChange={handleChange1}
          options={Opt.Twitter}
          className="basic-multi-select"
          classNamePrefix="select"
        />
     <div className="text-center" style={{margin:10}}> <img  style={{ height : "10rem", width: "20rem", }} src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo-2017-present.jpg" alt=""/></div> 
     <Select
          defaultValue={preferances.reddit}
          isMulti
          onChange={handleChange3}
          options={Opt.Reddit}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      <div className="text-center" style={{marginTop:50}}>
      <Button variant="success" className="w-50" type="submit">
                Update
                </Button>
               
      </div><div className="text-center" style={{marginTop:10, marginBottom: 50}}><Link to='/'><Button className="w-50"variant="success" >
                  Cancel
                </Button></Link></div> 
      </Form>
     
      </>
       
      );
    }
  export default UpdatePreferances;