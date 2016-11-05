$(function() {
	
	var simulation = function() {
		this.running = false; //initially the simulation isn't running
	};
	
	var gameGrid = new Grid(10);
	console.log("Grid:");
	console.log(gameGrid.toString());
	//Add event handlers for table cells
	$("td").click(function() {
		toggleDisplayCell(this);
		gameGrid.toggle(getCol(this), getRow(this));
		console.log(gameGrid.toString());
	});

	$("#startButton").click(function() {
		advance();
	});

	function getCol(elem) {
		return $(elem).attr("id").substr(2,1);
	}

	function getRow(elem) {
		return $(elem).attr("id").substr(0,1);
	}

	function toggleDisplayCell(elem) {
		if($(elem).hasClass("dormant")) {
			$(elem).removeClass("dormant");
			$(elem).addClass("active");
		}
		else if($(elem).hasClass("active")) {
			$(elem).removeClass("active");
			$(elem).addClass("dormant");
		}
	}

	function refreshDisplay(someGrid) {
		for(var i = 0; i < someGrid.width; i++) {
			//iterate through the columns
			for(var j = 0; j < someGrid.height; j++) {
				var cellID = "#" + i + "_" + j;
				$(cellID).removeClass("active");
				$(cellID).removeClass("dormant");
				if(someGrid.get(i,j)) {
					$(cellID).addClass("active");
				}
				else {
					$(cellID).addClass("dormant");
				}
			}
		}
	}

	function advance() {
		gameGrid = gameGrid.getNext();
		refreshDisplay(gameGrid);
	}
});
