---
title: "My React usage guide"
date: "2020-02-11"
---

React is a really cool library. Building web-applications has became so much easier to me since learning it and using it in some projects.

This post is my repository for knowledge related to React. It's been useful to me and so I'm posting it here hoping that it can help others as well. I will be updating this post when I learn any other tips and tricks that can be handy in developing web apps.

### When creating a React Component, wrap the first `div` with a className with the same name as the component, like so:

```javascript
const myComponent = () => {
  return <div className="my-component"> This is my random component! </div>
}
```

This makes styling the component way easier and more clear.

### Using configuration objects

Here's a silly example: suppose you need to have a component that shows some custom styled text based on props received from a parent component. Let's say your parent component sends the child a random integer and need the child to display this custom styling based on whether the number is odd or even. Here's a way to accomplish that:

```javascript
const configObject = {
  odd: {
    text: "This number is odd!",
    color 'red'
  },
  even: {
    text: "This number is even!",
    color: 'blue'
  }
}

const checkNumber = number => {
  if(number % 2 === 0) {
    return 'even';
  } else {
    return 'odd';
  }
}

class numberComponent extends React.Component {
  const number = checkNumber(props.number);
  const text = configObject[number]; // here is the trick

  render() {
    
    return (
      <div>{text}</div>;
    );
  }
}
```
Ok, so what's the good in that? You say. Here, it's very easy to understand what's happening and to change the configuration object accordingly, without needing tons of conditionals scattered around our codebase.

### Using `this`

One of the things that was most confusing to me when I started learning React was the `this` keyword. 

When you write code like this: 

```javascript
class TestComponent extends React.Component {
  state = { myState: 'test' };
  
  testMethod() {
    alert(this.state.myState);
  }

  render() {
    return (
      <button onClick={this.testMethod}> Press this Button </button>
    );
  }
}
```
The code above is going to thrown an error when you click the button. Can you guess way?

Let's start with an example. Suppose you are writing code for that sample `myComponent` component, and you have a bunch of stuff inside
that component: you have state, you have some methods and attributes. When you write `this` inside the component, you are referencing the
component itself.

So, you could do stuff like `this.state` or `this.testMethod()`.

But if you've coded with React (or just good old plain Javascript), you've probably had some issues with `this`. To solve this, you need
to understand how the value of `this` is determined inside a function.

In geral, when we want to know what the value of `this` is going to be equal to inside of a method in a class, we look not at the method itself but
where we *call* the method.

That's where the problem of using `this` arises, and you've probably seen an error message like this one:

```
Uncaught TypeError: Cannot read property 'name' of undefined
```

This kind of error usually arises when you are using callbacks (such as event handlers inside React). It's called context loss and it happens
because the value of `this` gets lost when you pass a method as a callback.

The following code demonstrates this kind of error:

```javascript
class Test {
  constructor(name){
    this.name = name
  }
  
  show(){
    console.log(this.name);
  }
}

var foo = new Test('Foo Bar');
foo.show(); // the string 'Foo Bar' gets displayed

// The assignment operation demonstrates context loss
var show = foo.show; 
show(); // now we get an error
```

If you look at the first code snippet, you will notice that `testMethod` is being passed as a callback to the `onClick` event handler, and that
makes the reference to `this` inside the method undefined. That's why that code will give us an error.

What are the solutions?

1. Bind the methods using `bind`

We can rewrite that piece of code like this:

```javascript
class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.testMethod = this.testMethod.bind(this);
  }

  state = { myState: 'test' };
  
  testMethod() {
    alert(this.state.myState);
  }

  render() {
    return (
      <button onClick={this.testMethod}> Press this Button </button>
    );
  }
}
```
This works because we are manually binding the value of `this` in the method. `.bind()` is a method on the prototype of all the functions
inside Javascript (prototypes are the way Javascript implements inheritance. You can read more about it [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)). The first argument you pass to `bind()` is the context the function will be bound to.

2. Use arrow functions
Arrow functions auto-bind in Javascript, so you don't have to do that manually. Rewriting the previous piece of code results in:

```javascript
class TestComponent extends React.Component {
  state = { myState: 'test' };
  
  testMethod = () => {
    alert(this.state.myState);
  }

  render() {
    return (
      <button onClick={this.testMethod}> Press this Button </button>
    );
  }
}
```
*hint:* this is my preferred way of solving this problem. It's simpler and requires fewer lines of code.

3. You can wrap the function passed to the event handler inside an arrow function

```javascript
class TestComponent extends React.Component {
  state = { myState: 'test' };
  
  testMethod() {
    alert(this.state.myState);
  }

  render() {
    return (
      <button onClick={() => this.testMethod()}> Press this Button </button>
    );
  }
}
```

In this case, we are defining an arrow function and passing it as a callback to the event handler. Inside this function there's a call to our
`testMethod` (don't forget to include the parenthesis!).  

### Using `ref`

The `ref` system is the way in Ract by which you can access individual DOM nodes. When you write something like this:

```javascript
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <img src={this.props.imageSrc} />
    );
  }
}
```

That `img` tag you are returning inside the component is no (yet) an HTML element. That's JSX, and there's no way to reference that individual tag when it eventually gets rendered inside the user's browser until that JSX gets turned into plain and simple HTML.

So, if for some reason you need to access that node, what do you do?

You use the `ref` system:

```javascript
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }

  render() {
    return(
      <img ref={this.imageRef} src={this.props.imageSrc} />
    );
  }
}
```
Now, you can use `this.imageRef` anywhere inside your component to reference that individual `ìmg` when it gets rendered, and React will handle the rest for you! The `this.imageRef` is a javascript object that references the DOM node.

You eventually will need to wait for some event to happen to those DOM nodes, and to do that, you need to add events listeners to it, like so:

```javascript
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.addEventListener('load', this.doSomething);
  }

  doSomething = () => {
    // do something with imageRef here
  }

  render() {
    return(
      <img ref={this.imageRef} src={this.props.imageSrc} />
    );
  }
}
```

Other events are things like `"mouseover` and `"click"`. 

Notice that, in the `doSomething` method, we are using an arrow function. That's because we would have trouble with `this` context like explained in the previous topic.

### Named vs default exports

If you want to export just one function from a file, you can use a `default` export, like so:

```javascript
const myFunction = () => {
  // do something
};

export default myFunction;
```
Then you would be able to import that small function from another file:

```javascript
import myFunction from './exampleFunction'
```

Thats' a default export. Only one thing is being exported from the ./exampleFunction file.

But if you want to export multiple things, you need to do a named export:

```javascript
export const myFunction = () => {
  // do something
};
```

And import from other file using curly braces:
```javascript
import { myFunction }  from './exampleFunction'
```