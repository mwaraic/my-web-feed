import React from 'react';
import articleContent from './article-content';
import NotFoundPage from './NotFoundPage'
import {Link} from 'react-router-dom';
const Articlepage =({match})=> {
    const name=match.params.name;
    const article = articleContent.find(article=>article.name===name)
    if(!article) return(NotFoundPage.apply())
    return(
    <>
    <Link to={'/articles-list'}>Back</Link>
    <h1>{article.title}</h1>
    {article.content.map((paragraph,key) => (
        <p key={key}>{paragraph}</p>
    ))}

    </>
)
    }
export default Articlepage;