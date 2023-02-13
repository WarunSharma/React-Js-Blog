import React from 'react'
import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import api from './api/posts'
import {format} from 'date-fns';
import DataContext from './context/DataContext';

function NewPost() {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  
  const {posts, setPosts} = useContext(DataContext);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd yyyy pp'); 
    const post = {id, title: postTitle, body: postBody, datetime};
    try {
      const response = await api.post('/posts', post);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <main className='NewPost'>
        <h1>NewPost</h1>
        <form className='newPostForm' onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Title: </label>
          <input id="postTitle" type="text" required value={postTitle} onChange={(e)=>setPostTitle(e.target.value)}/>
          <label htmlFor="postBody">Body: </label>
          <textArea id="postBody" required value={postBody} onChange={(e)=>setPostBody(e.target.value)}/>
          <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default NewPost