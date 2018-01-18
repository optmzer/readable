# Readable

Udacity study project for React nano-degree.
A front-end copycat of Redit that allows to post anonymous posts
and comments. Includes only 3 categories of posts. Implements Redux
for state management.

## Required

Requires back end server to run this app from here
[https://github.com/udacity/reactnd-project-readable-starter](https://github.com/udacity/reactnd-project-readable-starter)
The link contains server API manual as well.

##  Start Developing

To get started developing right away:

Install and start the API server from [https://github.com/udacity/reactnd-project-readable-starter](https://github.com/udacity/reactnd-project-readable-starter)

- `cd api-server`
- `npm install`
- `node server`

In another terminal window
clone or fork the repo
navigate into the folder containing this project
install dependencies with
- `npm install`
start the app with
- `npm start`. the app starts on a single command.

Server runs/listens on  http://localhost:3001
The app runs on         http://localhost:3000

## Folder Structure

After cloning the app should looks like this:

```
my-app/
  node_modules/ - dependencies
  public/
    favicon.ico
    index.html
    manifest.json
  src/
    action/
      index.js
    components/
      body.js - React component
      comment-header.js - React component
      comment.js - React component
      create.js - React component
      footer.js - React component
      header.js - React component
      home-page.js - React component
      post-header.js - React component
      post.js - React component
    reducers/
      index.js
    style/
      App.css
      comments.css
      create.css
      header.css
      post.css
    utils/
      readableAPI - API for the server
    App.js
    App.test.js
    index.css
    index.js
    registerServiceWorker.js
  package.json
  README.md

```

## Built With

This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

## Contributing

This is a study project so contributing is not required. Please consider other projects. Thank you for your interest.

## Versioning

For the versions available, see the tags on this repository.

## Authors

    Alexander Frolov - The Readable React app front-end
    Udacity - server side, registerServiceWorker.js
