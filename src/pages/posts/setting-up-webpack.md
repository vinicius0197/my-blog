---
title: "Why you should learn webpack"
date: "2020-08-08"
category: web-development
---

Last week I was working on a Chrome extension and found the need to install some `npm` modules on my project. It was a very small project, but I wasn't
using any type of framework or starter-project, and it was the first time ever that I needed to think deeply about how my web-based projects are built by bundlers like `webpack`.

Most of the React projects I've worked with in the past used something like [create-react-app](https://github.com/facebook/create-react-app), which includes a bunch of configuration for stuff like `babel` and `webpack` so that you don't need to worry about those. This is all great stuff, but sometimes you _do need_ to worry about those. In my case, I needed a bundle javascript file for my Chrome application, and someone suggested that I use webpack for that.

### The basics of webpack are very simple

Webpack is just a tool that searches for an entry Javascript file and creates a dependency tree based on all of your `require()` statements. As output, it produces a single `bundle.js` file. So, even if your project has dozens or even hundreads of Javascript files, your end users will have to download a single file.

It bundles vendor code as well. If you require any `npm` modules from within your application, those will be bundled as well.

Webpack can do a bunch of other stuff as well: it can bundle CSS files, images... It can do code-splitting and minify your files. But the basic goal is just to bundle all of your files.

### Start with simple projects

That being said, webpack can get really confusing really fast. It has a bunch of configuration options, plugins, loaders...Sometimes you need to download additional packages just to run into version errors (this bit really frustrates me. You have to install many packages and make sure that all the versions support each other).

So, I wouldn't recommend you to start by trying to configure a whole complex project with a lot of dependencies and assets. Take something easier first and build your way up.

Fortunately, my Chrome extension was very simple. Basically I just needed to bundle the extension code together with some `npm` modules and produce a `background.js` file.

### How to install webpack

To install the latest version of webpack:

```
npm install --save-dev webpack
```

### The basic structure of a config file

You will need config file so that webpack knows what to do. This file must be named `webpack.config.js` and it needs to export an object with those properties:

```javascript
// webpack.config.js
const path = require("path")

module.exports = {
  entry: "path/to/entry",
  output: {
    path: path.join(__dirname, "output_folder"),
    filename: "bundle.js",
  },
}
```

And that's it. That's the bare minimum of configuration you need. Just an entry point (if you think of your project as a big dependency tree, this is the root of the tree) and an object which specifies where to write the output file and which name to give to it (_bundle.js_ in this case).

_Obs: if you are confused about the `__dirname`, this is just the directory in which the executing file is located_

### What about loaders?

By default, webpack understands just JavaScript and JSON files. Most web applications need more than that. For instance, what about CSS files? If you've ever used React, you've probably imported CSS files into your javascript files.

To solve that, webpack has the concept of **loaders**. Those loaders preprocess files, allowing you to bundle any static resource. There's a _lot_ of loaders out there (check this [awesome-list](https://github.com/webpack-contrib/awesome-webpack#loaders) to check some of those). There are loaders for CSS files, for babel transpiling, SVGs, etc...

You can even write your own loaders and further extend what webpack can do.

Most React projects will need loaders for CSS files and for babel-transpiling (so that you can use advanced JavaScript features in your code). You need to install those loaders as dependecies of your project and add them to your `webpack.config.js` file.

For instance, this is how you would setup the [css-loader](https://webpack.js.org/loaders/css-loader/) module:

```javascript
// webpack.config.js
module.exports = {
  // ... same as before
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}
```

Whoa, things just got confusing, right? What's happening here?

This is where I think most of the confusion around webpack comes from. It's a very modularized project, and to do one very specific stuff (bundling CSS files) you actually need two loaders. The `css-loader` loader reads a line of code like `require('file.css')` and returns the CSS. `style-loader` then kicks in and inserts the returned CSS into a `<style>` tag at runtime.

To define these operations, we need to declare the `module` object. This is where we define the "rules" for each and every one of our loaders. The `test` field is a regex expression which checks for CSS files, and the `use` key is a list with the loaders we want to apply to those files.

_Also, remember that loaders are applied right to left. So `css-loader` will be applied first, and then `style-loader`_

When you start to think of every step of the bundling process in a modularized way things get a little bit clearer with webpack, but you can already see how it could get really confusing in a bigger project with lots of loaders and dependencies.

### Plugins are used to perform bigger tasks

Apart from loaders, webpack also supports plugins. While loaders are very specific (the CSS loaders just take care of CSS files and nothing else), plugins are used to perform bigger tasks, like optimization and generating files. A very common use case for plugins is generating a single HTML to load the `bundle.js` file:

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  // ... same as before
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
}
```

The `html-webpack-plugin` generates an `index.html` file and automatically injects your generated bundles. You can check out other plugins [here](https://webpack.js.org/concepts/plugins/).

### Understand how your project is built

Tools like `create-react-app`, albeit very useful, hide a lot of stuff from the developer. Even if you don't get to manually configure all of your build process, it's very useful to understand the "magic" behind it. In the end, it's just really ordinary JavaScript and HTML being deployed to your user's browser.

This post covers just the very basics of webpack. Almost everything you do with it will end up inside ony of those categories (entry points, outputs, loaders and plugins). There's some really interesting applications of code-splitting and optimization that webpack does very well, but we can talk explore those in another post.
