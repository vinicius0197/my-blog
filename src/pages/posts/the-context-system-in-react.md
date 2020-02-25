---
title: "Getting started with the Context System in React"
date: "2020-02-25"
---

In a nutshell, you can think about the Context API (in case you are unfamiliar with it) as a way to send data from a parent component down to any
nested child component, directly. It's a way to solve *prop drilling*, which occurs when you're trying to get state from the top a component hierarchy
tree and end up passing a bunch of props to components that don't need to know about them.

If you've ever heard about Redux, you are probably thinking: "So... Isn't this the exact problem a state-management library like Redux is supposed to solve?".
Well, yes... But solving *prop drilling* is just one of Redux applications, and maybe your application doesn't need a full-fledged state-management library
to handle just a small amount of data, in which cases you could probably just use the Context API and be done with it.

This article is supposed to be a very brief introduction on how you would setup the Context API on a React project.

### How to create the Context object?

The Context object will handle your state data between components. Creating it is very straightforward: I simply create a `/contexts` folder inside my source directory and then create a file inside it which will hold the Context object. This way, any component that needs to access the Context object can simply import it.

The only thing you need to write inside this file is:

```javascript
import React from 'react';

export default React.createContext('someDefaultValue');
```

Notice that we are providing a default value to our context here. This default value can be any kind of valid Javascript data (think arrays, objects, strings).

### How do we get information inside the Context object?

Using Context is all about handling data. You can think of the Context object as some kind of "storage" where you put data so other components can grab it. So, let's first think about how we can put this data inside the Context object.

1) We can set a Default Value when our Context object is created

This is what we've done when we passed a default value to the `React.createContext` function call.

2) Inside Parent Component, we can create something called a `Provider` component, which can push information inside the Context object.

To use a `Provider`, you need some component that will act as a source of information for the data you want to handle. You can think of it as some
top-level component in your hierarchy that has access to the state of your app. For the purposes of this simple guide likes say that the `App` component
will be responsible for handling all the application state.

We need some way to communicate information from the `App` component into the Context object. Here comes the `Provider` component! We use it to update the value
inside our Context object.

You create a `Provider` component by importing the Context object and wrapping the components which need access to the Context object.

```javascript
import React from 'react';
import ExampleContext from '../contexts/ExampleContext';

class App extends React.Component {
  state = { color: 'blue' }

  render() {
    <ExampleContext.Provider value={ this.state.color }>
      <TestComponent />
    </ExampleContext.Provider>
  }
}
```

The `value` prop we are sending to our Provider will be used to update the Context object. This is how we send information from the `App` component state down to the
Context object.

### Getting information out of the Context object

At the other end, we need to retrieve data at some point inside our React app. There are two ways to accomplish this:

1) Reference `this.context` inside a nested child component

Suppose you have a component called `Button` that needs to access some Context object. You need to create a variable called `contextType` inside it, like so:

```javascript
import React from 'react';
import ExampleContext from '../contexts/ExampleContext';

export default class Button extends React.Component {
  static contextType = ExampleContext;
  
  render() {
    const myData = this.context;
    return(
      <button className="button">My Button</button>
    );
  }
}
```

Remember that `contextType` is a special reserved word. You can't call it anything else!

Now that your class has a reference to `contextType`, you can call `this.context` and have access to the Context object. Try doing a `console.log()` on it to inspect what it looks like!

2) Create a component called a `Consumer` object.

Refactoring the previous component to use a Consumer object:

```javascript
import React from 'react';
import ExampleContext from '../contexts/ExampleContext';

export default class Button extends React.Component {
  doSomething(value) {
    // do something with value here
  }

  render() {
    return(
      <button className="button">
        <ExampleContext.Consumer>
          {value => this.doSomething(value)}
        </ExampleContext.Consumer>
      </button>
    );
  }
}
```

Notice that we don't need to create a reference to `contextType` anymore. We just wrap a function inside the `Consumer` component, and that function gets called with the current Context value as its first argument.

That surely looks more complicated than just accessing `this.context` right? Yes, it does... But you need to do that if you want to pull data from multiple different contexts.

Using multiple contexts, by the way, can lead us to some messy syntax, but it looks like this from the Provider side:

```javascript
import React from 'react';
import ExampleContext from '../contexts/ExampleContext';
import AnotherContext from '../contexts/AnotherContext';

class App extends React.Component {
  state = { color: 'blue' }

  render() {
    <AnotherContext.Provider value="red">
      <ExampleContext.Provider value={ this.state.color }>
        <TestComponent />
      </ExampleContext.Provider>
    </AnotherContext.Provider>
  }
}
```

And from the Consumer side:

```javascript
import React from 'react';
import ExampleContext from '../contexts/ExampleContext';

export default class Button extends React.Component {
  doSomething(value) {
    // do something with value here
  }

  render() {
    return(
      <AnotherContext.Consumer>
        {(color) => 
          <button className={`${color}`}>
            <ExampleContext.Consumer>
              {value => this.doSomething(value)}
            </ExampleContext.Consumer>
          </button>
        }
      </AnotherContext.Consumer>
    );
  }
}
```
What you should notice here is that we still need to return a function inside our Consumer, so we are returning JSX that contains the second Consumer component within it.


### Recap: Flow of a React application

Here's a quick summary of how your React app loads (and handles the Context object):

1) Your app loads in the browser

2) The Context object is created

3) Component gets rendered and creates a Provider object

4) Provider updates value of Context object

5) Some child component get into the Context object and use its value

6) The child components are rendered
