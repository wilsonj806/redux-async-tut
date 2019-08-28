import React from 'react'
import PropTypes from 'prop-types'

const Posts = (props) => {
  return (
    <ul>
      { props.posts.map((post, i) => (
        <li key={i}>
          <a href={ post.url }>
            { post.title }
          </a>
        </li>
      )) }
    </ul>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts