---
title: "Normalize your Redux state"
date: "2020-08-22"
category: web-development
---

Last week I was working with a Redux store which had a lot of nested data in it. Nested data is really common with almost everything related to web applications, but dealing with it in Redux is really painful.

Since one of the core aspects of React and Redux is that [you don't want to mutate data](https://redux.js.org/faq/immutable-data), every time you update a deeply nested component you can cause a bunch of unrelated stuff to re-render, and even worse, your reducers quickly grow out of control every time you add a new layer of nesting.

### a simple solution: normalize your data!

[Normalization](https://en.wikipedia.org/wiki/Database_normalization) is really important when building good, solid and trustworthy databases. If you've ever had to work with a poorly designed database you know how useful it's to have a good data model.

A similar concept can be applied to Redux as well. You can think about your store as a kind of "database" and normalize your state as follows:

- create a reducer for each type of data (ex: users, posts, comments, ratings...). This is like a table in a normal database
- each "table" stores the individual items for that object, with the ID's as keys and the items themselves as values

For a store that holds user accounts and posts associated with each account, it would be something like this:

```javascript
{
  users: {
    byId: {
      "user1": {
        id: "user1",
        author: "name_of_user_1",
        info: "..."
        posts: ["post1", "post2"]
      },
      "user2": {
        id: "user2",
        author: "name_of_user_2",
        info: "..."
        posts: ["post3", "post4"]
      }
    }
  },
  posts: {
    byId: {
      "post1": {
        id: "post1",
        author: "user1",
        body: "...",
      },
      "post2": {
        id: "post2",
        author: "user1",
        body: "...",
      },
      "post3": {
        id: "post3",
        author: "user2",
        body: "...",
      },
      "post4": {
        id: "post4",
        author: "user2",
        body: "...",
      }
    }
  }
}

```

### the benefits of normalizing state

By normalizing our Redux store we make our lives a lot simpler. First of all, expanding this store to include even more layers of nesting is really easy. For instance, if we wanted to add comments to each post above, we would just add a new "table" called `comments` and create a list of comments ID's to the individual object representing a post. Something like this:

```javascript
  "post4": {
    id: "post4",
    author: "user2",
    body: "...",
    comments: ["comment1", "comment2"]
  }
```

Also, reducer logics suddenly gets a lot easier! Retrieving and updating data is simple and consistent across all your reducers. Imagine you needed to update a single comment: without normalization, you would have to update not just the comment, but the post itself and also the user object!

The [Redux documentation](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape) has a lot of information on how to organize your state normalization. I highly recommend reading it and working through some examples to get used to it.
