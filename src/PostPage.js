import React from 'react';
import {useParams, Link} from 'react-router-dom';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import api from './api/posts'
import {format} from 'date-fns';
import DataContext from './context/DataContext';

function PostPage() {
  const {posts, setPosts} = useContext(DataContext);
  let {id} = useParams();
  const [post] = posts.filter(post=>post.id==id);
  const navigate = useNavigate();

  const handleDelete = async(id) => {
    try {
      //const response = await api.delete('/posts', id);
      await api.delete(`/posts/${id}`);
      const postLists = posts.filter(post=>post.id !== id);
      setPosts(postLists);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }

  }

  return (
      <main className='PostPage'>
      <article className='Post'>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.dateTime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='editButton'>Edit</button></Link>
            <button className='deleteButton' onClick={()=>handleDelete(post.id)}>Delete</button>
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