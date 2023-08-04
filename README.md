# etch-a-sketch
A simple etch-a-sketch-like program to learn about DOM manipulation. Feel free to [try it out](https://jordanmata15.github.io/etch-a-sketch/).

# Notes
## Gradient Button Isn't Broken
The gradient drawing option darkens somewhat slowly on larger grids. The original logic was to darken it by 10% every time a square was drawn over. However, I felt this darkened too quickly.

Instead, the darkening logic is based on what percent of tiles have been drawn over (drawing over a previously drawn tile counts as multiple tiles drawn over). It's not broken, just swirl your mouse around a bunch of times and you'll see it get darker. 

# Mouse Drag Off Screen (Known Issue)
Holding mouse click, dragging your mouse off screen, releasing the click, and dragging the mouse back can result in the mouse registering as still clicking. The temporary workaround is to click off screen, bring the mouse back onto a colored grid, and click again.
