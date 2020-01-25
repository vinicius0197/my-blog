---
title: "Using SVGs in your React app"
date: "2020-01-25"
---
SVGs are really great. They are easy to use and are commonplace in most web apps nowadays. But there are a lot of options for adding them to your application when you use a framework like React, for instance.

## What does an SVG looks like?

Different than most image formats, SVG is a document that you can open in your text editor. It looks something like this:
```javascript
<svg height="100" width="100">
  <circle 
    cx="50" cy="50" r="40"
    stroke="black"
    stroke-width="3"
    fill="red" />
</svg>
```

See? You can edit your SVG files and embed them in web pages so your browser can render them!

## Creating Components to render SVG

The first option for adding SVG icons in your app is by rendering the SVG document as it is. So you could build a React component that renders the pure SVG document:
```javascript
const SVGIcon = () =>
<svg height="100" width="100">
  <circle
    cx="50" cy="50" r="40"
    stroke="black"
    stroke-width="3"
    fill="red" />
</svg>;
```
Now `SVGIcon` is a normal component that you can pass props to and render normally in your web application. 

## Using <img> tags

Another option would be to use a vanilla `<img>` tag like this:
```javascript
const SVGIcon = () =>
<img src="./assets/example.svg" />;
```
While it's simpler that pasting the entire SVG code into your web app, notice that you can't manipulate this component so easily (i.e you can't add styling using CSS for filling colors). 

## Using SVGs in Create-React-App

Using `create-react-app`, you can import an SVG as a component the following way:
```javascript
import { ReactComponent as SVGIcon } from './assets/example.svg';
```
This way, you can treat that SVG as a normal React component. It's really easy, and you can also style it using `styled-components`:
```javascript
const MyIcon = styled(SVGIcon)`
  heigth: 100px;
  width: 100px;
  fill: red;
`;
```
## Problems that you might encounter when dealing with SVGs

If you can't change the size of your SVG by using CSS styling (such as the `styled-components` styling above) then you should check your SVG document and verify if it contains hard-coded height and width attributes. You can delete these attributes or set them to "100%" if you want to set the size using CSS.