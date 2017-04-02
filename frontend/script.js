


/*
function imgrImg(linkstring,doneornot){
	var url = "https://api.imgur.com/3/image/" + linkstring;
	var imgurIdrequest = $.ajax({
		url: url,
		type: "GET",
		datatype: "json",
		headers: {
			"Authorization":"Client-ID 878a89984952e6d"
		}
	});

	imgurIdrequest.done(function(response){
		console.log("imgurIdYata", response);
		srch(response.link, doneornot);
	});

}
*/




function imgr(linkstring){
//https://api.imgur.com/3/image/{id}
//https://api.imgur.com/3/gallery/t/
//"https://api.imgur.com/3/gallery/search/q?=" + search term + "&q_type=jpeg
//https://api.imgur.com/3/gallery/search?q={search term}
	var url = "https://api.imgur.com/3/gallery/search?q=" + linkstring + "&q_type=image/jpeg";
    		console.log("url: ", url);

			var imgurrequest = $.ajax({
			    url: url,
			    type: "GET",
			    datatype: "json",
			    headers: {
					"Authorization":"Client-ID 878a89984952e6d"
				},
			//	data: {
			//		type:"image/jpeg"
			//	}
			});

			imgurrequest.done(function(response){
				console.log("imgurYata", response);
				for(var i = 0; i<10; i++){
					if (i <9){
						srch(response.data[i].link, "not");
					}else{
						srch(response.data[i].link, "done");
					}
				}
			});
}

function srch(linkstring,doneornot){

	var url = 'http://localhost:3000/search';
	console.log(linkstring);

	var data = {
		link: linkstring
		};

	var pushsearch = $.ajax({
						type:"POST",
						url:url,
						data
					 });

	pushsearch.done(function(response){
		//if (err) console.log(err);
		console.log("SearchYata", response);
		if (doneornot==="done"){
			srchmk();		
		}
	});
							
}

function srchdltall(){
	
	var url = 'http://localhost:3000/search';
	var data = {}

	var deletesearch = $.ajax({
		type:"DELETE", 
		url: url,
		data
	});

	deletesearch.done(function(response){
		//if (err) console.log(err);
		console.log("delYata", response);
	});
}

function srchmk(){

	    var url = 'http://localhost:3000/search';
		
		var dbretrieve = $.ajax({
			type:"GET",
			url:url,
		});
		

		dbretrieve.done(function(response){
			//if (err) console.log(err);
			console.log("hello there sailor");
			console.log("retrievalYata: ", response);
		
			//dependin on the order retrieved I may have to reverse the response
			//here				
			response.forEach(function(res){
				console.log(res.link);
				$('body').append("<a href='"+res.link.toString()+"'><img src='"+res.link.toString()+"' alt='"+res.link.toString()+"'></a>");
			});
		


		});
}



$(function(){

    console.log("sanity check");

    	$("form").submit(function(evt){
    		evt.preventDefault();
    		if ($(".inputsearch").val() != ""){
    			srchdltall();
    			imgr($(".inputsearch").val());
    		}
    	});

});
	






/*

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
*/

//imgur search
//https://api.imgur.com/3/gallery/search?q={search term}
//client id 878a89984952e6d
//client secret 0bc96fe0affeedfc56de634cd71a10dbb57f0b05

/*

var imgurrequest = $.ajax({
    url: "https://api.imgur.com/3/gallery/search?q=platypus",
    type: "GET",
    datatype: "json",
    headers: {
		"Authorization":"Client-ID 878a89984952e6d"
	}
});

imgurrequest.done(function(err,response){
	if (err) console.log(err);
	console.log("imgurYata", response)
});



		var url = 'http://localhost:3000/search';
		var data = {
			name: "patientplatypus3"
		}

		var pushsearch = $.ajax({
			type:"POST",
			url:url,
			data
		});

		pushsearch.done(function(err,response){
			if (err) console.log(err);
			console.log("SearchYata", response);
		});


		var url = 'http://localhost:3000/search';
		var data = {}

		var deletesearch = $.ajax({
			type:"DELETE", 
			url: url,
			data
		});

		deletesearch.done(function(err,response){
			if (err) console.log(err);
			console.log("delYata", response);
		});

*/

	
