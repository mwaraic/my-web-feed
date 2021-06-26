import React from 'react';


 
const RenderFrame = ({props}) => {

    return (
        <>
       
        <div>
        <blockquote class="reddit-card" data-card-created={props.data.created}>
        <a href={props.data.url}></a>
        <a href={"http://www.reddit.com/".concat(props.data.subreddit_name_prefixed)}></a></blockquote>
        </div> 
         <div>
         <blockquote class="reddit-card" data-card-created="1553892582">
             <a href="https://www.reddit.com/r/science/comments/b6wjlb/a_billion_people_may_be_newly_exposed_to_diseases/">
                 A billion people may be newly exposed to diseases like dengue fever as world temperature rises by the end of the century because of global
         warming, says a new study that examines temperature changes on a monthly basis across the world.</a> from
         <a href="http://www.reddit.com/r/science">r/science</a></blockquote>
     </div>
     </>
    );
}

export default RenderFrame;