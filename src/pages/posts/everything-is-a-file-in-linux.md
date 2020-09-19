---
title: "Everything is a file in Linux"
date: "2020-09-19"
category: linux
---

If you've ever used any kind of Linux or Unix operating system, you are probably familiar with the idea that "everything is a file" in those systems.

Some of the things that are considered files in Unix systems are:

- Directories
- Serial ports
- Hard drives
- Partitions
- Printers
- Sockets

That's a strange concept coming from other operating systems such as Windows, where files are just things like Excel documents, images, videos....

### what does this really means?

Actually, what this statement actually says is that everything is a "stream of bytes", which you can access through the filesystem.

In practice, this means that every IO operations uses the file system in some way, by means of something called a "file descriptor".

File descriptors are used for a lot of things: reading files and directories, devices, network communication... You can think of file descriptors as just numbers that the operating system uses to index open files on your computer.

The advantage of having everything on your system being represented by a file is that you can have just one protocol to interface with a bunch of very different things, thus making your life easier. This also allows for better interoperability.

### different types of files

If you navigate to some folder in your Linux machine (that contains some mix of basic text files and directories) and run the command `ls -l`, you will see something like this:

```jsx
-rw-rw-r--    1 user user     96 ago 10 23:36 file.csv
drwxrwxr-x    3 user user   4096 set 11 16:26 folder
```

The `ls -l` command causes `ls` to print files in a long listing format. The first character this command gives you is the file type, followed by nine characters representing the file permissions. The first character can be any of the following:

- `-` - Regular file
- `b` - Block file
- `c` - Character file
- `d` - Directory
- `l` - Symbolic link
- `n` - Network file
- `p` - FIFO
- `s` - Socket

As you can see from the output, I have a simple `.csv` file that is just a regular file, what my `/folder` directory is still a file, but of type directory.

### processes are also represented as files

More interesting is that processes running on your machine are represented as files too. You can check that by yourself by starting any process on the background (by using the ampersand `&` at the end of the command). For instance, I'm going to run the Vim on the background:

```bash
root@vinicius:~# vim &
[4] 822091
```

This command returns the PID for this process, a number that uniquely identify this particular process.

Now you can navigate to the `/proc` filesystem. `/proc` is really weird because it's just a virtual filesystem (it does not exist on disk!). But it's meant to represent all the running processes on your machine.

Here, each running process is represented by a folder. Since our instance of Vim is running with PID 822091, we can run `cd 822091` and navigate to a directory which contains information about this process in particular.

By running `ls -l` inside this directory, you will notice that there are a lot of files in there:

```bash
-r--r--r-- 1 root root 0 set 19 14:44 arch_status
dr-xr-xr-x 2 root root 0 set 19 14:44 attr
-rw-r--r-- 1 root root 0 set 19 14:44 autogroup
-r-------- 1 root root 0 set 19 14:44 auxv
-r--r--r-- 1 root root 0 set 19 14:44 cgroup
--w------- 1 root root 0 set 19 14:44 clear_refs
-r--r--r-- 1 root root 0 set 19 14:44 cmdline
-rw-r--r-- 1 root root 0 set 19 14:44 comm
-rw-r--r-- 1 root root 0 set 19 14:44 coredump_filter
-r--r--r-- 1 root root 0 set 19 14:44 cpuset
lrwxrwxrwx 1 root root 0 set 19 14:44 cwd -> /root
-r-------- 1 root root 0 set 19 14:44 environ
lrwxrwxrwx 1 root root 0 set 19 14:38 exe -> /usr/bin/vim.basic
dr-x------ 2 root root 0 set 19 14:44 fd
dr-x------ 2 root root 0 set 19 14:44 fdinfo
-rw-r--r-- 1 root root 0 set 19 14:44 gid_map
```

This means that processes are transparent for the user, and you can use the same set of tool to manipulate both simple `.csv` file as well as running processes. That's the power of the "everything is a file" philosophy of Unix systems.

### there's much more to it

I think that the concept of everything being some kind of file is really cool. It starts making a lot of sense when your start learning more about it and finding out all the tricks you can do with it.
