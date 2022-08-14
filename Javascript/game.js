

// en array som lagrar de olika lådornas värden
var blocks = []

// ett objekt som lagrar spelar karaktärens värden
var character = {
    xCordinates: 0,
    yCordinates: 0,
    characterObject: true,
    type: Entities.Character
}

//  createGameBoard är en funktion som ritar ut banan 
// den innehåller en placeHolder som vid användning är tileMap01
// den är uppbyggd utifrån sokobanBase.txt.js innehåll (width, lenght osv)
// ger även varje ny column ett id bestående av row  (x) och coulumn (y) 

function createGameBoard(placeHolder)
{
    var mainContainer = document.createElement('div')
    mainContainer.style.width = placeHolder.width * 50 + 'px'

    for (var row = 0; row < placeHolder.height; row++ )
    {
        var rowContainer = document.createElement('div')

        for(var cell = 0; cell < placeHolder.width; cell++)
        {                    
            var columnContainer = document.createElement('div')
            columnContainer.id = row + '-' + cell

            // Om nästa object i mapGrid är W = Wall gör följande.
            if(placeHolder.mapGrid[row][cell][0] === 'W')
            {
                columnContainer.className = Tiles.Wall;
            }

             // Om nästa object i mapGrid är G = Goal gör följande.
            else if (placeHolder.mapGrid[row][cell][0] === 'G')
            {
                columnContainer.className = Tiles.Goal;
            }          
            
             // Om mapGrid objektet inte inehåller varken W, B, P eller G så är objektet "space"
            else  
            {
                columnContainer.className = Tiles.Space;
            }           

            // Om nästa object i mapGrid är P = Player gör följande.
            if (placeHolder.mapGrid[row][cell][0] === 'P')
            {
                character.xCordinates = row
                character.yCordinates = cell
                columnContainer.classList.add(Entities.Character);
            }     

             // Om nästa object i mapGrid är B = Block (aka Box) gör följande.
            else if (placeHolder.mapGrid[row][cell][0] === 'B')
            {
                columnContainer.classList.add(Entities.Block);
                // adderar lådorna till blocks arrayen
                blocks.push({xCordinates: row, yCordinates: cell, characterObject: false, type: Entities.Block })
            }
                        
            columnContainer.style.float = 'left'
            rowContainer.appendChild(columnContainer);

        }     
        mainContainer.appendChild(rowContainer)  
    }
    document.getElementById('board').appendChild(mainContainer);
}


createGameBoard(tileMap01)
console.log(character)


// eventlistner added
// it will prevent up,down, left and right to move the window, but will still save the input witch we can use to move the character
document.addEventListener("keydown", function(event) {
    event.preventDefault();
    var key = event.key; 
    switch (key) 
    { 
        // if event.key is arrowLeft we will log it and also use the function move and send in the character object and the direction
      case "ArrowLeft":
        console.log("Left arrow was pressed")
        var leftKey = "left";
        moveElement(character, leftKey)
        break;

      case "ArrowRight":
        console.log("Right arrow was pressed")
        var rightKey = "right";
        moveElement(character, rightKey)
        break;

      case "ArrowUp":
        console.log("Up arrow was pressed")
        var upKey = "up";
        moveElement(character, upKey)        
        break;

      case "ArrowDown":
        console.log("Down arrow was pressed")
        var downKey = "down";
        moveElement(character, downKey)        
        break;

        // Reset's the gameboard 
        case "r":         
        for(let row1 = 0; row1 < tileMap01.height; row1++)
        {
            for (let column1 = 0; column1 < tileMap01.width; column1++)
            {
                let element = document.getElementById(row1 + '-' + column1)
                element.remove();
                console.log(element);
            }
        }
        createGameBoard(tileMap01);
        console.log("New game board created, game reseted")
        break;

    }
  });

  // Update charac
  function setNewPosition()
  {

  }


  // Create a function for moving the character
  // Should also contain ways to prevent character from walking over walls and other objects.
  // needs 2 params, characterObject and where to go
  function moveElement(elementToMove, where)
  {
    // Create placeholders for the elementToMove current position
    var currentXAxis = elementToMove.xCordinates;
    var currentYAxis = elementToMove.yCordinates;

    // Checking where the elementToMove shall move to
    if(where === "left")
    {
        currentYAxis = currentYAxis - 1;        
    }
    else if(where === "right")
    {
        currentYAxis = currentYAxis + 1;   
    }
    else if(where === "up")
    {
        currentXAxis = currentXAxis - 1;   
    }
    else if(where === "down")
    {
        currentXAxis = currentXAxis + 1; 
    }    
    else 
    {
        console.log("moveElement else statment activated")
    }

    // Ones we know where the elementToMove should move to we need to check if the element actually can move there. 
    var oldPosition = document.getElementById(character.xCordinates + "-" + character.yCordinates);
    var newPosition = document.getElementById(currentXAxis + "-" + currentYAxis);

    if(newPosition.classList.contains(Tiles.Wall))
    {
       return false;
    }

    
    newPosition.classList.add(character.type);
    console.log(newPosition);
    oldPosition.classList.remove(character.type);
    console.log(oldPosition);

    elementToMove.xCordinates = currentXAxis;
    elementToMove.yCordinates = currentYAxis;
    
    
  }



