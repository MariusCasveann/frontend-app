This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

## Project structure

The project follows the atomic web design methodology. To get started please read the following article: http://bradfrost.com/blog/post/atomic-web-design/

## Git hooks

* pre-commit: enforces consistent formatting and stages any changes made to unformatted files. 
* pre-push: runs the compile, linter and tests to ensure no braking changes are being push. If any of the three fails, a push is not possible.

## Available Scripts

In the project directory, you can run:

### `npm run watch` and `npm run serve`

Runs the app using the `/new` context path. This allows us to start a local nginx and share session information with the legacy UI. 
For this, the nginx server is also needed and can be started using the start script found in the docker folder.

To run the application execute the following commands in three different shells:
* `npm run watch`
* `npm run serve`
* `cd docker && ./start.sh "<your_ip>:3000"`

Navigate to [http://localhost](http://localhost) and login using the legacy UI. Now navigate to [http://localhost/new](http://localhost/new) for the new UI.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Folder Structure
  First, take a look on http://bradfrost.com/blog/post/atomic-web-design/ - this is the article based on which our application was structured. 
  
#### You can read more about our application structure and see the architecture diagram in our confluence page:   
   https://confluence.media-saturn.com/display/CLP/Application+Architecture 

Components are either: 
  Presenter Components
  Container Components

Everything regarding state:

## State folder
  Several things happen here:
  
    initiation of the redux store
    initiation of the apollo client
    activation of redux dev tools if available
    interfaces for the store
    building of the root redux reducer
    redux sagas are registered here
    
## Config folder
    environment config
    apolloConfig

## Util folder 
    generic methods and services

## Components folder

    every React Component is placed inside this folder


## GRAPHQL and APOLLO CLIENT

Graphql is a query language for our APIs
Apollo client – for fetching data with GraphQL on the client(ui) side


Apollo config (dependencies needed):

You can find the Apollo configuration in the src/config/apolloConfig.js file
For Apollo client configuration we are using:

      httpLink – for getting graphQL results over a network using HTTP fetch (https://www.npmjs.com/package/apollo-link-http)
      apollo-link - network interface for Apollo client
      apollo-client
      inMemoryCache (https://www.npmjs.com/package/apollo-cache-inmemory) - cache implementation for Apollo Client 2.0


To connect Apollo Client to React, you will need to use the ApolloProvider component exported from react-apollo.

The ApolloProvider wraps your React app and places the client on the context, which allows you to access it from anywhere in your component tree.


For Each module – we have a queries folder – placed instead of it – (e.g dashboard)

the queries are written in .graphql files
and the interfaces are generated and placed inside the __generated__ folder
  The script command for generating the interfaces is: 
             
      npm apollo:codegen – you can find it in the main package.json file.

 The script command for generating the schema is: 
            
     npm apollo:schema – you can find it in the main package.json file. 



GraphQL Client IDE (chrome extension) enables you interact with any GraphQL server you are authorized to access from any platform you are on.

Much like Postman for GraphQL, you can easily test and optimize your GraphQL implementations.


## REDUX and REDUX SAGA

### Redux 

    In our application we are using Redux which is a state container for Javascript apps.

    The whole state of  our application is stored in an object tree inside a single store.

    The store configuration is placed in Store.ts file

    We also need a react-redux Provider for wrapping everything: (in App.tsx file)

  <Provider store={this.props.store}> ... </Provider>



### Redux Saga

redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache)

    easier to manage,
    more efficient to execute,
    simple to test,
    and better at handling failures.
    Map state received from reducer to props using MapStateToProps method.

The function MapDispatchToProps wraps all the action creators with the dispatch method and passes them to the component.

With connect we can connect our redux store to a component.


## UNIT TESTING

We are writing unit tests using JEST + Enzyme



1)For running all the tests from our application:

Npm run test
Command Line Interface
When you run npm test, Jest will launch in the watch mode. Every time you save a file, it will re-run the tests, just like npm start recompiles the code.

The watcher includes an interactive command-line interface with the ability to run all tests, or focus on a search pattern. It is designed this way so that you can keep it open and enjoy fast re-runs. You can learn the commands from the “Watch Usage” note that the watcher prints after every run.



By default, when you run npm test, Jest will only run the tests related to files changed since the last commit. This is an optimization designed to make your tests runs fast regardless of how many tests you have. However it assumes that you don’t often commit the code that doesn’t pass the tests.

Jest will always explicitly mention that it only ran tests related to the files changed since the last commit. You can also press a in the watch mode to force Jest to run all tests.



Each file should have a unit test file associated
All the snapshots tests are located for each folder under __snapshots__ folder
Each new snapshot is generated  and placed in the __snapshots__ folder when the associated  test is run


JEST

Jest acts as a test runner, assertion library, and mocking library – provides Snapshot testing also.


ENZYME

Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components’ output.


2) Unit tests coverage

The best percentage should be > 80% of unit tests coverage


