---
title: "How to use git cherry-pick"
date: "2021-11-05"
category: git
---

The `cherry-pick` command from git has lots of uses, but my favorite one is "extracting" a single commit from another developer's working branch. This is useful when you need access to a piece of code that only exists on a work-in-progress branch but that is not yet merged on the main branch.

In this situation, you could potentially create a branch out of your friend's working branch to use that piece of code, but you would be carrying over a lot of code that is not relevant to your task. Let me give you an example using Ruby.

You and your friend are both working on a new image editor feature for a website. You are responsible for developing a cropping feature and your friend will be working on a resizing feature. Both of you start your own working branches out of the main branch and start working.

Soon you realize that you first need to upload some images into the website before you can start cropping them. Luckily, your friend's branch has a class that does exactly that:

```ruby
class ImageUploader
	# Code for uploading a image
end
```

Instead of writing your image uploader class, you could just use the one that exists on your friend's branch. This is when `cherry-pick` comes in handy. You don't need all the image resizing code that exists on that branch. You just need the commit that creates that specific `ImageUploader` class.

So essentially `cherry-pick` allows you to extract a single commit out of that branch. This is how you do it:

First, checkout your friend's branch with `git checkout <your_friend_branch_here>` . The next step is finding the git SHA hash for the specific commit which introduces the `ImageUploader` class. You can use git log to see all recent commits on that branch, together with their respective SHA hash. Once you find it, copy the hash.

Now go back into your own branch and use the following command:

```bash
git cherry-pick <commit-hash-here>
```

And that's it. You will notice that you have copied your friend's commit into your branch and you will be able to use the `ImageUploader` class on your own code from now on.

A side note: for cherry-picking to be useful on those situations your team must work with self-contained commits. This way you can just grab the specific code that you need.
