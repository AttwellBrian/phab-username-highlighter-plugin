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
