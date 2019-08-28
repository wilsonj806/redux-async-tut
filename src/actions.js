export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
/* NOTE the below are all synchronous wrapper functions for dispatching an action */
// ----- Select subreddit to display
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

// ----- Invalidate current subreddit/ refresh subreddit
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}


// ----- Request subreddit posts
function requestPosts(subreddit, json) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  }
}

// ---- Recieve subreddit posts
function recievePosts(subreddit, json) {
  return {
    type: RECIEVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    recievedAt: Date.now()
  }
}

// ----- Asynchronous dispatch function to handle requesting and recieving posts
export function fetchPosts(subreddit) {
  // below is currying
  return async (dispatch) => {
    dispatch(requestPosts(subreddit))
    try {
      const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      const data = res.clone().json();
      dispatch(dispatch(recievePosts(subreddit, data)));
    } catch (error) {
      console.error(error)
    }
  }
}

// ----- Function to check if the client should fetch posts
function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

// ----- Asynchronous dispatch function for fetching posts
export function fetchPostsIfNeeded(subreddit) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // Dispatch a thunk from thunk! Very nice
      // This lets us build more complex async actions
      // while keeping the core simple/ relatively the same
      return dispatch(fetchPosts(subreddit))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}