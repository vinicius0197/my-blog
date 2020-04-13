---
title: "Recipes for mocking axios with Jest"
date: "2020-04-13"
category: testing
---

Earlier last week I was experimenting with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) in one of my personal projects. I wanted to write some unit tests for my Redux action creators, and those involved some basic API calls.

I'm surely not issuing real network requests for those unit tests, since making real API calls is the job of an end-to-end test framework like [Cypress](https://vcsilva.com/posts/learning-cypress/). So I needed to learn how to mock my API calls. Since I'm using `axios` for those, I needed to find a way to mock network requests using it for my tests.

Unfortunately, things turned out to not be so easy as I thought they would. Googling around I discovered a lot of different ways of doing this, some involving third-party libraries, and each one of those was doing something a little bit different from the others. Needless to say that I was confused, and had to dedicate a fair amount of time for debugging until I've finally found a way to make it work.

Since mocking API calls is a very common task when writing unit tests (and even some integration tests), I decided to write a simple guide of how to set this up with React and Redux to make this process as straightforward as possible.

### What I'm using
For these examples, I will be using React Testing Library and Jest as a test runner. I'm assuming you will be writing unit tests for a React/Redux app.

### Configuring your axios instance
When using `axios` it's common to create an `axios` instance with some initial configuration and export it to be used by other components within your app. You would create a new instance of axios with custom configuration like so:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://example-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

In my own apps, I would create this custom configuration in a file called `index.js` within a `/src/api` folder. Now, instead of using axios itself when making API calls, I would import and use this custom instance.

### Creating a `__mocks__` directory
Jest, the test-runner that comes with `create-react-app`, already comes with support for mocking JavaScript modules. To do that, all you need to to is create a `/__mocks__` folder adjacent to the `/node_modules` folder and put your mock files inside it.

In our case, we don't want to mock `axios` itself, but the instance we've created in the previous step. So, inside `__mocks__` you can create a file called `api.js`, where we are going to write our mock code. Whenever you run your test suite, Jest will look for mocks inside this folder and use them instead of the original modules.

### Writing our mock code
Now that we've configured everything, we need to write some actual code for mocking our API requests. Remember how you would make a `get` request using pure axios?

```javascript
// Making a GET request for the '/user' endpoint and sending a params object
axios.get('/user', {
    params: {
      ID: 52
    }
  })
```
As you can see, `axios` exposes a `get` function that we can use to make HTTP requests. But now in our tests, `axios` won't be called. Instead, Jest will use the file that we created at `__mocks__/api.js`, and right now, this file is empty! If you try to run your test suite right now, Jest would say that the `get` function is undefined.

So, looks like we need to define it. Inside `__mocks__/api.js` we shoud use Jest built-in `jest.fn()` function to mock all the function from the `axios` module that we use in our production code. For the purposes of this article, let's say that we are issuing both `GET` and `POST` requests.

Our code would look something like this:

```javascript
export default {
  get: jest.fn().mockResolvedValue(
    { data: {} }
  ),
  post: jest.fn().mockResolvedValue(
    { data: {} }
  ),
  create: jest.fn().mockResolvedValue()
};
```

Notice that we are also mocking the `create` function that we used to instantiate axios with custom configuration.

Now, whenever we issue `GET` and `POST` requests from our test suite, Jest will call those function defined here instead and return the values inside `mockResolvedValue()`. Inside your individual test files, you can tailor those mocked responses to best suit your needs. But here we keep it straightforward since this is the default response for every `get` and `post` function that will be called.

### Writing custom responses

It's nice to have those default respones that we've defined above, but for different tests we might want to have different kinds of responses. Luckly for us, that's pretty easy to do.

Imagine that we want to test a component called `PostsContainer` who renders a list of posts from some API. We want to make sure that our component is calling the API and rendering the posts received via a `GET` request. By using **React Testing Library** we could do something like this:

```javascript
/* As mentioned, Jest will call our mock module instead of the real axios module when we run our test.
  To make that obvious to anyone reading the code, we call it *mockAxios* here and import our custom instance
  from the __mocks__/api.js file that we've created
*/
import mockAxios from 'api';

it('renders posts from API', async () => {
  // Notice here we are using a custom response for the get function
  mockAxios.get.mockResolvedValueOnce({ data:
    [{ projectName: 'project 1' }, { projectName: 'project 2' }]
  });

  const { findAllByTestId } = render(<PostsContainer />);

  const posts = await findAllByTestId('post-item');
  expect(posts).toHaveLength(2);
  expect(mockAxios.get).toHaveBeenCalledWith('/posts');
});
```