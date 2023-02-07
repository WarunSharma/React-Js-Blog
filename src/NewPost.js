import React from 'react'

function NewPost({postTitle, postBody, setPostTitle, setPostBody, handleSubmit}) {
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