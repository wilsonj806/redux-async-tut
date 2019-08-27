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

// ----- Asynchronous wrapper function to handle requesting and recieving posts
function fetchPosts(subreddit) {
  // below is currying
  return async (dispatch) => {
    dispatch(requestPosts(subreddit))
    try {
      const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      return res.clone().json();
    } catch (error) {
      console.error(error)
    }
  }
}