import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {format} from 'date-fns';
import api from './api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        //Not in 200 response range
        if(error.response) {
          console.log(error.response);
        }
        else {
          console.log(error.message);
        }
      }
    }

    fetchPosts();
  }, [])
  

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

  useEffect(() => {
    const filteredResults = posts.filter(post => (post.title.toLowerCase()).includes(search) || (post.body.toLowerCase()).includes(search));
    setSearchResults(filteredResults.reverse());
  }, [posts, search])
  
  const handleEdit = async(id) => {
    console.log("Hi I am here!!");
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
    <div className="App">
      <Header title="React Js Blog"/>
      <Nav search={search} setSearch={setSearch}/>
        <Routes>
          <Route path="/" element={<Home posts={searchResults}/>}></Route>
          <Route path='/post' element={<NewPost posts={posts} postTitle={postTitle} postBody={postBody} handleSubmit={handleSubmit} setPostTitle={setPostTitle} setPostBody={setPostBody}/>}></Route>
          <Route path='/edit/:id' element={<EditPost posts={posts} editTitle={editTitle} editBody={editBody} handleEdit={handleEdit} setEditTitle={setEditTitle} setEditBody={setEditBody} />}></Route>
          <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}></Route>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<Missing/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
