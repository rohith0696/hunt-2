# hunt-2

## Links
- GitHub Repo : https://github.com/rohith0696/hunt-2
- Hosted App deployed on Heroku: https://hunt-2.herokuapp.com/

## Team
- Rohith Chittimalla
- Rajashekar Gande

## Stack
- Platform : Node(15.1.0),
- Web Framework : Express,
- View Engine : EJS,
- DB : NoSQL,
- ORD : Mongoose,
- Web App Host : Heroku,
- Data Host : Atlas,
- Coding Standards : ESlint.

## CI/CD
- Auto deploy is used from main repo.

## Instructions
* Steps for starting the cloned repository using the Powershell.
 * Open PS as admin using the Powershell in the-Hunt Folder.
 * Use "npm install" to install modules.
 * Use "npm run dev" to start a local version.
 * Open a browser to the URL provided in the powershell.
 
 ## Production Environment

1. Run MongoDB in the cloud - see <https://www.mongodb.com/cloud/atlas>

## Review Code Organization

- index.js - Starting point for the application. Defines the express server, requires routes and models. Loads everything and begins listening for events.
- controllers/ - logic for handling client requests
- data/ - seed data loaded each time the application starts
- models/ - schema descriptions for custom data types
- routes/ - route definitions for the API
- utils/ - utilities
- views/ - EJS - embedded JavaScript and HTML used to create dynamic pages

## References
- https://github.com/denisecase/node-express-mvc-ejs-start
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
- https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
- https://github.com/Krishna-Koyyalamudi/The-Hunt

## Deployment

- [App Hosting with Heroku](https://www.heroku.com/)

## Set up Heroku

1. Signup for Heroku account.
1. Install Heroku CLI.
1. Create a new app with a unique name (this will appear in your app URI).
1. Go to App / Settings / Config Vars and add an ATLAS_URI key with the value from your .env.
1. Go to App / Settings / Heroku Git URL and copy the URL to clipboard to paste in following command.
1. Create a git alias named heroku that points to this URL. Either use TortoiseGit / Settings / Remote to create heroku and set it to the URL - or open PowerShell as Admin in your root project folder and use just your Heroku app name in the command below:

```PowerShell
heroku login
heroku git:remote -a yourHerokuAppName
```

## Deploy with Heroku

After making changes, open PowerShell as Admin in your root project folder:

```PowerShell
heroku login
git push heroku master
```



