$(function() {
	
	var simulation = function() {
		this.running = false; //initially the simulation isn't running
	};
	
	var gameGrid = new Grid(10);

	//Add event handlers for table cells
	$("td").click(function() {
		//if($(this).hasClass("dormant")) {
		//	$(this).removeClass("dormant");
		//	$(this).addClass("active");
		//}
		//else if($(this).hasClass("active")) {
		//	$(this).removeClass("active");
		//	$(this).addClass("dormant");
		//}
		toggleDisplayCell(this);
		console.log(getCol(this));
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
});
