function login()
{
	var mail = $('#user_email').val();
	var pass = $('#user_pass').val();
	var route = "http://api.festember.com/auth/app";
	var method = "POST";
	var request = $.ajax({
		url : route,
		method : method,
		data : {
			"user_email" : mail,
			"user_pass" : pass
		},
		xhrFields : {
			withCredentials : true
		}
	});

	request.done(function(data){
		if(data.status_code == 200) 
		{	
			var user_id = data.user_id;
			var token = data.message;
            route = "http://api.festember.com/pr/qr";
            var request2 = $.ajax({
            	url : route,
				method : method,
				data : {
					"user_id" : user_id,
					"token" : token
				},
				xhrFields : {
					withCredentials : true
				}
        	});

        	request2.done(function(data){
        		if(data.status_code == 200) 
        		{
        			$('#form_wrapper').css('display', 'none');
        			$('#qrhash').show();
        			$('#comment').show();
        			var qrhash = "data:image/png;base64," + data.message;
        			$('#qrhash').width(300);
        			$('#qrhash').height(300);
            		$('#qrhash').attr('src', qrhash);
        		}
        		else
        		{
        			alert("QR Hash not generated");
        		}
        	});
		}
		else
		{
			alert("Invalid parameters");
		}
	});
}