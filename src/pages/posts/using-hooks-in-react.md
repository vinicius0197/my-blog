---
title: "Using Hooks in React"
date: "2020-03-07"
category: web-dev
---

Hooks are one of the great additions to the React library. I've used class-based components for a long time even after Hooks were first introduced, but I've been really keen on using Hooks on my last projects.

If you've ever heard about Hooks, you probably already know that they allow you to use `state` inside function-based components. That alone used to be a privilege of classes, but not anymore!

Why would you care, though? Well, one of the aspects where Hooks really shine is that they allow you (the developer) to more easily share logic between different components.

Let's take a closer look.

### The `useState` hook

```javascript
import React, { useState } from 'react';

const [resource, setResource] = useState('resource');
```

It may be easier to understand what Hooks are by looking at the code snippet above. This example uses the `useState` Hook (notice that we import this Hook as a named import. The Hook itself is simply a function, as you see). 

`useState` is probably the most common hook out there and you will need to use it inside your functional component if you want to get access to *state*. Also notice that we are using a Javascript feature called [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to get access to the two variables that are returned from the Hook. It's really common to see Hooks being initialized like this.

In a nutshell, what this line of code does is the following: you call `useState` with a string naming the state your component needs to keep. This could be an array of posts, an object with users' information or any other type of state you could imagine. Now `useState` returns to you a reference to this resource together with a function (called `setResource` in this case) so you can change the state when you need to.

If you are used to class-based components, think about `resource` as `this.state.resource` and `setResource` as `setState()`. 

A real world component would do something like this to initialize state:

```javascript
import React, { useState} from 'react';

const PostList = () => {
  const [posts, setPosts] = useState('posts');
  
  return(
    // render a list of posts here
  );
};
```

### But what about lifecycle methods?

At some point, you are probably going to need the kind of functionality provided by lifecycle methods on class-based components. I'm talking about stuff like `componentDidMount`, for instance. Luckily for us, there's the `useEffect` Hook, which unifies the use of some different lifecycle methods.

To better understand how to include the `useEffect` Hook in your code, let's first take a look at this class-based component which fetches data from an API (here I'm using the real `jsonplaceholder` API for mocking the data. [Check it out here!](https://jsonplaceholder.typicode.com/)).

```javascript
import React from 'react';
import axios from 'axios';

class ResourceList extends React.Component {
  state = { resources: [] };

  async componentDidMount() {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${this.props.resource}`);

    this.setState({ resources: response.data });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.resource  !== this.props.resource) {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/${this.props.resource}`);

      this.setState({ resources: response.data });
    }
  }

  render() {
    return(
      <div> {this.state.resources.length} </div>
    );
  }
}

export default ResourceList;
```

The code above is pretty straightforward. Remember that `componentDidMount` only runs once? We are using it here for fetching some data from the API the first time our app loads. Also, suppose that this app receives a **resource** prop, which is just some string representing an endpoint from the API (it could be something like "posts" or "users". Those are real endpoints in `jsonplaceholder`). We then use `axios` to fetch data from that endpoint. This **resource** endpoint can change based on the props received, so our component can load data from different endpoints.

But since `componentDidMount` only runs once, if our component ever receives a different *prop* representing some other endpoints, nothing will change! We need to check for that every time the component gets updated, and that's why we have the `componentDidUpdate` lifecycle method right there.

Every time the component updates React automatically calls `componentDidUpdate` with `prevProps` as an argument (this is an object which contains, as the name suggests, the previous props sent to the component). We check if the current prop is equal to the last one received. If affirmative, no need to get data from the API. Only if the endpoint changes we need to fetch data again, right?

Also (and more important) if you don't check for that condition your app will get into an infinite loop. Why? Well, our component receives the prop for the first time, fetches data and updates its state using `setState`, which makes the app rerender, which in turn calls `componentDidUpdate` which will fetch data again and update the state again... This is obviously bad and we don't want that, hence the check.

I hope the functionality of the above class-based component is clear to you because we are now going to rewrite it using React Hooks.

To have access to the kind of functionality provided by lifecycle methods within functional components we need to call the `useEffect` Hook.  It combines the functionality of both `componentDidMount` and `componentDidUpdate` and you can read more about it [here](https://reactjs.org/docs/hooks-reference.html#useeffect).

The above component refactored to use Hooks looks like this:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResourceList = ({ resource }) => {
  const [resources, setResources] = useState([]);

  const fetchResource = async (resource) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`);

    setResources(response.data);
  };

  useEffect(() => {
    fetchResource(resource);
  }, [resource]);

  return(
    <div> {resources.length} </div>
  );
}

export default ResourceList;
```

To understand what's going on, let's examine the `useEffect` hook. We are calling it every single time our component gets rendered, and we are also recreating the array which is the second argument to `useEffect` and possibly putting a different value in there. Between renders, if the argument passed to that array changes, the callback function which is being sent as the first argument to `useEffect` will be called.

Just a quick tip: if you use `useEffect` without passing the second argument, that function will always get called.

I think this a pretty nice Hook. I mean, you get the functionality of two different lifecycle methods for the price of one, and you don't need to check yourself if the arguments you're passing to it have changed (which could cause that infinite loop we talked about).

Remember that you can change how `useEffect` calls its received function by using the second argument, like so:

1) If there's no second argument, the callback function will always get called

2) If you send an array with some data, the callback function will only get called if this data changes

3) If you send an empty array, the callback only gets called once

Something else you should note: you can't return Promises from the first argument function call. In other words, something like this is **not** supported:

```javascript
useEffect(async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`);

    setResources(response.data);
}, [resource]);
```

The solution is either do something like we've had done previously (by defining the async function somewhere else and calling it inside `useEffect`, or wrapping the function inside another arrow function like so:

```javascript    
useEffect(() => {
  (async resource => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`);

    setResources(response.data);
  })(resource);
}, [resource]);
```

In this second case, we've got an arrow function that defines and immediately invokes a second arrow function.

### The great thing about Hooks: sharing logic

Now, the neat thing about hooks is how easy it is to share logic between components. We can extract the fetching data from API side of this component to a separate function, like so:

```javascript
const useResources = (resource) => {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    (async resource => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/${resource}`);

      setResources(response.data);
    })(resource);
  }, [resource]);

  return resources;
};

const ResourceList = ({ resource }) => {
  const resources = useResources(resource);

  return(
    <ul>
      {resources.map(record => <li key={record.id}>{record.title}</li>)}
    </ul>
  );
}

export default ResourceList; 
```

This is really succinct code. You could share `useResources` with a bunch of different components and keep your presentational components really simple.

### Wrapping it up

I've started using Hooks more and more since learning about them, and I think they're pretty great. I admit I didn't saw the benefits of functional components the first time I heard about them, but I've been really digging them now.

According to the React docs, [class-based component will still be supported for a long time](https://reactjs.org/docs/hooks-intro.html#gradual-adoption-strategy) (there are a lot of codebases using them!). But the ecosystem is quickly moving to Hooks, so you probably would benefit of using them if you are starting a new project right now.

Hooks now support almost everything a class-based component does (and I say almost because, last time I checked the docs, there were no hooks for `getSnapshotBeforeUpdate` and `componentDidCatch` yet, but those are more uncommon and they may even be implemented already by the time you are reading this).