---
title: "A quick advice on debugging"
date: "2020-08-01"
category: misc
---

Recently I've came across a blog post by Julia Evans called [When debugging, your attitude matters](https://jvns.ca/blog/debugging-attitude-matters/). It's an excellent read and full of good advice, but one of those in particular really stuck with me:

### Learn the basics first

For me at least, most of the bugs I've had to deal with were a product of not being entirely sure about what I was doing. This could
be a weird layout issue in CSS or some obscure error log being emitted by a Java application.

Most of the time, the frustration that comes out of debugging a piece of code comes from the fact that we're missing _something_, be it some particular quirk of a programming language you're using or a configuration file you've put together by reading a bunch of tutorials. Maybe some library you are using but that you are not entirely familiar with.

I know this stuff might be obvious for more experienced developers, and this sounds like really basic advice. It all boils down to "read the docs", but that's easier said than done. Most of the time you are in a hurry to ship some feature or fix a bug. You need to deliver fast because your manager is demanding results ASAP.

In those situations, it's easy to fall into this trap of trying random things until something works. Also, it's mentally challenging (I think) to switch between "working mode" and "learning mode". When you are there programming and some arcane bug creeps in to haunt you, you will try to debug it. You log error messages to the screen, you place a bunch of breakpoints and try visualize the flow of data inside your software. But nothing seems to make sense: your code is breaking because of what looks like an unrelated library. The functions you expect to run are not being called, or maybe thery are being called with the wrong arguments. What's happening? In despair, you starting digging deeper and deeper into this mess. Hours go by and you're as clueless now as when you started. You try Stack Overflow for help, but to no avail. All hope seems lost.

If you ever had to solve some particularly nasty bug you know what I'm talking about. When this happens, I think it helps to relax, take a deep breath and be honest to yourself:

### Do I know what the heck I'm really doing here?

Be really honest. You obviously don't need to have memorized every minor idiosyncrasy of every programming language or library you're using in your code, but at least you need a good grasp of the fundamentals: What is this function returning? Is it asynchronous? Does it needs some kind of configuration before being called? Is this the right version for my development enviroment?

You may think: "This is only a minor CSS positioning issue. I just need to get this very specific thing to work. No need to read a long tutorial about flexbox or something". You start tweaking stuff and get nowhere because you don't know what you're doing.

To give you a more concrete example, recently I've been trying to set up Webpack in a personal project of mine. I've never had to configure Webpack myself before. I started trying to write a quick `webpack.config.js` file for this existing project and had a bad time doing it. I was thinking: "I just need to get this working and I don't have time to read the whole Webpack documentation. It can't be that hard, surely?". Well, it is. Things just won't work out the way you are expecting. So I decided to stop and go through the docs and learn all this stuff properly. I'm still doing it.

This advice won't fix all of your problems. Some things are just hard and have little to no documentation. But I think that most of the bugs we encounter in a day to day basis could give us a lot less headache if we just try to understand the fundamentals first. You will have less trouble and become a better developer in the process.
