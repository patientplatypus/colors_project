$(function(){

    console.log("sanity check");

	    var url = 'http://localhost:3000';

	 	var data = {
		};
		
		var dbretrieve = $.ajax({
			type:"GET",
			url:url,
			data
		});
		

		dbretrieve.done(function(err, response){
			if (err) console.log(err);
			console.log("YATA: ", response);
		});

	
});
	