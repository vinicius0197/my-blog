---
title: "My Redux usage guide"
date: "2020-02-13"
---

Redux is a very useful state-management library for UI development. When you are dealing with React alone and your app starts to get really complex, managing state becomes very difficult.

In React, each component is responsible for handling its own state. When state from some component needs to be shared with a sibling component, for instance, it needs to get lifted up to the parent component, which will send it through props to each of its children. Now, if two components very distant apart need to share some state, things get really messy. Now a bunch of potentially unrelated components need to pass that piece of state through the tree until it reaches its final destination. Handling it all gets confusing and introduces the possibility of adding more bugs to the application.

That's where Redux comes in.

### What's a `reducer` for?

Take some existing data and some action, modify and return that existing data based upon the contents of an action.

A reducer gets called with two arguments: the current state of the app, and an action to change that state. It returns the modified state.

### Redux organization

Usually a React with Redux project is organized like so:

```
- src/
  - actions/
  - components/
  - reducers/
  - index.js
```

The `components` folder is your vanilla React folder with all your app components. Inside of your `actions/` folder your will put files containing all your Action Creators, and in `reducers` you put - guess what - the reducers!

You will use `index.js` for configuring stuff. You will usually see something like this at your root `index.js` file:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
```

All of our app needs to be wrapped inside that `Provider` component from the `react-redux` library. Also, this is where we create our store where all of our app data will live. You will probably have something like this:

```javascript
ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
```

See that we are creating a store with all of your reducers (which we need to import from our `reducers/` folder) and passing it as a prop to `Provider`. Now, any component inside our application can get access to the Redux store.

### What is `mapStateToProps`?

This name is just a convention. That's a function you define inside your component file, and what is does is take the Redux state and map it to props that will be sent into our component. We use it to configure the `connect` function (which will be explained bellow).

If we do something like this:

```javascript
const mapStateToProps = (state) => {
  console.log(state);
  return state;
};
```

We would see all the state of our app. But our individual component doesn't care about that. There's a specific subset of data that our component needs access to, and so we write this `mapStateToProps` function as a way to "filter" this state and send it to our component just what it needs to know, mapped as a prop. Nice, isn't it?

For instance, we could do something like this:

```javascript
class SampleComponent extends React.Component {
  //if we check this.props, it should contain = { importantData: state.data }
}

const mapStateToProps = (state) => {
  return { importantData : state.data }
};
```

In the end, this function does exactly what the name says.

The `mapStateToProps` function gets called every time that we change our Redux state or anytime we rerun our reducers and create some new state object. 

Also, you may need to get access to some components props inside your `mapStateToProps`. Fortunately, this function is called with a second argument, which is a copy of the props passed to the component:

```javascript
const mapStateToProps = (state, ownProps) => {
  return { importantData : state.data }
};
```

### How `connect` works

When inside a component, you may want to access that Redux store that we've created in our app. To do that, we need to make use of the `connect` function from inside the React-Redux library. That function has a pretty strange syntax when you first look at it:

```javascript
class MyComponent extends React.Component {
  render() {
    return <div> My Component </div>;
  }
}

export default connect(mapStateToProps)(MyComponent);
```

That `connect()(MyComponent)` is not as cryptic as it may seem. It's just that the `connect()` function is actually a function that returns another function, and it's to this returned function that we send our component as a parameter (okay, that may have sounded a little bit cryptic, but bear with me here).

The `connect` function will take a `mapStateToProps` function as an argument to configure itself. It can also receive an Action Creator as a second argument:

```javascript
import { myActionCreator } from '../actions';

export default connect(mapStateToProps, 
  { myActionCreator: myActionCreator })(MyComponent);
```

Notice that the second argument to `connect` is an object with key `myActionCreator` (it could be anything, I'm using this as an example), and value being the Action Creator that we've imported from the `/actions` folder. We could use some ES2015 syntax and write key and value like the following:

```javascript
import { myActionCreator } from '../actions';
    
export default connect(mapStateToProps, { myActionCreator })(MyComponent);
```

Here, we have an object with both key and value with name myActionCreator.

If you check your component props now, you will notice that you have a `myActionCreator` function being sent as a prop. That's your action creator. If you call it, it will automatically take the action that gets returned and send it to Redux dispatch function.

### How do we get API data from Redux?

Let's say we are using Redux in our application and we need to fetch data from some API. In Redux, the common procedure would be:

1. Components fetch data by calling an Action Creator (usually by some lifecycle method)
2. Action Creators make the API requests
3. New state is generated in our Redux store, which is passed to our component through mapStateToProps

### Actions must be plain objects

That means that you can't directly make network requests inside action creators.

Let me show an example of bad code:

```javascript
export const myActionCreator = async () => {
  const response = await doApiCall();

  return {
    type: 'FETCH_DATA',
    payload: response
  };
}
```

Surely it looks correct, right? After all, we are returning a plain object from our Action Creator. But that's not the case, and that's because of the `async` and `await` syntax we are using to handle our API call. If you use a tool like Babel to transpile this code to the actual Javascript code that's going to run in the browser, you will
notice that those `async` and `await` keywords will end up looking really nasty, and your function ends up not returning what you think it's returning. It will not be a
plain object.

All this troube just because this is an asynchronous Action Creator. For this kind of stuff you are required to install some middleware.

We can all agree that the flow of data in a Redux application usually looks something like this:
 
1. Action Creator is called by our app
2. Action Creator produces an Action
3. Action gets fed to `dispatch`
4. `dispatch` sends data to `reducer`
5. `reducer` creates a new state

For an asynchronous action creator, it will look like this instead:

1. Action Creator is called by our app
2. Action Creator produces an Action
3. Action gets fed to `dispatch`
4. `dispatch` forwards action to `middleware`
5. `middleware` sends data to `reducer`
6. `reducer` creates a new state

So, let's remember how to use those `middlewares` inside our Redux app.

### Using `middlewares` with Action Creators

Okay, what is a `middleware` after all?

- Middlewares are functions that get called with every action we dispatch
- They do some stuff with the received action
- Generally used for dealing with async actions

`Redux Thunk` is a famous `middleware` for dealing with issues such as those we've discussed in the previous section. 

You may remember that the rules for building an Action Creator are:

- Action Creators must return action objects
- Actions must have a type property
- Actions must have a payload property

Redux Thunk will add one option to those:

- Action Creators must return Action Objects OR functions

Besides that, if you return a function, Redux Thunk will call that function for you. If you return an object, it will simply pass the object normally to the reducers.

To configure some middleware (it can be anything, not necessarily Redux Thunk), you can do this:

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
```

Now, inside your Action Creators, you would do something like this:

```javascript
export const myActionCreator = () => {
  return async function(dispatch, getState) {
    const response = await doApiCall();

    dispatch({ type: 'FETCH_DATA', response: response })
  };
};
```

You don't need to return an action. You will call `dispatch` manually if you are instead returning a function from the Action Creator. 

Notice, as well, that we are using the async/await syntax normally. But that's because, in the previous case, we end up returning a request object to the `dispatch` function. Now, we are calling `dispatch` manually inside our Action Creator, and the return value of the action creator itself is not being used.

We can use a shorter syntax, by the way:

```javascript
export const myActionCreator = () => async dispatch => {
  const response = await doApiCall();

  dispatch({ type: 'FETCH_DATA', response: response })
};
```

Here we are using arrow functions, and since we didn't use `getState` inside our function, it's not necessary to use it. Also, as we are returning a single value from `myActionCreator` , we do not need the curly braces.

### Rules for reducers

1. Must return any value besides `undefined`
2. It must return a 'state' to be used in your app using only the previous state and an action
3. It must be pure (must not do stuff like API calls, reading files from file system, etc...)
4. You shouldn't mutate its input 'state' argument

### You shouldn't update your `state` directly

Usually you need to make changes to your app `state` data. That's a big part of a typical web application, right? Just remember to not alter it *directly*.

Examples of what **not** to do:
```javascript
state.pop()
state.push()
state[0] = 'some stuff'
state.property = 10
```

Examples of what **to do**:
```javascript
state.filter(el => el !== 0)
[...state, newElement]
state.map(el => { do something here... })
{...state, property = 10}
```

Notice that in the correct examples, we are not updating our state directly. We are not even touching the original `state` object at all. Functions like `filter`, `map` or spread operators actually return a new object.


### Using Redux Chrome Extension

If you are dealing with Redux, this extension is actually pretty useful:

[https://github.com/zalmoxisus/redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)