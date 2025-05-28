---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'CSS transform container clipping issue'
pubDate: 2025-05-28
description: 'Fixing an issue with CSS transforms clipping under container.'
author: 'Tabrez Akhtar'
tags: ["Node", "Express", "Netlify"]
---
[Link to Source Code](https://github.com/tabrezakhtar/CSS-Animation)

I was adding CSS animations to a web app I'm working on and I came across this annoying issue.

<video width="550px" controls muted>
  <source src="/assets/video/grid1.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

The tile is being clipped under its container.  At first I thought it was just z-index but no amount of CSS fiddling could fix this.  I tried popular animation libraries like Greensock, React-Spring and Popmotion but they did the same thing.

After some experimenting, I noticed that setting the tile to <code>position: absolute</code> made it appear above everything, and the transition worked correctly.

<video width="550px" controls muted>
  <source src="/assets/video/absolute.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Once I knew that positioning absolutely would work, I decided to do it dynamically with JavaScript.  On hover, I get the coords and size of the current tile.  Then I absolutely position a copy of the tile over it.  This is because setting the original tile to absolute will cause it to move out of the normal document flow, and the other tiles will move up.  Once its positioned, I added the CSS animation. Then I delete the tile copy when the mouse is hovered out.

<video width="550px" controls muted>
  <source src="/assets/video/grid2.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<br />
This is the code:

```js
const tiles = document.querySelectorAll(".tile");
let zoomedTileCopy = null;

tiles.forEach(tile => {
  tile.addEventListener("mouseenter", e => {
    if (zoomedTileCopy) return;
    const rect = tile.getBoundingClientRect();
    zoomedTileCopy = tile.cloneNode(true);
    Object.assign(zoomedTileCopy.style, {
      width: rect.width + "px",
      height: rect.height + "px",
      position: "absolute",
      left: rect.left + window.scrollX + "px",
      top: rect.top + window.scrollY + "px",
      margin: 0,
      pointerEvents: "none",
      transition: "transform 0.3s ease",
      transform: "scale(1)"
    });
    zoomedTileCopy.classList.add("tile-zoomed");
    document.body.appendChild(zoomedTileCopy);
    void zoomedTileCopy.offsetWidth;
    zoomedTileCopy.style.transform = "scale(2)";
  });

  tile.addEventListener("mouseleave", () => {
    zoomedTileCopy?.remove();
    zoomedTileCopy = null;
  });
});
```
I know this is a little bit of a hacky solution, but I tucked it away into a component and moved on with building the rest of the app🤷  Feel free to send me a PR if theres another way to do this!  The source is [here](https://github.com/tabrezakhtar/CSS-Animation).