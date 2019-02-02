document.addEventListener('DOMContentLoaded', function()
{
    drawGrid();
    generateStart();
}, false);

function updateTiles(updatedTileStates)
{
    for(var i=0; i<updatedTileStates.length; i++)
    {
        var colour = updatedTileStates[i]["alive"] ? "rgb(56, 56, 56)" : "rgb(255, 255, 255)"
        document.getElementById(updatedTileStates[i]["xPosition"] + "." + updatedTileStates[i]["yPosition"]).style.backgroundColor = colour
    }
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
        if(document.getElementById(neighbourIds[i]) != null)
        {
            if(document.getElementById(neighbourIds[i]).style.backgroundColor == "rgb(56, 56, 56)")
            {
                numberOfNeighbours ++
            }
        }
    }

    return numberOfNeighbours
}

function updateTileStates(currentTileStates)
{
    var updatedTileStates = currentTileStates;

    for(var i=0; i<updatedTileStates.length; i++)
    {
        var numberOfNeighbours = getNumberOfNeighbours(updatedTileStates[i])

        if(!updatedTileStates[i].alive)
        {
            if(numberOfNeighbours == 3)
            {
                updatedTileStates[i]["alive"] = true
            }
        }
        else
        {
            if(numberOfNeighbours != 2 && numberOfNeighbours != 3)
            {
                updatedTileStates[i]["alive"] = false
            }
        }
    }

    updateTiles(updatedTileStates);
    
}

function storeCurrentState()
{
    var tiles = document.getElementsByClassName('gridTile');
    var currentTileStates = []

    for(var i=0; i<tiles.length; i++)
    {
        var tile = tiles[i];
        var id = tiles[i].id;

        currentTileStates.push({"alive": tile.style.backgroundColor == "rgb(56, 56, 56)" ? true : false, "xPosition": id.split(".")[0], "yPosition": id.split(".")[1]})
    }

    return currentTileStates
}

function updateBoard()
{
    var currentTileStates = storeCurrentState();
    updateTileStates(currentTileStates);
}

function generateStart()
{
    var numberOfStartTiles = Math.floor((Math.random() * 50) + 10);
    var coordinatesOfStartTiles = [];

    for(var i=0; i<numberOfStartTiles; i++)
    {
        var randomX = Math.floor((Math.random() * 40));
        var randomY = Math.floor((Math.random() * 40));
        coordinatesOfStartTiles.push(randomX + "." + randomY);
    }

    for(var i=0; i<coordinatesOfStartTiles.length; i++)
    {
        document.getElementById(coordinatesOfStartTiles[i]).style.backgroundColor = "rgb(56, 56, 56)";
    }
}

function drawGrid()
{
    var tileSize = 20;
    var numberOfTiles = 800/tileSize;

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
        tiles[i].onclick = function(){this.style.backgroundColor = this.style.backgroundColor == "rgb(56, 56, 56)" ? "rgb(255, 255, 255)" : "rgb(56, 56, 56)"}
    }
    
}