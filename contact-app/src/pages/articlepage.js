import React, {useState, useEffect} from 'react';
import articleContent from './article-content';
import {Link} from 'react-router-dom';
import NotFoundPage from './NotFoundPage'
const Articlepage =({match})=> {
    const name=match.params.name;
    const article = articleContent.find(article=>article.name===name)
    
    const [articleInfo, setArticleInfo]= useState({ upvotes:0, comments: []})
    
    useEffect(()=>{
        setArticleInfo({ upvotes: 3});
    },[]);
    if(!article) return(<NotFoundPage/>)
    return(
    <>
    <Link to={'/articles-list'}>Back</Link>
    <h1>{article.title}</h1>
    <p>This post has been upvoted {articleInfo.upvotes} times</p>
    {article.content.map((paragraph,key) => (
        <p key={key}>{paragraph}</p>
    ))}

    </>
)
    }
export default Articlepage;