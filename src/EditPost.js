import React from 'react'
import {useEffect} from 'react'
import {useParams, Link} from 'react-router-dom' 
import { useState, useContext } from 'react';
import DataContext from './context/DataContext';
import {useNavigate} from 'react-router-dom';
import api from './api/posts'
import {format} from 'date-fns';

function EditPost() {
    const {posts, setPosts} = useContext(DataContext);
    const {id} = useParams();
    const post = posts.find(post=>post.id == id);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if (post) {
        setEditTitle(post.title);
        setEditBody(post.body);
      }
    }, [posts, setEditTitle, setEditBody])

    const handleEdit = async(id) => {
      const datetime = format(new Date(), 'MMMM dd yyyy pp'); 
      const updatedPost = {id, title: editTitle, body: editBody, datetime};
      try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(post=>post.id === id ? {...response.data} : post));
        setEditTitle('');
        setEditBody('');
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
    <main className='NewPost'>
        {editTitle &&
            <>
                <h1>Edit Post</h1>
                <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
                <label htmlFor="postTitle">Title: </label>
                <input id="postTitle" type="text" required value={editTitle} onChange={(e)=>setEditTitle(e.target.value)}/>
                <label htmlFor="postBody">Body: </label>
                <textarea id="postBody" required value={editBody} onChange={(e)=>setEditBody(e.target.value)}/>
                <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
                </form>
            </>
        }

        {!editTitle && 
          <>
            <h2>Post not found</h2>
            <p>
              <Link to='/'>Visit our homepage</Link>
            </p>
          </>
        }
    </main>
  )
}

export default EditPost