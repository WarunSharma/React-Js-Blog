import React from 'react'
import Feed from './Feed'
import { useContext } from 'react';
import DataContext from './context/DataContext';

function Home() {
  const {searchResults} = useContext(DataContext);
  return (
    <main className='Home'>
        {searchResults.length > 0 ? <Feed posts={searchResults}/> : <p style={{marginTop: "2rem"}}>No Posts</p>}
    </main>
  )
}

export default Home