# Readable

    Udacity study project for React nano-degree. A front-end copycat of Redit that allows to post anonymous posts and comments. Includes only 3 categories of posts. Implements Redux for state management.

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

    This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use SemVer for versioning. For the versions available, see the tags on this repository.

## Authors

    Alexander Frolov - The Readable React app front-end
    Udacity - server side, registerServiceWorker.js
