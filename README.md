# gameoflife

A Game of Life program within a 40x40 tile grid.

On pressing the start button, a random selection of 150-200 tiles are made active and the iterations begin.

This program assumes that the next iteration of active tiles is calculated based off the whole grid from the previous iteration, i.e. tile states are only updated once the entire grid has been calculated.

Each tile is a single div element and its coordinates are stored as its ID.
A key value pair object stores the id/coordinates and the boolean state of each tile - {xPosition.yPosition: state,..}.
The next iteration of the grid is calculated from this object rather than the DOM elements.

The colours of active and inactive tiles, the number of tiles in a row, the max and min number of beginning active tiles and the number of seconds between iterations are all configurable at the start of the JS file to make modifications easier.

On pressing the stop button the grid and tiles are reset.
