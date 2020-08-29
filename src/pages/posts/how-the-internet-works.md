---
title: "How the internet works"
date: "2020-08-29"
category: how-things-work
---

The internet is a really big and complex thing. As a developer, you don't need to worry about how all the low-level infrastructure is implemented, but it's really useful (and interesting!) to know the basic stuff.

Have you ever wondered how your HTML and JavaScript files end up being delivered correctly to your user's browsers? Or how their browsers can send and request data from your servers? It's not magic, and the overall idea is really simple and intuitive.

### the internet as a service to computer applications

When a computer wants to talk with another computer in a distant part of the world, they need some kind of infrastructure in the middle which can establish this communication in some way. This infrastructure is the internet, and computers talk to each other by sending packets of data.

Ok, that's easy. But building this infrastructure and making it work properly is difficult. Network engineers commonly make this a little bit easier by splitting the problem into several parts or [layers](https://en.wikipedia.org/wiki/OSI_model). Typically, those layers are simplified into four main components:

1. Application layer
2. Transport layer
3. Network layer
4. Link layer

You can think of each of those layers as being progressively closer to the hardware. The application layer is concerned about the high-level stuff: we're talking about web servers and browsers here. The link layer is concerned with the actual electrical signals being sent via wires across the world.

As web application developers, we're more concerned with the application and transport layers of this network stack.

When developing an application that is going to be used by multiple users on different computers, you must make sure that your application can interact with this piece of infrastructure known as the Internet. In other words, it must follow some rules known as the Internet API.

Computers attached to the Internet provide this API for applications, which specifies how a program running on them can ask the Internet infrastructure to deliver some data to a specific program running on another computer attached to this network.

### the client-server architecture

The web is the most commonly used internet application. Most people confuse the web and the internet, but those two are very different things.

The internet is the physical connection between computers across the world.

The web is a specific kind of software that runs on top of the internet.

Other types of applications that run on the internet are file transfer protocols (such as FTP), email, DNS, and peer-to-peer applications.

The web is usually architectured in a client-server structure, the characteristics of which are:

- clients do not communicate directly with each other. Instead, all information must go through the server
- The server has a well-known IP address
- The server is always on
- A client can always contact the server by sending a packet to the server's IP address

### application layer protocols: HTTP

The protocol which specifies how messages being sent between computers on the internet should be structured to use the web application is HTTP ([Hypertext](https://en.wikipedia.org/wiki/Hypertext) Transfer Protocol).

Application layer protocol usually specify:

- the types of messages exchanged (request or response messages)
- the syntax of the various message types
- the meaning of the information on the fields
- rules for determining when and how a process sends messages and responds to messages

HTTP is defined at RFC 2616 and if a browser developer follows the rules of this RFC, said browser will be able to communicate with any web server that has also followed the rules of this RFC.

### communication between processes

In the jargon of operating systems, communication happens between processes. You can think of a process as a program running on a computer.

On Linux systems, you can check which processes are running on your machine by using the command `htop`.

When processes are running on the same computer, they can communicate with each other utilizing inter-process communication, using the rules defined by the operating system.

Processes running on different end-systems communicate with each other by exchanging messages across a network.

In the case of a web application, a client browser process communicates with the webserver process by sending messages via the Internet.

### sockets

We've established that any message going from one process to another on a different machine must do so by going through the network. I've also said that applications must follow the rules established by the Internet API to enable this communication to happen.

This communication happens by using a software interface called a socket.

You can think about a socket as a door. It is the interface between your application and the Internet. When your application wants to send some data to another process on the network, it must do so by following sending it though its socket and trusting that the underlying network will take care of the rest.

On the other side of this communication, the other process is going to receive this piece of data through its socket.

Referring back to the 4-layer model we've talked about before, sockets are where the application layers meet the transport layer. By doing so, the application must decide which kind of transport protocol it wants to use.

### transport services: TCP and UDP

On the other side of the socket lies a transport layer protocol, the most common two being TCP and UDP. Let's talk about those two.

The transport layer is the network layer that receives the data being sent between processes and makes sure that it will get delivered safely to the receiving socket (in the case of TCP) or at least do it's best trying to do so (UDP).

An application specifies which kind of transport layer protocol it wants to use. TCP is connection-oriented: both client and server exchange transport-layer control information with one another before application-level messages get sent. This is called handshaking, and after that, a connection is said to be established between the sockets of the two processes. This connection is full-duplex, which means that the two processes can send messages to each other over this connection at the same time.

TCP also offers a reliable data transfer service: the communicating processes can trust that TCP will deliver all data sent without error and in the proper order.

UDP is a lightweight protocol, which is a nice way of saying that it does not do much. There's no handshaking, data transfer is unreliable (provides no guarantee that the message will ever get to the receiving process and may even get there out of order).

What a worthless protocol, right? Well, UDP has its uses: video streaming, for instance. With video streaming, users are not particularly concerned with losing some packets here and there if the overall quality of the stream is good enough. Also, the handshaking which is required by the TCP protocol would add a significant overhead to each request, making TCP slower than UDP.

### addressing, or how computers find each other

An individual computer on the internet is identified by its IP address. An individual process running on that computer is identified by a port number.

Web servers typically listen on port 80 (try it: if you go to google.com:80 you will automatically be redirected to the main Google web page).

Port numbers are especially important to transport layer protocols. Since they are the ones with the task of delivering messages to individual processes, they must know on which "door" to knock on.

The IP address is more important to the network layer, which has the job of finding an individual computer connected to the Internet. The network layer lies below the transport layer and it's one of the most complex layers on the stack. This is where routers and routing algorithms come in.

### there's a lot more to it

SSL, HTTPS, SSH... There's a lot of stuff I haven't mentioned here. All those things are pretty complex and entire books have been written about them! But as a web developers, knowing at least the basics of how this stuff works is really useful.
