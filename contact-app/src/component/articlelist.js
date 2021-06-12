import React from 'react'; 
import { Link } from 'react-router-dom';

const Articlelist=({article}) => {
    <>
    <h1>Articles</h1>
    {article.map((article,key)=>(
        <Link className="article-list-item" key={key} to={`/article/${article.name}`}>
        <h3>{article.title}</h3></Link>
    ))}
    </>
}
    
export default Articlelist;
