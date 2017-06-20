# JSBlog.io

A JavaScript blog service for JavaScript developers.


## Architecture overview
JSBlog.io is a Progressive Web App that uses [firebase](https://firebase.google.com/) and [firebase-functions](https://firebase.google.com/docs/functions/) as infrastructure. All code is written in ES2015 and it uses [Preact](https://preactjs.com/) for rendering and [function-tree](http://cerebraljs.com/docs/addons/function_tree.html) for server side request logic.

## What happens when a user opens the app
1. A Firebase function running an express app receives the request
2. It will return the index.html, using cached content
3. The client now requests the scripts and the serviceworker (if supported)
4. The application fires up and authenticates user and renders the app based on current url
5. The client also registers the user to receive notifications
6. The `index.html` included information about what should be prefetched, meaning that some additional requests are made on the most likely clicked links

## How to get to know the project
Have a look through the code, it is comented and hopefully gives you an impression of how things are connected. If you like it I would love for you to contribute :) Just clone the repo `npm install` and `npm start`. Go to *localhost:3000* and you are ready to update the project.

## The challenge for JSBlog
Since the server needs to know about the authenticated status of the user to include the correct theme it is necessary to always authenticate before prefetching additional resources. This is not ideal, but there is no way around it. To inform the server about the authentication status the client writes a cookie with the token of the user. This token will expire, meaning that users coming back to the service will need to authenticate with a new cookie before prefetching additional resources.
