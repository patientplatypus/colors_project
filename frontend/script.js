

/*

function imgrImg(linkstring,doneornot){
	var url = "https://api.imgur.com/3/gallery/image/" + linkstring;
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

var localimageurls = [];


function imgr(linkstring){
//https://api.imgur.com/3/image/{id}
//https://api.imgur.com/3/gallery/t/
//"https://api.imgur.com/3/gallery/search/q?=" + search term + "&q_type=jpeg
//https://api.imgur.com/3/gallery/search?q={search term}

	var convertedstring = "";

	for(var i = 0; i<linkstring.length; i++){
		if(linkstring[i]===" "){
			var str1 = convertedstring;
			var str2 = "&";
			convertedstring = str1.concat(str2);
		}else{
			var str1 = convertedstring;
			var str2 = linkstring[i];
			convertedstring = str1.concat(str2);
		}
	}

	console.log(linkstring);



	var url = "https://api.imgur.com/3/gallery/search?q_all=" + convertedstring + "&q_type=jpg";
    		console.log("url: ", url);

			var imgurrequest = $.ajax({
			    url: url,
			    type: "GET",
			    datatype: "json",
			    headers: {
					"Authorization":"Client-ID 878a89984952e6d"
				},

			});

			imgurrequest.done(function(response){
				console.log("imgurYata", response);


				if (response.data.length < 10) {
					for (var i = 0; i<response.data.length; i++){
						if(i<response.data.length-1){
							srch(response.data[i].cover, "not");
						}else{
							srch(response.data[i].cover, "done");
						}
					}
				}else{
					for (var i = 0; i<10; i++){
						if(i<9){
							srch(response.data[i].cover, "not");
						}else{
							srch(response.data[i].cover, "done");
						}
					}
				}


			});
}

function srch(linkstring,doneornot){

	var url = 'http://localhost:3000/search';
	console.log(linkstring);

	localimageurls.push(linkstring);

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
				$('body').append("<div class='picturebox' id='"+res.link.toString()+"'> <a href='http://i.imgur.com/"+res.link.toString()+".jpg'><img src='http://i.imgur.com/"+res.link.toString()+".jpg' alt='"+res.link.toString()+"'></a></div>");
				
				var imageSend = new Image();
				imageSend.src = "http://i.imgur.com/"+res.link.toString()+".jpg";
				imageSend.crossOrigin = "Anonymous";
				imageSend.onload = (function(){
					console.log("image.width ", imageSend.width);
					console.log("image.naturalWidth ", imageSend.naturalWidth);
					console.log(imageSend);
					clrthif(imageSend, res.link.toString());
				})
	
			});

		});
}


//CORS errors for the website below - i emailed the guy, but not holding out hope
//http://mkweb.bcgsc.ca/colorsummarizer/?api
//http://mkweb.bcgsc.ca/color-summarizer/?url=static.flickr.com/37/88847543_d1eb68c5b9_m.jpg&precision=low&json=1

function coloranalyzer(){

	var imagetosend = 'http://i.imgur.com/'+localimageurls[0]+'.jpg';

	var url = 'http://mkweb.bcgsc.ca/color-summarizer/?url='+imagetosend+'&precision=low&json=1';

	var analyzeretrieve = $.ajax({
		type:"GET",
		url:url,
	});
		
	analyzeretrieve.done(function(res){
		console.log("analyzeretrieveYATA: ", res);
	});

}


//$("img[src$='greendot.gif'][name='BS']")

function clrthif(image, imagesource){

			console.log("thiefy");

			var colorThief = new ColorThief();
			var maincolor = colorThief.getColor(image);

			var colorThief = new ColorThief();
			var palettecolor = colorThief.getPalette(image, 5);

			console.log("maincolor ", maincolor);
			console.log("palettecolor ", palettecolor);

			//change dom to put in the colorthief settings

			var r = maincolor[0];
			var g = maincolor[1];
			var b = maincolor[2];

			var rgb = "rgb("+r.toString()+","+g.toString()+","+b.toString()+")";

			var picturebox = $('#'+imagesource);

			picturebox.css("background-color",rgb);
			console.log("picturebox: ", picturebox);


			for(var i = 0; i<=4; i++){

				picturebox.append("<div class='pallete' id='"+i.toString()+"'></div>");
				var r = palettecolor[i][0];
				var g = palettecolor[i][1];
				var b = palettecolor[i][2];
				var rgb = "rgb("+r.toString()+","+g.toString()+","+b.toString()+")";
				picturebox.find("#"+i.toString()).css("background-color", rgb);

			}



		
			//picturebox.append("<div class='pallete' id='1'></div>");
		
			//console.log(palettecolor[1])
			//var r = palettecolor[1][0];
			//var g = palettecolor[1][1];
			//var b = palettecolor[1][2];
			//var rgb = "rgb("+r.toString()+","+g.toString()+","+b.toString()+")";
			//picturebox.find("#1").css("background-color", rgb);

}




$(function(){

    console.log("sanity check");

    	$("form").submit(function(evt){
    		evt.preventDefault();
    		$("a").each(function(){
    			$(this).remove();
    		});
    		if ($(".inputsearch").val() != ""){
    			srchdltall();
    			imgr($(".inputsearch").val());
    	//		coloranalyzer();
    	//		clrthif();
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

	
