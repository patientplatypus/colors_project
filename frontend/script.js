$(function(){

    console.log("sanity check");

	    var url = 'http://localhost:3000';

	 	var data = {
		};
		
		var classreturn = $.ajax({
			type:"GET",
			url:url,
			data
		});
		

		classreturn.done(function(response){
			console.log("YATA: ", response);
			response.forEach(function(res){
				$(".main").append("<li class='name' style='color:blue; background-color:red;'>"+res.name+"</li>");
			})
		});

	//	$("body").on("click", function(){
	//		console.log('hello')
	//	})
	///html/body/div/li[2]
		//debugger;
		$('body').on("click", ".name", function(){

			console.log('This works');
			console.log($(this).text());
			//debugger;

			

			var url = 'http://localhost:3000';
		
			var classdelete = $.ajax({
				type:"DELETE",
				url:url,
				data: {
					name: $(this).text(),
				}
			});

 			
			$(this).remove();


			classdelete.done(function(err, response){
				//if(err) console.log("error", err);
				console.log("DELETEYATA", response);

			});

		});
});
	