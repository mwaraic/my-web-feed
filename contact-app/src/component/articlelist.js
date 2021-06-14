import React from 'react'; 
import { Link } from 'react-router-dom';

const Articlelist=({articles}) => (
    <>
    
    {articles.map((article,key)=>(
        <Link className="article-list-item" key={key} to={`/articles/${article.name}`}>
        <h3>{article.title}</h3></Link>
    ))}
    </>
);
    
export default Articlelist;
