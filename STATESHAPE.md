# State Shape
## Overview
A doc on the shape of our app state.

## Shape
With app state, it's strongly suggested that you spend some time to design the general shape of it. This ensures that when you go maintain it, you don't cry because it's not great.

So the Redux docs are going with the below state shape for the example app:
```json
{
  "selectedSubreddit": "frontend",
  "postsBySubreddit": {
    "frontend": {
      "isFetching": true,
      "didInvalidate": false,
      "items": []
    },
    "reactjs": {
      "isFetching": false,
      "didInvalidate": false,
      "lastUpdated": 1439478405547,
      "items": [
        {
          "id": 42,
          "title": "Confusion about Flux and Relay"
        },
        {
          "id": 500,
          "title": "Creating a Simple Application Using React JS and Flux Architecture"
        }
      ]
    }
  }
}
```

Some notes:
- each subreddit's information is stored separately for cacheability, that way updates are quick
- for each list, we want the below keys:
  - `isFetching` for spinners
  - `didInvalidate` so we can check the data at a later time to see if it's stale
  - `lastUpdated` to help the above
  - `items` the actual items themselves
- in addition, we'll want to store pagination state like `fetchedPageCount` or `nextPageUrl`

In addition, if you check our state, there's quite a lot of nesting going on. This becomes an issue if you have to start referencing nested entities together, or if you need to update something. Ideally you'd treat each key in your state like their separate database tables like so:
```json
{
  "selectedSubreddit": 'frontend',
  "entities": {
    "users": {
      "2": {
        "id": 2,
        "name": "Andrew"
      }
    },
    "posts": {
      "42": {
        "id": 42,
        "title": "Confusion about Flux and Relay",
        "author": 2
      },
      "100": {
        "id": 100,
        "title": "Creating a Simple Application Using React JS and Flux Architecture",
        "author": 2
      }
    }
  },
  "postsBySubreddit": {
    "frontend": {
      "isFetching": true,
      "didInvalidate": false,
      "items": []
    },
    "reactjs": {
      "isFetching": false,
      "didInvalidate": false,
      "lastUpdated": 1439478405547,
      "items": [ 42, 100 ]
    }
  }
}
```

In the above, we sort our state by the following:
- selectedSubreddit
- entities
- postsBySubreddit

`entities` has `users` and `posts` nested inside. Within those are `users[userId]` and `posts[postId]` key value pairs.

`postsBySubreddit` just lists subreddits with an array of items that take in `entities["posts"][postID]` values.

So in this way our state only really has one source of truth for subreddits, posts, and users. If you need to reference posts or users, then you just pass the relevant ID value along.

But for the purposes of this learning project, the first one will be used.