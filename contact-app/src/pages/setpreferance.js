import React from "react"
import Select from 'react-select';
import {Form, Button } from "react-bootstrap";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class MyComponent extends React.Component {

    state = {
      twitter: null,
      reddit: null,
      news:null
    };
    handleSubmit(e){
        alert(this.state.twitter.value)
    }
    handleChange1 = twitter => {
      this.setState({ twitter});
      console.log(`Option selected:`, twitter);
    };
    handleChange2 = news => {
        this.setState({ news });
        console.log(`Option selected:`, news);
      };
    handleChange3 = reddit => {
        this.setState({ reddit });
        console.log(`Option selected:`,reddit);
      };
    render() {
      const { twitter, news, reddit } = this.state;
  
      return (
        <>
        <Form>
        
        <div style={{minWidth:"30rem", fontFamily: "Pacifico", margin: 10}}><h1 style={{fontSize: 40}}>Select your favourite tags</h1></div>
        
       <div className="text-center" style={{margin:10}}> <img  style={{ height : "15rem", width: "25rem", }} src="https://flipweb.org/wp-content/uploads/2019/09/Google-News.png" alt=""/></div> 
       <Select
          value={news}
          onChange={this.handleChange2}
          options={options}
        />
      <div className="text-center" style={{margin:10}}><img  style={{ height : "10rem", width: "20rem",  }} src="https://cdn.iphoneincanada.ca/wp-content/uploads/2016/02/twitter-logo.png" alt=""/></div>
      <Select
          value={twitter}
          onChange={this.handleChange1}
          options={options}
        />
     <div className="text-center" style={{margin:10}}> <img  style={{ height : "10rem", width: "20rem", }} src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo-2017-present.jpg" alt=""/></div> 
     <Select
          value={reddit}
          onChange={this.handleChange3}
          options={options}
        />
      <div className="text-center" style={{margin:10}}>
      <Button variant="success" onClick={e=>this.handleSubmit(e)} className="w-100" type="submit">
                  Save
                </Button></div>
      </Form>
      </>
       
      );
    }
  }
  export default MyComponent;