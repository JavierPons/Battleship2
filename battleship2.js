var model = {
    
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [ 
               {locations: [0,0,0], hits: ["", "", ""]},
               {locations: [0,0,0], hits: ["", "", ""]},
               {locations: [0,0,0], hits: ["", "", ""]}
             /*{locations: ["06", "16", "26"], hits: ["","",""]},
             {locations: ["24", "34", "44"], hits: ["","",""]},
             {locations: ["10", "11", "12"], hits: ["","",""]} */
    ],
    
    fire: function(guess) {
        
        for (var i = 0; i < this.numShips; i++)  {
            
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
           
            if (index >=0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
           
            
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");    
                    this.shipsSunk++;
                }
                return true;
            }
             }
    
            view.displayMiss(guess);
            view.displayMessage("You missed");
           return false;
        },   
    
    isSunk:  function(ship) {
        for (var i =0; i<this.shipLength; i++)  {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },


    generateShipLocations: function() {
    
    var locations;
    
    for (var i = 0; i<this.numShips; i++) {
        
        do { 
            locations = this.generateShip();
        
        } while (this.collision(locations));
        this.ships[i].locations = locations;
    }
},
    
generateShip: function()     {
    
    var direction =  Math.floor(Math.random() * 2);
    var row;
    var col;
    
    if (direction === 1) {
        
        row = Math.floor(Math.random() * this.boardSize);
        col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
        
    }else {
        
        row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
        col = Math.floor(Math.random() * this.boardSize);
    }
    
   var newShipLocation = [];
    
    for (var i = 0; i<this.shipLength; i++) {
        
        if (direction === 1) {
            
            newShipLocation.push(row + "" + (col + i));
            
        }else {
            
            newShipLocation.push((row + i) + "" + col);
        }
    }
    
    return newShipLocation;
},

collision : function(locations) {
    
    for (var i = 0; i<this.numShips; i++) {
        
        var ship = model.ships[i];
        for (var j = 0; j<locations.length; j++) {
            if (ship.locations.indexOf(locations[j]) >= 0) {
                return true;
            }
        }
    }
    return false;
}

};

var view = {
    
    displayMessage: function(msg){
        
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
        
     displayHit: function(location){
            
            var cell = document.getElementById(location);
            cell.setAttribute("class", "hit");
            
        },
        
     displayMiss: function(location){
            
            var cell = document.getElementById(location);
            cell.setAttribute("class", "miss");
            
        }        
};

var controller = {
    
    guesses: 0,
    
    progressGuess: function(guess) {
        
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " +
                                   this.guesses + " guesses.");
            }
        }
    }
};


function parseGuess(guess) {
    
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    
if (guess === null || guess.length !==2) {
    
    alert("Oops, please enter a letter and a number on the board.");
}else{
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);
    
    if (isNaN(row) || isNaN(column)) {
         alert("Oops, that isn´t on the board.");
        
    }else if (row < 0 || row >= model.boardSize ||
             column < 0 || column >= model.boardSize) {
        alert("Oops, that´s off the board!");
    }else {
        
    return row + column;
    } 
    
       
 }
return null;

}



function handleFireButton() {
    
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.progressGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;




function init() {
    
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    
    model.generateShipLocations();
}

/*controller.progressGuess("A0");

controller.progressGuess("A6");
controller.progressGuess("B6");
controller.progressGuess("C6");

controller.progressGuess("C4");
controller.progressGuess("D4");
controller.progressGuess("E4");

controller.progressGuess("B0");
controller.progressGuess("B1");
controller.progressGuess("B2");
*/



/*
console.log(parseGuess("A0"));
console.log(parseGuess("B6"));
console.log(parseGuess("G3"));
console.log(parseGuess("H0"));
console.log(parseGuess("A7"));
*/

/*
model.fire("53");

model.fire("06");
model.fire("16");
model.fire("26");

model.fire("00");

model.fire("34");
model.fire("24");
model.fire("44");

model.fire("12");
model.fire("11");
model.fire("10");
*/
