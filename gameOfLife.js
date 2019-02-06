document.addEventListener('DOMContentLoaded', function()
{
    drawGrid();
});

var activeTileColour = "rgb(56, 56, 56)"
var inactiveTileColour = "rgb(255, 255, 255)"
var numberOfTiles = 40;

var tiles
var interval

/////////////////////////// SETUP //////////////////////////
function drawGrid()
{
    var tileSize = 800/numberOfTiles;
    tiles = {}

    for(var i=0; i<numberOfTiles; i++)
    {
        for(var j=0; j<numberOfTiles; j++)
        {
            var tileId = i + "." + j
            tiles[tileId] = false
            document.getElementById("gameGrid").innerHTML += '<div class="gridTile" onclick="toggleTileColour(this.id)" id="' + tileId + '"></div>'
        }
    }

    var gridTiles = document.getElementsByClassName("gridTile")
    for(var i=0; i<gridTiles.length; i++)
    {
        gridTiles[i].style.width = tileSize + "px";
        gridTiles[i].style.height = tileSize + "px";
    }
}

function toggleTileColour(id)
{
    document.getElementById(id).style.backgroundColor = tiles[id] ? inactiveTileColour : activeTileColour
    tiles[id] = !tiles[id]
}

function generateStart()
{
    var numberOfStartTiles = Math.floor((Math.random() * 150) + 120);
    var idsOfStartTiles = [];

    for(var i=0; i<numberOfStartTiles; i++)
    {
        var randomXCoordinate = Math.floor((Math.random() * numberOfTiles));
        var randomYCoordinate = Math.floor((Math.random() * numberOfTiles));
        idsOfStartTiles.push(randomXCoordinate + "." + randomYCoordinate);
    }

    for(var i=0; i<idsOfStartTiles.length; i++)
    {
        tiles[idsOfStartTiles[i]] = true;
        document.getElementById(idsOfStartTiles[i]).style.backgroundColor = activeTileColour;
    }

   interval = setInterval(function(){updateBoard()}, 1000);
}

function startGame()
{
    generateStart();
}

function stopGame()
{
    clearInterval(interval)

    for(var tile in tiles)
    {
        tiles[tile] = false
        document.getElementById(tile).style.backgroundColor = inactiveTileColour
    }
}

///////////////////////////// UPDATE (ITEARATE) /////////////////////////////
function updateBoard()
{
    updateTileStates();
    updateTiles();
}

function updateTileStates()
{
    var tilesToUpdate = Object.assign({}, tiles)

    for(var tile in tiles)
    {
        var numberOfNeighbours = getNumberOfNeighbours(tile)

        if(tiles[tile] == false && numberOfNeighbours == 3)
        {
            tilesToUpdate[tile] = true
        }
        else if(tiles[tile] == true && numberOfNeighbours != 2 && numberOfNeighbours != 3)
        {
            tilesToUpdate[tile] = false
        }
    }

    tiles = tilesToUpdate
}

function getNumberOfNeighbours(tile)
{
    var numberOfNeighbours = 0;

    var x = parseInt(tile.split(".")[0])
    var y = parseInt(tile.split(".")[1])

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
        var neighbourTile = tiles[neighbourIds[i]]

        if(neighbourTile != undefined && neighbourTile)
        {
            numberOfNeighbours ++
        }
    }

    return numberOfNeighbours
}

function updateTiles()
{
    for(var tile in tiles)
    {
        var colour = tiles[tile] ? activeTileColour : inactiveTileColour

        document.getElementById(tile).style.backgroundColor = colour
    }
}