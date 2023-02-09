import React from 'react'
import {useEffect} from 'react'
import {useParams, Link} from 'react-router-dom' 

function EditPost({posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle}) {
    const {id} = useParams();
    const post = posts.find(post=>post.id == id);

    useEffect(() => {
      if (post) {
        setEditTitle(post.title);
        setEditBody(post.body);
      }
    }, [posts, setEditTitle, setEditBody])
    
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