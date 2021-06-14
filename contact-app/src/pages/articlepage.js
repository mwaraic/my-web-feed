import React, {useState, useEffect} from 'react';
import articleContent from './article-content';
import {Link} from 'react-router-dom';
import NotFoundPage from './NotFoundPage'
import UpvotesSection from '../component/UpvotesSection';
import CommentList from '../component/Commentlist';
import AddCommentForm from '../component/AddComment'
function Articlepage({match}){

    const name=match.params.name;
    const article = articleContent.find(article=>article.name===name)
    const [articleInfo, setArticleInfo]= useState({ upvotes:0, comments: []})   
    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/articles/${name}`)
            const body= await result.json();  
            setArticleInfo(body);      
        }
        fetchData();
    },[name]);
    if(!article) return(<NotFoundPage/>)
    return(
    <>
    <Link to={'/articles-list'}>Back</Link>
    <h1>{article.title}</h1>
    <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />

    {article.content.map((paragraph,key) => (
        <p key={key}>{paragraph}</p>
    ))}
    <h3>Comments:</h3>
    <CommentList comments={articleInfo.comments}/>
    <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
    </>
)
    }
export default Articlepage;