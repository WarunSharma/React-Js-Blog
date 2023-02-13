import { createContext, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import api from '../api/posts';

const DataContext = createContext({});

export const DataProvider = ({children}) => {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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

  useEffect(() => {
    const filteredResults = posts.filter(post => (post.title.toLowerCase()).includes(search) || (post.body.toLowerCase()).includes(search));
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

    return (
        <DataContext.Provider value = {{
            search, setSearch, posts, setPosts,
            searchResults
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;