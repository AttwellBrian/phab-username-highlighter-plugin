// Use background page to access chrome API. 
// This lets us read HTTP cookies that aren't normally 
// available to javascript.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
 		chrome.cookies.get({"url": request.url, "name": "phusr"}, function(cookie) {
		    if(cookie) {
		    	sendResponse(cookie.value);
		    }
		});

 		// keep communication channel open so we can return later.
		return true;
  });
