---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Hosting an Express API on Netlify'
pubDate: 2025-03-18
description: 'Updating an existing Express API to Netlify serverless functions.'
author: 'Tabrez Akhtar'
tags: ["Node", "Express", "Netlify"]
---
I've been experimenting with serverless functions and wondering if it's possible to host an entire Node.js Express API with them.

Serverless functions are designed for small, self-contained endpoints and execute on demand in response to events.

I created this simple example to evaluate whether they could work for an Express API.

**Spoiler:**
Here is the completed API and example app:

[Completed API Demo](https://peaceful-pika-08cbe4.netlify.app/.netlify/functions/server/recipes/)
**([Source Code](https://github.com/tabrezakhtar/netlify-api-demo))**

[Simple Front End Demo](https://resilient-daifuku-4beeb8.netlify.app/)

In my use case, I have a small, low-traffic API where the UI is hosted on another server. I was looking for the following features in the completed app:

- Easy deployment
- The ability to develop locally in Node.js/Express but deploy as serverless functions
- A cheap or free tier available

This is what the structure of my Express app looks like:
```
.
├── data
│   └── recipes.json
├── package.json
├── routes
│   ├── index.js
│   └── recipes.js
└── server.js
```
The data is stored in a JSON file.  The recipes route loads and filters by ingredients:

`(recipes.js)`
<pre style="border: 2px solid rgb(39 128 129); padding: 10px; font-family:monospace;color: rgb(201, 209, 217); background-color: rgb(13, 17, 23); font-weight: 400; "><span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> recipes = <span style="color: rgb(255, 166, 87); font-weight: 400;">require</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"../data/recipes.json"</span>);
<span style="color: rgb(255, 123, 114); font-weight: 400;">async</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">function</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">getAll</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;">req, res</span>) {
  res.<span style="color: rgb(210, 168, 255); font-weight: 400;">json</span>(recipes);
}
<span style="color: rgb(255, 123, 114); font-weight: 400;">async</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">function</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">getByIngredient</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;">req, res</span>) {
  <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> { ingredient } = req.<span style="color: rgb(201, 209, 217); font-weight: 400;">query</span>;
  <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> filteredRecipes = recipes.<span style="color: rgb(210, 168, 255); font-weight: 400;">filter</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;">(<span style="color: rgb(201, 209, 217); font-weight: 400;">recipe</span>) =&gt;</span> {
    <span style="color: rgb(255, 123, 114); font-weight: 400;">return</span> recipe.<span style="color: rgb(201, 209, 217); font-weight: 400;">ingredients</span>.<span style="color: rgb(210, 168, 255); font-weight: 400;">includes</span>(ingredient);
  });
  res.<span style="color: rgb(210, 168, 255); font-weight: 400;">json</span>(filteredRecipes);
}
<span style="color: rgb(255, 123, 114); font-weight: 400;">module</span>.<span style="color: rgb(201, 209, 217); font-weight: 400;">exports</span> = { getAll, getByIngredient };</pre>


`server.js` then loads the routes and starts the server:

`(server.js)`

<pre style="border: 2px solid rgb(39 128 129); padding: 10px; font-family:monospace;color: rgb(201, 209, 217); background-color: rgb(13, 17, 23); font-weight: 400; "><span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> express = <span style="color: rgb(255, 166, 87); font-weight: 400;">require</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"express"</span>);
<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> app = <span style="color: rgb(210, 168, 255); font-weight: 400;">express</span>();
<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> port = <span style="color: rgb(121, 192, 255); font-weight: 400;">3000</span>;
<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> apiRoutes = <span style="color: rgb(255, 166, 87); font-weight: 400;">require</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"./routes"</span>);
app.<span style="color: rgb(210, 168, 255); font-weight: 400;">use</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"/recipes/"</span>, apiRoutes);
<span style="color: rgb(139, 148, 158); font-weight: 400;">// Start the server</span>
app.<span style="color: rgb(210, 168, 255); font-weight: 400;">listen</span>(port, <span style="color: rgb(201, 209, 217); font-weight: 400;">() =&gt;</span> {
    <span style="color: rgb(255, 123, 114); font-weight: 400;">console</span>.<span style="color: rgb(210, 168, 255); font-weight: 400;">log</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">`Server running at http://localhost:<span style="color: rgb(201, 209, 217); font-weight: 400;">${port}</span>`</span>);
});</pre>


Since I need to run the app locally and as serverless functions, the starting of the server needs to be split from creating the server.  I moved the creating server code to a folder called `express`

`express/server.js`

<pre style="border: 2px solid rgb(39 128 129); padding: 10px; font-family:monospace;color: rgb(201, 209, 217); background-color: rgb(13, 17, 23); font-weight: 400; "><span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> express = <span style="color: rgb(255, 166, 87); font-weight: 400;">require</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"express"</span>);
<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> app = <span style="color: rgb(210, 168, 255); font-weight: 400;">express</span>();
<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> apiRoutes = <span style="color: rgb(255, 166, 87); font-weight: 400;">require</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"../routes"</span>);
app.<span style="color: rgb(210, 168, 255); font-weight: 400;">use</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"/recipes/"</span>, apiRoutes);
<span style="color: rgb(255, 123, 114); font-weight: 400;">module</span>.<span style="color: rgb(201, 209, 217); font-weight: 400;">exports</span> = app;</pre>


Then in the main file, `index.js` is imported and the server is created:
<pre style="border: 2px solid rgb(39 128 129); padding: 10px; font-family:monospace;color: rgb(201, 209, 217); background-color: rgb(13, 17, 23); font-weight: 400; "><span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> app = <span style="color: rgb(255, 166, 87); font-weight: 400;">require</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"./express/server"</span>);
<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> port = <span style="color: rgb(121, 192, 255); font-weight: 400;">3000</span>;
app.<span style="color: rgb(210, 168, 255); font-weight: 400;">listen</span>(port, <span style="color: rgb(201, 209, 217); font-weight: 400;">() =&gt;</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">console</span>.<span style="color: rgb(210, 168, 255); font-weight: 400;">log</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">`Running server on port <span style="color: rgb(201, 209, 217); font-weight: 400;">${port}</span>`</span>));</pre>


Now running `node index.js` will start the server as usual for local development.

The server that sets up the routes needs to export the express app as a server function.  This is easy to do with the [serverless-http](https://www.npmjs.com/package/serverless-http) package.

`(express/server.js)`
<pre style="border: 2px solid rgb(39 128 129); padding: 10px; font-family:monospace;color: rgb(201, 209, 217); background-color: rgb(13, 17, 23); font-weight: 400; "><span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> express = <span style="color: rgb(255, 166, 87); font-weight: 400;">require</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"express"</span>);
<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> serverless = <span style="color: rgb(255, 166, 87); font-weight: 400;">require</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"serverless-http"</span>);
<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> app = <span style="color: rgb(210, 168, 255); font-weight: 400;">express</span>();
<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> apiRoutes = <span style="color: rgb(255, 166, 87); font-weight: 400;">require</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"../routes"</span>);
app.<span style="color: rgb(210, 168, 255); font-weight: 400;">use</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"/recipes/"</span>, apiRoutes);
app.<span style="color: rgb(210, 168, 255); font-weight: 400;">use</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"/.netlify/functions/server/recipes"</span>, apiRoutes);
<span style="color: rgb(255, 123, 114); font-weight: 400;">module</span>.<span style="color: rgb(201, 209, 217); font-weight: 400;">exports</span> = app;
<span style="color: rgb(255, 123, 114); font-weight: 400;">module</span>.<span style="color: rgb(201, 209, 217); font-weight: 400;">exports</span>.<span style="color: rgb(201, 209, 217); font-weight: 400;">handler</span> = <span style="color: rgb(210, 168, 255); font-weight: 400;">serverless</span>(app);</pre>


The routes are then redirected to `.netlify/functions` which is an endpoint where serverless functions can be accessed.

The last thing to do is to let Netlify know that this code contains serverless functions.  This is done by adding a `netlify.toml` file in the root.

`(netlify.toml)`

```
[build]
  command = "npm install && npm run build"
  functions = "functions"
```
BTW - TOML is yet another file format for configuration files, similar to YAML🤷

This what the final folder structure looks like now:
```
.
├── README.md
├── data
│   └── recipes.json
├── express
│   └── server.js
├── index.js
├── netlify.toml
├── package.json
├── public
│   └── test.txt
└── routes
    ├── index.js
    └── recipes.js

```
For some reason, the deployment failed because of a missing `public` folder so I just added that with a text file inside.

And that's it!  To deploy, I connected the GitHub repo to Netlify and it deployed automatically.

<video width="550px" controls>
  <source src="/assets/video/express.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

I think hosting an entire Express API this way is fine for low-traffic/hobby web applications.  It's nice to have the choice as well to deploy to a web server later on without needing to modify the code. The downside is that it won't work for servers that need to be always on, e.g. if WebSockets are required.

While I was creating the demo app, I discovered [Hono](https://hono.dev/), a framework built specifically for edge computing environments.  There is an excellent video on using HonoJS [here](https://www.youtube.com/watch?v=hMcE6E8JjXA).
