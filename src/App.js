import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {format} from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  function handleDelete(id) {
    const postLists = posts.filter(post=>post.id !== id);
    setPosts(postLists);
    navigate('/');
  }

  useEffect(() => {
    const filteredResults = posts.filter(post => (post.title.toLowerCase()).includes(search) || (post.body.toLowerCase()).includes(search));
    setSearchResults(filteredResults.reverse());
  }, [posts, search])
  

  function handleSubmit(e) {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd yyyy pp'); 
    const post = {id, title: postTitle, body: postBody, datetime};
    const allPosts = [...posts, post];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  return (
    <div className="App">
      <Header title="React Js Blog"/>
      <Nav search={search} setSearch={setSearch}/>
        <Routes>
          <Route path="/" element={<Home posts={searchResults}/>}></Route>
          <Route path='/post' element={<NewPost postTitle={postTitle} postBody={postBody} handleSubmit={handleSubmit} setPostTitle={setPostTitle} setPostBody={setPostBody}/>}></Route>
          <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}></Route>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<Missing/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
