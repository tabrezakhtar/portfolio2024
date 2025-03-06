---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Spring cleaning my React project'
pubDate: 2025-03-05
description: 'Simplifying Without Sass or Redux.'
author: 'Tabrez Akhtar'
tags: ["React", "Redux", "BeerCSS"]
---
I wrote this Tennis score keeper app about 5 years ago in React and Redux and decided to give it a refresh.
<img src="/assets/img/whatsthescore.png" alt="Old version of whatsthescore app" width="200">

There were a few issues with my existing project:

- I used create-react-app for the front end tooling and it is now [deprecated.](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) 
- Node-sass is deprecated and the project gives an error when starting.
- The API for Redux had changed.

My goal for the refresh was to remove the dependency for Sass and Redux.  I don't mind using them but don't think they are necessary for this project.
<br /><br />
## Create-react-app alternative

The recommended alternative is [Vite](https://vite.dev) so I installed it and created a new project.
<img src="/assets/img/blog/new-vite.png" alt="Installing a new Vite project" width="600">

## Migrating old code

Rather than upgrading the existing project, in this case it was simpler to just copy code across  to the new project. Next, Sass and all CSS styles were removed. Then, all Redux reducers (and their calls) were commented out. Also I updated React Router.  This enabled the project to run without errors.
<img src="/assets/img/blog/whatsthescore-nostyle.png" alt="Screenshot of app with styles removed" width="250">

Instead of Redux, I wanted to just use the Context API which is built into React.  Theres a nice guide [here](https://react.dev/learn/scaling-up-with-reducer-and-context#step-3-use-context-anywhere-in-the-tree) on how to use it to manage state.

I converted `MenuReducer` first as its the smallest reducer.

*This is what looked like before with Redux:*
<pre style="font-family:monospace;font-size:medium;color: rgb(201, 209, 217); background-color: rgb(13, 17, 23); font-weight: 400; "><span style="color: rgb(139, 148, 158); font-weight: 400;">// menuReducer.js</span>
<span style="color: rgb(255, 123, 114); font-weight: 400;">export</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> initialState = {
  <span style="color: rgb(121, 192, 255); font-weight: 400;">selected</span>: <span style="color: rgb(121, 192, 255); font-weight: 400;">false</span>
}

<span style="color: rgb(255, 123, 114); font-weight: 400;">export</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">default</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">function</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">menuReducer</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;">state = initialState, action</span>) {
  <span style="color: rgb(255, 123, 114); font-weight: 400;">switch</span> (action.<span style="color: rgb(201, 209, 217); font-weight: 400;">type</span>) {
    <span style="color: rgb(255, 123, 114); font-weight: 400;">case</span> <span style="color: rgb(165, 214, 255); font-weight: 400;">'TOGGLE_MENU'</span>:
      <span style="color: rgb(255, 123, 114); font-weight: 400;">return</span> { 
        ...state,
        <span style="color: rgb(121, 192, 255); font-weight: 400;">selected</span>: action.<span style="color: rgb(201, 209, 217); font-weight: 400;">payload</span>
      }
    <span style="color: rgb(121, 192, 255); font-weight: 400;">default</span>:
      <span style="color: rgb(255, 123, 114); font-weight: 400;">return</span> state
  }
}
</pre>
*This is afterwards with the Context API:*
<pre style="font-family:monospace;font-size:medium;color: rgb(201, 209, 217); background-color: rgb(13, 17, 23); font-weight: 400; "><span style="color: rgb(139, 148, 158); font-weight: 400;">//menuContext.js</span>
<span style="color: rgb(255, 123, 114); font-weight: 400;">import</span> { createContext, useContext, useState } <span style="color: rgb(255, 123, 114); font-weight: 400;">from</span> <span style="color: rgb(165, 214, 255); font-weight: 400;">"react"</span>;
<span style="color: rgb(255, 123, 114); font-weight: 400;">import</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">PropTypes</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">from</span> <span style="color: rgb(165, 214, 255); font-weight: 400;">"prop-types"</span>;

<span style="color: rgb(255, 123, 114); font-weight: 400;">export</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> initialState = {
  <span style="color: rgb(121, 192, 255); font-weight: 400;">selected</span>: <span style="color: rgb(121, 192, 255); font-weight: 400;">false</span>
}

<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">MenuContext</span> = <span style="color: rgb(210, 168, 255); font-weight: 400;">createContext</span>(<span style="color: rgb(121, 192, 255); font-weight: 400;">null</span>);

<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">MenuProvider</span> = (<span style="color: rgb(201, 209, 217); font-weight: 400;">{ children }</span>) =&gt; {
  <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> [menu, setMenu] = <span style="color: rgb(210, 168, 255); font-weight: 400;">useState</span>(initialState);

  <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">toggleMenu</span> = (<span style="color: rgb(201, 209, 217); font-weight: 400;"></span>) =&gt; {
    <span style="color: rgb(210, 168, 255); font-weight: 400;">setMenu</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;">(<span style="color: rgb(201, 209, 217); font-weight: 400;">menu</span>) =&gt;</span> ({ ...menu, <span style="color: rgb(121, 192, 255); font-weight: 400;">selected</span>: !menu.<span style="color: rgb(201, 209, 217); font-weight: 400;">selected</span> }));
  };

  <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> value = { menu, toggleMenu };

  <span style="color: rgb(255, 123, 114); font-weight: 400;">return</span> <span style="color: rgb(201, 209, 217); font-weight: 400;"><span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;<span style="color: rgb(126, 231, 135); font-weight: 400;">MenuContext.Provider</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">value</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">{value}</span>&gt;</span>{children}<span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;/<span style="color: rgb(126, 231, 135); font-weight: 400;">MenuContext.Provider</span>&gt;</span></span>;
};

<span style="color: rgb(210, 168, 255); font-weight: 400;">MenuProvider</span>.<span style="color: rgb(201, 209, 217); font-weight: 400;">propTypes</span> = {
  <span style="color: rgb(121, 192, 255); font-weight: 400;">children</span>: <span style="color: rgb(210, 168, 255); font-weight: 400;">PropTypes</span>.<span style="color: rgb(201, 209, 217); font-weight: 400;">node</span>.<span style="color: rgb(201, 209, 217); font-weight: 400;">isRequired</span>,
};

<span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">useMenu</span> = (<span style="color: rgb(201, 209, 217); font-weight: 400;"></span>) =&gt; {
  <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> value = <span style="color: rgb(210, 168, 255); font-weight: 400;">useContext</span>(<span style="color: rgb(210, 168, 255); font-weight: 400;">MenuContext</span>);

  <span style="color: rgb(255, 123, 114); font-weight: 400;">if</span> (!value) {
    <span style="color: rgb(255, 123, 114); font-weight: 400;">throw</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">new</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">Error</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">"Error: Hook used without MenuContext."</span>);
  }

  <span style="color: rgb(255, 123, 114); font-weight: 400;">return</span> value;
};

<span style="color: rgb(255, 123, 114); font-weight: 400;">export</span> { <span style="color: rgb(210, 168, 255); font-weight: 400;">MenuProvider</span>, <span style="color: rgb(210, 168, 255); font-weight: 400;">MenuContext</span>, useMenu };</pre>

The state is saved in the Provider, then the individual functions that handle the state are exported.  This maintains the same pattern as before, except instead of dispatching actions, the exported function can be invoked from any component that utilizes the context.

There is more code here than before, but I'm ok with this as Redux has been removed.  Also the hook to use the context is included in the new code.

Once I got this reducer converted, the pattern was just replicated to the other reducers.
<br /><br />
## BeerCSS
<img src="/assets/img/blog/beercss.png" alt="BeerCSS" width="250">

After the app was working again, I thought about what to do about the UI.  I knew that I wanted a Material style look but using the [MUI](https://mui.com) framework is overkill for a small project like this.

I found [BeerCSS](https://www.beercss.com/) which is a tiny library for styling apps.  It can even be installed simply by using a CDN:

<pre style="font-family:monospace;color: rgb(201, 209, 217); background-color: rgb(13, 17, 23); font-weight: 400; "><span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;<span style="color: rgb(126, 231, 135); font-weight: 400;">link</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">href</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">"https://cdn.jsdelivr.net/npm/beercss@3.9.7/dist/cdn/beer.min.css"</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">rel</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">"stylesheet"</span>&gt;</span>
<span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;<span style="color: rgb(126, 231, 135); font-weight: 400;">script</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">type</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">"module"</span> <span style="color: rgb(121, 192, 255); font-weight: 400;">src</span>=<span style="color: rgb(165, 214, 255); font-weight: 400;">"https://cdn.jsdelivr.net/npm/beercss@3.9.7/dist/cdn/beer.min.js"</span>&gt;</span><span style="color: rgb(201, 209, 217); font-weight: 400;">&lt;/<span style="color: rgb(126, 231, 135); font-weight: 400;">script</span>&gt;</span></pre>

<img src="/assets/img/blog/beercsskb.png" alt="Screenshot of beer css size" width="700">
The library is only 18.8kb!

After some fiddling with the markup, this is what the final result looks like🎉

[link](https://whatsthescore.netlify.app/)
<img src="/assets/img/whatsthescore2025.png" alt="Screenshot of new project" width="200">