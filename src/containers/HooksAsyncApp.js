import React, { useState, useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  fetchPosts
} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

const HooksAsyncApp = (props) => {
  // ----- Redux store access
  const dispatch = useDispatch();
  const postsBySubreddit = useSelector(state => state.postsBySubreddit)
  const selectedSubreddit = useSelector(state => state.selectedSubreddit)

  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  useEffect(() => {
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }, [])

  const handleChange = (nextSubreddit) => {
    dispatch(selectSubreddit(nextSubreddit))
    dispatch(fetchPosts(nextSubreddit))
  }

  const handleRefreshClick = (e) => {
    e.preventDefault();
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  return (
    <div>
      <Picker
        value={selectedSubreddit}
        onChange={handleChange}
        options={['reactjs', 'frontend']}
      />
      <p>
        {lastUpdated && (
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
          </span>
        )}
        {!isFetching && (
          <button onClick={handleRefreshClick}>Refresh</button>
        )}
      </p>
      {isFetching && posts.length === 0 && <h2>Loading...</h2>}
      {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
      {posts.length > 0 && (
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>
      )}
    </div>
  )
}

export default HooksAsyncApp