document.addEventListener('DOMContentLoaded', function()
{
    drawGrid();
    generateStart();
}, false);

var activeTileColour = "rgb(56, 56, 56)"
var inactiveTileColour = "rgb(255, 255, 255)"
var numberOfTiles = 40;

/////////////////////////// SETUP //////////////////////////
function drawGrid()
{
    var tileSize = 800/numberOfTiles;

    for(var i=0; i<numberOfTiles; i++)
    {
        for(var j=0; j<numberOfTiles; j++)
        {
            document.getElementById("gameGrid").innerHTML += '<div class="gridTile" id="' + i + '.' + j + '"></div>'
        }
    }

    var tiles = document.getElementsByClassName("gridTile")
    for(var i=0; i<tiles.length; i++)
    {
        tiles[i].style.width = tileSize + "px";
        tiles[i].style.height = tileSize + "px";
        tiles[i].onclick = function(){this.style.backgroundColor = this.style.backgroundColor == activeTileColour ? inactiveTileColour : activeTileColour}
    }
}

function generateStart()
{
    var numberOfStartTiles = Math.floor((Math.random() * 150) + 120);
    var coordinatesOfStartTiles = [];

    for(var i=0; i<numberOfStartTiles; i++)
    {
        var randomXCoordinate = Math.floor((Math.random() * numberOfTiles));
        var randomYCoordinate = Math.floor((Math.random() * numberOfTiles));
        coordinatesOfStartTiles.push(randomXCoordinate + "." + randomYCoordinate);
    }

    for(var i=0; i<coordinatesOfStartTiles.length; i++)
    {
        document.getElementById(coordinatesOfStartTiles[i]).style.backgroundColor = activeTileColour;
    }
}

///////////////////////////// UPDATE (ITEARATE) /////////////////////////////
function updateBoard()
{
    updateTiles(updateTileStates(storeCurrentState()));
}

function storeCurrentState()
{
    var allTiles = document.getElementsByClassName('gridTile');
    var currentTileStates = []

    for(var i=0; i<allTiles.length; i++)
    {
        var tile = allTiles[i];
        currentTileStates.push({"active": tile.style.backgroundColor == activeTileColour ? true : false,
                                "xPosition": tile.id.split(".")[0], 
                                "yPosition": tile.id.split(".")[1]})
    }

    return currentTileStates
}

function updateTileStates(currentTileStates)
{
    var updatedTileStates = currentTileStates;

    for(var i=0; i<updatedTileStates.length; i++)
    {
        var numberOfNeighbours = getNumberOfNeighbours(updatedTileStates[i])

        if(updatedTileStates[i]["active"] == false && numberOfNeighbours == 3)
        {
            updatedTileStates[i]["active"] = true
        }
        else if(numberOfNeighbours != 2 && numberOfNeighbours != 3)
        {
            updatedTileStates[i]["active"] = false
        }
    }

    return updatedTileStates
}
function getNumberOfNeighbours(tile)
{
    var numberOfNeighbours = 0;

    var x = parseInt(tile["xPosition"])
    var y = parseInt(tile["yPosition"])

    var topLeft         = String(x-1) + "." + String(y-1)
    var topMiddle       = String(x)   + "." + String(y-1)
    var topRight        = String(x+1) + "." + String(y-1)
    var middleRight     = String(x+1) + "." + String(y)
    var bottomRight     = String(x+1) + "." + String(y+1)
    var bottomMiddle    = String(x)   + "." + String(y+1)
    var bottomLeft      = String(x-1) + "." + String(y+1)
    var middleLeft      = String(x-1) + "." + String(y)

    neighbourIds = [topLeft, topMiddle, topRight, middleRight, bottomRight, bottomMiddle, bottomLeft, middleLeft]

    for(var i=0; i<neighbourIds.length; i++)
    {
        var neighbour = document.getElementById(neighbourIds[i])
        if(neighbour != null && neighbour.style.backgroundColor == activeTileColour)
        {
            numberOfNeighbours ++
        }
    }

    return numberOfNeighbours
}

function updateTiles(updatedTileStates)
{
    for(var i=0; i<updatedTileStates.length; i++)
    {
        var tile = updatedTileStates[i]
        var colour = tile["active"] ? activeTileColour : inactiveTileColour

        document.getElementById(tile["xPosition"] + "." + tile["yPosition"]).style.backgroundColor = colour
    }
}