# [Afterimage](https://frozentear7.github.io/colorful-movies-frontend/)
Frontend: [![Build Status](https://travis-ci.com/FrozenTear7/colorful-movies-frontend.svg?branch=master)](https://travis-ci.com/FrozenTear7/colorful-movies-frontend) <br/>
Backend: [![Build Status](https://travis-ci.com/FrozenTear7/colorful-movies-backend.svg?branch=master)](https://travis-ci.com/FrozenTear7/colorful-movies-backend)

## Requirements
1) For running the app locally you need to install [Node.js](https://nodejs.org/en/download/) - version used for development of the app: v12.4.0.
Lower versions should work properly, but the app has not been tested for them.
2) For running the app with Docker you need to install [Docker](https://docs.docker.com/install/) for your OS.
Note that Linux, macOS and Windows vary in installation process.

## Run locally
1) Npm: to run the app locally use npm script start:
```
npm start
```
while in root directory of the app - same for both frontend and backend.

2) Docker: if you wish you can run the app from a docker container using docker-compose files located in the root
directory of the app - same for both frontend and backend.

## Frontend
Frontend has been deployed to Github Pages, after passing the tests Travis CI connected to the repository
automatically builds and deploys the app. Whether the app passes the tests and builds can be seen on top of the
README.

## Backend
Backend has been deployed to Heroku - after passing the build Travis CI connected to the repository, Heroku
automatically builds and deploys the server.
