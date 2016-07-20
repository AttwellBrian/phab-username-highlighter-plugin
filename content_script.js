chrome.storage.sync.get(null, function (dict) {
	$(".phui-object-item-col1 .phui-handle.phui-link-person:contains('" + dict.username + "')")
		.css( "background-color", "#7FFF7F" )
		.css( "text-decoration", "underline" );

	dict.othernames.split("\n").forEach(function(value) {
		$(".phui-object-item-col1 .phui-handle.phui-link-person:contains('" + value + "')")
		.css( "background-color", "#ffa5a5" )
		.css( "text-decoration", "underline" );
	});

});


$.get( "https://code.uberinternal.com/login/refresh/", function( authentication_data ) {
	new RegExp("token\":\"(.*)\"").exec(authentication_data);
	var csfr = RegExp.$1;
	
	var data = {__csrf__: csfr, output: "json"};
	
	$.ajax({
		type: "POST",
		url: "https://code.uberinternal.com/api/user.whoami",
		data: data,
		success: function(data) 
		{
			var phid = data.result.phid;
			var username = data.result.userName;
			
			$( ".phui-object-item-link" ).each(function() 
			{
				var diffLink = $(this);
				var diffVersion = $( this ).attr("href");
 			   if (diffVersion[0] == "/" && diffVersion[1] == "D") {
 			       var diffNumber = diffVersion.substring(2);

 			       	var data = {__csrf__: csfr, output: "json", revisionid: diffNumber};
					$.ajax({
						type: "POST",
						url: "https://code.uberinternal.com/api/differential.uber_getreviewers",
						data: data,
						success: function(reviewer_data, diffNumber) {
							var jsonString = JSON.stringify(reviewer_data);
							
							// TODO: make more generic.
							if (JSON.stringify(reviewer_data).includes('"' + username + '","status":"accepted"')) {
								// Just go ahead and remove the entire entry.
								$( diffLink ).parent().parent().parent().parent().remove()
							}
						}
					});
 			   }
 			});
		}
	});

});
