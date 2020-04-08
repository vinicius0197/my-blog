---
title: "Cypress is a really nice testing tool"
date: "2020-04-08"
category: testing
---

I've been learning a lot about Javascript testing during those last few weeks. One of the projects I'm working on is a React/Redux web-app and I thought it would be a good idea to use it to learn some good practices on testing front-end apps.

I've had already dabbled a little bit with **Jest** and **Enzyme** previously, and my first experience wasn't exactly pleasing. Enzyme has three ways of rendering a component (static, shallow and full-dom), and if you take a look at its documentation you will notice that the API for dealing with those components is really big. Needless to say that I was really lost and didn't find it intuitive at all at first glance.

That's when I've found about this tool called Cypress from a tweet by Kent C. Dodds:

<div class="center">
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">&quot;The Testing Trophy&quot; 🏆<br><br>A general guide for the **return on investment** 🤑 of the different forms of testing with regards to testing JavaScript applications.<br><br>- End to end w/ <a href="https://twitter.com/Cypress_io?ref_src=twsrc%5Etfw">@Cypress_io</a> ⚫️<br>- Integration &amp; Unit w/ <a href="https://twitter.com/fbjest?ref_src=twsrc%5Etfw">@fbjest</a> 🃏<br>- Static w/ <a href="https://twitter.com/flowtype?ref_src=twsrc%5Etfw">@flowtype</a> 𝙁 and <a href="https://twitter.com/geteslint?ref_src=twsrc%5Etfw">@geteslint</a> ⬣ <a href="https://t.co/kPBC6yVxSA">pic.twitter.com/kPBC6yVxSA</a></p>&mdash; Kent C. Dodds 🧑‍🚀 (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/960723172591992832?ref_src=twsrc%5Etfw">February 6, 2018</a></blockquote>
</div>

The main idea of end-to-end testing is to give you confidence that your software is working correctly across the whole stack: databases, UI, backend services... Those tests are slower than unit tests, but they give you greater confidence because they test if things are working well together.

I have used Selenium (briefly) in the past for automating browsers and performing some basic end-to-end tests, so I decided to check on Cypress. I really liked what I saw. Cypress has really good [documentation](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) and tutorials, so it was really easy to learn how to use it and start testing my apps.

The cool thing is that things just *work*. You don't have to write a lot of code to have a nice test suit that covers a lot of functionality of your web app. And I think that a lot of this comes from Cypress design philosophy.

Now, I know that Enzyme and Cypress are meant for different things. You would use Cypress for bigger, slower end-to-end tests (and maybe even integration tests) and leave unit and components tests for something like Enzyme (or React Testing Library, written by Kent C. Dodds himself), where you have fine control over a component behavior. Even so, Cypress is much nicer to use than most testing tools out there that I've experimented with and I think it's a great start for learning how to tests web apps.

### The Cypress philosophy and design

The Cypress team states that their philosophy is creating a testing tool that is consistent and performs identically from one run to the next. To achieve this goal, they've actually implemented a lot of stuff in a way that, at first glance, can be a little strange for experienced JavaScript developers. But I think that the end result is very neat and the design decisions seem appropriate.

In a nutshell, Cypress is built in a way to prevents flakes. A flaky test is one that fails to produce the same result each time the analysis is run. Asynchronous code is a big source of flaky test results and headaches for developers.

Another thing that I like about Cypress: it comes with a really good [test runner](https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview). It allows for a pleasant development experience and nice debugging features. 

### Cypress uses chain of commands

Reading Cypress code is very simple. It uses simple commands to take action as a end-user would do in your application. Take the following code snippet:

```javascript
cy.get('.container')
  .find('.post-title')
  .click()
```

In this example, Cypress would try to find an element in the DOM that has class `container` and, within it, another element with class `post-title`, and then proceed to click this element. As you can see, you can chain those commands together to perform more complex tasks.

### Commands run asynchronously

But that doesn't mean that the commands run will run in parallel. Your test function will be executed and the commands enqueued to be run when Cypress starts the browser automation. In practice, it means that if you want to run synchronous code with Cypress, you should chain it using `.then()`. 

I think that the way Cypress expresses those commands is very clean and simple to write. Take a look at the following code snippets (straight from the Cypress docs):

```javascript
// Invalid Code -> using Promises
it('changes the URL when "awesome" is clicked', function() {
  // THIS IS NOT VALID CODE.
  // THIS IS JUST FOR DEMONSTRATION.
  return cy.visit('/my/resource/path')
  .then(() => {
    return cy.get('.awesome-selector')
  })
  .then(($element) => {
    // not analogous
    return cy.click($element)
  })
  .then(() => {
    return cy.url()
  })
  .then((url) => {
    expect(url).to.eq('/my/resource/path#awesomeness')
  })
})
```

And now:

```javascript
// actual Cypress code
it('changes the URL when "awesome" is clicked', function() {
  cy.visit('/my/resource/path')

  cy.get('.awesome-selector')
    .click()

  cy.url()
    .should('include', '/my/resource/path#awesomeness')
})
```

The first example uses promises the way you are used to. But Cypress actually hides all of this complexity and allow us to write much more readable tests, and way quicker as well.

### It uses default assertions

You don't need to explicitly write a lot of assertions on your test for it to be useful. Cypress has [default assertions](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Default-Assertions), which are built in many of the most common commands you are going to use.

### You can also create integration tests

Cypress is usually used for end-to-end tests, but you can also [stub HTTP requests](https://docs.cypress.io/guides/guides/network-requests.html#Testing-Strategies) and create integration tests as well. 

### How to organize your test files
For each new functionality on your app, you create a new `.spec.js` file. Example: you can create a spec for your web app header, another one for the login page, for adding comments, etc...

Now, you try to organize your specs by folder. Make each folder represent some kind of primary data object (like post, article, user...). One good tip is also creating a folder called `/shared` for everything else that doesn't fit or that is shared between pages of your web app.

In Cypress, you can create [custom commands](https://docs.cypress.io/api/cypress-api/custom-commands.html). Those are really useful for performing repetitive tasks that are needed for different parts of your website, like logging in. Create those in a `/support` folder. You should also have a `index.js` file within this folder to import all the custom commands you've written for your test suite. 

All in all, your test folder will look something like this:

```
/cypress
  /fixtures
  /integration
  /plugins
  /screenshots
  /support
```