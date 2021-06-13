import React from 'react';
import articleContent from './article-content';
import Articlelist from '../component/articlelist'


const Articlelistpage =()=> (
    <>
    <h1>Articles</h1>
   <Articlelist articles={articleContent}/>
    </>
);

export default Articlelistpage;