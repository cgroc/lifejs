function Grid(size) {
	this.height = size; // for inspecting the grid objects once created
	this.width = size;
	// create a size x size array for representing the game grid
	this.gridArray = (function() {
		var outerArray = new Array();
		for(var i = 0; i < size; i++) {
			outerArray[i] = (function() {
				var innerArray = new Array();
				for(var j = 0; j < size; j++) {
					innerArray[j] = 0;
				}
				return innerArray;
			})();
		}
		return outerArray;		
	})();
	//get the value of an element
	this.get = function(col, row) {
		return this.gridArray[col][row];
	};
	//set the value of an element
	this.set = function(col, row, value) {
		this.gridArray[col][row] = value;
	};
	//Get the next value of an element
	//Return array of surrounding elements...
	this.getAdjacent = function(col, row) {
		returnArray = new Array();
		returnArray = returnArray.concat(this.gridArray[this.modSub(col, 1)][this.modSub(row, 1)]);
		returnArray = returnArray.concat(this.gridArray[col][this.modSub(row, 1)]);
		returnArray = returnArray.concat(this.gridArray[this.modAdd(col, 1)][this.modSub(row, 1)]);
		returnArray = returnArray.concat(this.gridArray[this.modSub(col, 1)][row]);
		returnArray = returnArray.concat(this.gridArray[this.modAdd(col, 1)][row]);
		returnArray = returnArray.concat(this.gridArray[this.modSub(col, 1)][this.modAdd(row, 1)]);
		returnArray = returnArray.concat(this.gridArray[col][this.modAdd(row, 1)]);
		returnArray = returnArray.concat(this.gridArray[this.modAdd(col, 1)][this.modAdd(row, 1)]);
		return returnArray;
	};
	// count the number of adjacent 'alive' cells
	this.countLiveNeighbours = function(col, row) {
		var neighbours = this.getAdjacent(col, row);
		var liveNeighboursCount = 0;
		for(i = 0; i < neighbours.length; i ++) {
			if(neighbours[i]) {
				liveNeighboursCount++;
			}
		}
		return liveNeighboursCount;
	};
	// get the next grid generated by the rules of GoL
	this.getNext = function() {
		var nextGrid = new Grid(size);
		//console.log("Next Grid is:\n" + nextGrid.toString());
		for(var i = 0; i < size; i++) {
			for(var j = 0; j < size; j++) {
				// console.log("Looking at (" + i + "," + j + ")");
				// console.log("Next Grid is:\n" + nextGrid.toString());
				var isLive = this.gridArray[i][j];
				// console.log("isLive: " + isLive);
				var liveNeighbours = this.countLiveNeighbours(i, j);
				// console.log("liveNeighbours: " + liveNeighbours);
				if(isLive && liveNeighbours < 2) {
					nextGrid.set(i, j, 0);
				}
				else if(isLive && liveNeighbours > 2 && liveNeighbours < 4) {
					nextGrid.set(i, j, 1);
				}
				else if(isLive && liveNeighbours > 3) {
					nextGrid.set(i, j, 0);
				}
				else if(!isLive && liveNeighbours == 3) {
					nextGrid.set(i, j, 1);
				}
				else {
					nextGrid.set(i, j, 0);
				}
			}
		}
		return nextGrid;
	}
	// return a string representation of the grid
	this.toString = function() {
		returnString = '';
		for(var i = 0; i < size; i++) {
			returnString += '[';
			for(var j = 0; j < size; j++) {
				returnString += this.gridArray[i][j];
			}
			returnString += ']\n';
		}
		return returnString;
	};
	this.modAdd = function(x, y) {
		return (((x + y) % size) + size) % size;
	}
	this.modSub = function(x, y) {
		return (((x - y) % size) + size) % size;
	}
}
