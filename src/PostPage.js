import React from 'react';
import {useParams, Link} from 'react-router-dom';

function PostPage({posts, handleDelete}) {
  let {id} = useParams();
  console.log(id);
  const [post] = posts.filter(post=>post.id==id);
  return (
      <main className='PostPage'>
      <article className='Post'>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.dateTime}</p>
            <p className='postBody'>{post.body}</p>
            <button onClick={()=>handleDelete(post.id)}>Delete</button>
          </>
        }
        {!post && 
          <>
            <h2>Post not found</h2>
            <p>
              <Link to='/'>Visit our homepage</Link>
            </p>
          </>
        }
        </article>
      </main>
  )
}

export default PostPage