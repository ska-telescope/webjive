This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation ##

To install node (and npm) follow the instructions for your operating system at [https://nodejs.org/en/download/](https://nodejs.org/en/download/).  

If you prefer to use a docker image for your development instructions can be found on  the [official node docker image site](https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image)

To confirm node and nmp are installed and configured correctly, both the following commands should return the relevant version number.

    > node --version
    > npm --version

Clone the project from git, and follow these steps at the project root:

Install all the necessary project dependencies by running

    > npm install

## Running and building the application ##

Scripts are provided as part of the standard configuration. These are run from npm, configured in the scripts section of the package.json file. 
The scripts themselves can be found in the installed node package create-react-apps. These are currently the same as the defaults supplied as part of create-react-apps. 

If you need to change these see the section on __Ejecting the underlying create-react-app framework__ below.

From the project directory, you can run any of the following

    > npm start

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

    > npm test

Launches the test runner in the interactive watch mode.<br>
See the section below about __testing__ for more information.

    > npm run build

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the create-react-app [deployment guide](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Ejecting the underlying create-react-app framework ##

The current skeleton was bootstrapped with Create React App and uses the provided default build tool and configuration choices. If you wish to extend or configure your own choices you can eject at any time. 

You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

    > npm run eject

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies from create-react-app (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

## Learn More ##

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting ##

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size ##

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App ##

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration ##

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment ##

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify ##

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
