---
title: "Understanding cookies and sessions"
date: "2020-08-15"
category: web-development
---

Cookies are small pieces of data sent by the server to the browser. They are used so that the server can "remember" stuff about a particular client. Since HTTP requests are stateless (meaning that each requisition is considered as an independent transaction), a header called `Set-Cookie` is used when a server wants to send cookie data to a client.

If you are not sure how HTTP headers work, take a look at these [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers).

### which kind of data is stored inside a cookie?

You could store any kind of data you want in a cookie. If you use your browser Developer Tools to inspect cookies for some of the websites you use, you will notice that cookies are just a big string of gibberish. Nothing fancy about them.

Usually, you use cookies when you want your server to "remember" some piece of data about a particular user. In most cases, it would be something like a user ID if they are logged in somewhere. Browsers give you 4kb of data that you can store inside a cookie, so that should be plenty for most simple applications. And you should not store complex data in a cookie anyway.

Other examples of data that you can store inside a cookie would be: the location of a user inside a website, shopping cart information, etc...

### what does it look like?

Imagine you are logging in to a web server somewhere in the world. You type in your username and password and send a request to the server.

The server then checks that you are logging in with the correct username and password and then sends you back a response with a cookie (using the `Set-Cookie` header). That cookie contains some piece of data that identifies you as the logged-in user. For every subsequent request that you make to that web-server, your browser will take care of sending the cookie back to the server.

Now, if you ask something from the server that requires authentication (a list of posts, your user information, credit card data, etc...) then the server will check your request for a [Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie) header.

The cookie is now acting as a unique identifier for you. Much better than typing passwords every time you make a request. Without cookies, the server would always consider you a first-time visitor.

### the difference between cookies and sessions

The use case of cookies we've just discussed (user authentication) is already a kind of "session", but typically it has some more layers of abstraction.

Building on the user authentication example, we decide that we want to remember more information about our users in between requests, but we don't want that data to be readable or editable on the client-side (in other words, we don't want to send a cookie with all that data to our user's browser).

The solution would be to store that piece of data server-side and give it an **id** and pass that id to the client inside a cookie. That's it. Now you have sessions implemented.

Of course, this is a rather simplistic explanation. Not all sessions are implemented the same way. For instance, not all sessions need to be implemented server-side. If you check the Ruby on Rails [documentation about sessions](https://guides.rubyonrails.org/action_controller_overview.html#session) you will notice that there are 4 ways that you could choose to store your session data. The default one is by using `CookieStore`, which stores all data on the client.

This is how you would have access to the `session` hash:

```ruby
session[:current_user_id] = user.id
```

Sessions could also be stored in databases or in a cache such as Redis. Which one you choose depends upon your application size, complexity, and requirements.
