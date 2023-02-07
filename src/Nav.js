import React from 'react'
import {Routes, Link} from 'react-router-dom';

function Nav({search, setSearch}) {
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={e=>e.preventDefault()}>
          <label htmlFor='search'>Search for posts</label>
          <input type="text" id="search" placeholder="Search posts" value={search} onChange={e=>setSearch(e.target.value)}></input>
        </form>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav