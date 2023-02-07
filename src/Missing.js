import React from 'react'
import {Link} from 'react-router-dom'

function Missing() {
  return (
    <main>
          <h2>Post not found</h2>
          <p>
            <Link to='/'>Visit our homepage</Link>
          </p>
    </main>
  )
}

export default Missing