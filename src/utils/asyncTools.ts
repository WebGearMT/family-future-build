/** 

	Use these functions to handle the responses of asynchronous requests.

*/

export const HandleResponse = async (response: any) => {
switch (response.status) {
  case 200:
    // Success - messages retrieved successfully
    // Parse the response data and update messages state
    // Clear any existing error messages
    const result = await response.json();
    return result;
    

  case 204:
    // No Content - no messages found but request was successful
    // Set messages state to empty array
    // Show "no messages" indicator if needed
    return console.log("No content to display. Response status: ", response.status);
    
    

  case 400:
    // Bad Request - malformed request or invalid parameters
    // Display user-friendly error message about invalid request
    // Log detailed error for debugging
    console.log('Check your fetch parameters or backend.');
    throw new Error(`malformed request or invalid parameters: ${response.status}`);
    

  case 401:
    // Unauthorized - user not authenticated
    // Redirect to login page or show authentication error
    // Clear any cached user data
    
    throw new Error(`user not authenticated: ${response.status}`);
    

  case 403:
    // Forbidden - user authenticated but lacks permission
    // Display access denied message
    // Possibly redirect to appropriate page
    
    throw new Error(`user authenticated but lacks permission: ${response.status}`);
    

  case 404:
    // Not Found - endpoint or resource doesn't exist
    // Display "messages not found" or "chatroom not found" error
    // Check if chatroom ID is valid
    
    throw new Error(`endpoint or resource doesn't exist: ${response.status}`);
    

  case 408:
    // Request Timeout - server took too long to respond
    // Show timeout error message
    // Offer retry option to user
    
    throw new Error(`server took too long to respond: ${response.status}`);
    

  case 429:
    // Too Many Requests - rate limiting triggered
    // Display rate limit error message
    // Show countdown until next allowed request
    
    throw new Error(`Too Many Requests: ${response.status}`);
    

  case 500:
    // Internal Server Error - something went wrong on server
    // Display generic server error message
    // Log error details for debugging
    
    throw new Error(`something went wrong on server: ${response.status}`);
    

  case 502:
    // Bad Gateway - server acting as gateway received invalid response
    // Display service unavailable message
    // Suggest trying again later
    
    throw new Error(`server acting as gateway received invalid response: ${response.status}`);
    

  case 503:
    // Service Unavailable - server temporarily unavailable
    // Display maintenance or overload message
    // Show estimated time until service restoration
    
    throw new Error(`server temporarily unavailable: ${response.status}`);
    

  case 504:
    // Gateway Timeout - upstream server didn't respond in time
    // Display timeout error message
    // Offer retry option
    
    throw new Error(`upstream server didn't respond in time: ${response.status}`);
    

  default:
    // Unexpected status code
    // Display generic error message
    // Log the unexpected status for debugging
    // Fall back to safe error handling
    throw new Error('An unexpected error occured.');
    
}
}

// Catch errors returned by the function in which this handler is called.
export const displayErrorMsg = (error: Error, object: any) => {
	const errorMsg = error instanceof Error ? error.message : `Failed to fetch ${object}`;
  
  console.error('Error fetching messages: ', errorMsg);
  
  return errorMsg;
};

// The Error Handler Used for Handling Async Errors
export const throwAsyncError = (response: any) => {
	throw new Error(`HTTP error! status: ${response}`);
};




/* *** HTTP Request Handlers *** */

// GET Request Handler
export const perform_validated_GET_request = async (
  url: string | undefined = "../../../server/api.php/", 
  endpoint: any) => {
	// Perform a request.
	const responseUrl = url + endpoint;
		
    const response = await fetch(responseUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
      
    // Store the result of the request.
    const responseHandled: Response = await HandleResponse(response);
      
    // If the response failed, throw an error and return the result.
    if (responseHandled.status !== 200) {
    	const failedRequest = responseHandled;
      return throwAsyncError(failedRequest);
    }
      
    // If successful, store the result returned.
    const resultReturned = responseHandled;
    
    return resultReturned;
};

// POST Request Handler

export const perform_validated_POST_request = async (
	url = "../../../server/api.php/", 
	endpoint: string, 
	target: any) => {
		// Perform a request.
		const responseUrl = url + endpoint;
		
    const response = await fetch(responseUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(target),
        });
      
    // Store the result of the request.
    const responseHandled: Response = await HandleResponse(response);
      
    // If the response failed, throw an error and return the result.
    if (responseHandled.status === 200) {
    	const failedRequest = responseHandled;
      return throwAsyncError(failedRequest);
    }
      
    // If successful, store the result returned.
    const resultReturned = responseHandled;
    
    return resultReturned;
};

