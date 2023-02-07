import React from 'react';
import Post from './Post';

function Feed({posts}) {
  return (
    <ul>
        {posts.map(post=>(
            <Post id = {post.id} post={post}></Post>
        ))}
    </ul>
  )
}

export default Feed