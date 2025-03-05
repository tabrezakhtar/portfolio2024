---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Refreshing my outdated React project'
pubDate: 2022-07-01
description: 'Simplifying Without Sass or Redux.'
author: 'Tabrez Akhtar'
image:
    url: '/assets/img/blog/fotis-fotopoulos-DuHKoV44prg-unsplash.jpg'
    alt: 'Background image of code.'
tags: ["astro", "blogging", "learning in public"]
---
# My First Blog Post
Welcome to my _new blog_ about learning Astro! Here, I will share my learning journey as I build a new website.

## What I've accomplished

1. **Installing Astro**: First, I created a new Astro project and set up my online accounts.

2. **Making Pages**: I then learned how to make pages by creating new `.astro` files and placing them in the `src/pages/` folder.

3. **Making Blog Posts**: This is my first blog post! I now have Astro pages and Markdown posts!

## What's next

I will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.

<pre style="font-family:monospace;color: rgb(201, 209, 217); background-color: rgb(13, 17, 23); font-weight: 400; "><ol style="padding-left: 3em;"><li><span style="color: rgb(255, 123, 114); font-weight: 400;">function</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">TodoItem</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;">{ task, deleteTask, toggleCompleted }</span>) {</li><li>  <span style="color: rgb(255, 123, 114); font-weight: 400;">function</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">handleChange</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;"></span>) {</li><li>    <span style="color: rgb(210, 168, 255); font-weight: 400;">toggleCompleted</span>(task.<span style="color: rgb(201, 209, 217); font-weight: 400;">id</span>);</li><li>  }</li><li></li><li>  <span style="color: rgb(255, 123, 114); font-weight: 400;">return</span> (</li><li>    <span style="color: rgb(201, 209, 217); font-weight: 400;"><span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;<span style="color: rgb(126, 231, 135); font-weight: 400;">div</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">className</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">"todo-item"</span>&gt;</span></span></li><li>      <span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;<span style="color: rgb(126, 231, 135); font-weight: 400;">input</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">type</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">"checkbox"</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">checked</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">{task.completed}</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">onChange</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">{handleChange}</span> /&gt;</span><span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;<span style="color: rgb(126, 231, 135); font-weight: 400;">p</span>&gt;</span>{task.text}<span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;/<span style="color: rgb(126, 231, 135); font-weight: 400;">p</span>&gt;</span><span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;<span style="color: rgb(126, 231, 135); font-weight: 400;">button</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">onClick</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">{()</span> =&gt;</span> deleteTask(task.id)}&gt;X<span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;/<span style="color: rgb(126, 231, 135); font-weight: 400;">button</span>&gt;</span></li><li>    <span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;/<span style="color: rgb(126, 231, 135); font-weight: 400;">div</span>&gt;</span></li><li>  );</li><li>}</li><li></li><li><span style="color: rgb(255, 123, 114); font-weight: 400;">export</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">default</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">TodoItem</span>;</li></ol></pre>
