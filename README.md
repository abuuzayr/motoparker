<h1 align="center">
    <img alt="Motoparker" title="Motoparker" src="https://github.com/abuuzayr/motoparker/blob/master/src/assets/logo.png" width="140"> </br>
    <img src="https://github.com/abuuzayr/motoparker/blob/master/src/assets/sg.svg" alt="SG" width="30"> SG MotoParker
</h1>

<p align="center">
    <a href="https://app.netlify.com/sites/motoparker/deploys" rel="nofollow" class="rich-diff-level-one"><img src="https://api.netlify.com/api/v1/badges/b92f8145-72e2-449d-8dea-4d2bcb86b988/deploy-status" alt="Netlify Status" style="max-width:100%;"></a>
</p>

<p align="center">
Parking in Singapore can be expensive. But it can also be cheaper, or even free. And sometimes it can also be additionally expensive when you get a parking summons for illegal parking. As a motorcyclist myself, I don't always know which carparks can be parked at and sometimes there are locations where LTA or Traffic Police offers don't issue summons. 
</p>

This app serves to solve the following for my fellow motorcyclists:

- Locate the nearest parking location for motorcycles
- Filter parking locations based on parking charges
- Share parking locations with other motorcyclists
- Update parking locations when they no longer exist or 

Currently some information is shared via old forum posts or websites from several years ago. By creating a web app, I hope this information can be easily updated and therefore always relevant.

## FAQ

#### Why is this app restricted to Singapore?

Singapore is unique compared to other countries. In other countries, motorcycles which are parked outside of designated parking locations and are not obstructing anything or anyone can be summoned fines ranging from $25 to a few hundred dollars. Where there are designated parking locations, charges can range from $1.20 per day, $1.28 per entry or as high as $6 per entry (6 Battery Road). 

And sometimes, there are areas in Singapore that parking officers overlook and are lenient on unobstructive parking. These locations are not publicly known and are sometimes discovered accidentally. We seek to help more motorcyclists discover these hidden gems with Motor Parker.

Therefore while it _may_ be useful for other countries, it is most useful for Singapore.

#### Why can't we just use the current existing list of locations on other websites?

Personally, when I found myself in situations where I needed to find locations near me to park my motorcycle, going through a list was not a very smart, quick or accurate approach. Further, I found that these lists were not regularly updated and as a regular visitor it was hard for me to update any information if they were outdated. 

## Stack

### Frontend & hosting

:rocket: [Netlify](https://www.netlify.com/) for CI/CD, site previews and static site hosting

:v: [Vue](https://vuejs.org/) for front end magic

:vulcan_salute: [Vue CLI](https://cli.vuejs.org/) for project generation and development

:world_map: [Mapbox](https://www.mapbox.com/) for serving maps and map design

:cloud_with_lightning: [Cloudflare](https://www.cloudflare.com/) for DNS routing

### Backend functions

:zap: [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) for serverless API

:information_desk_person: [Azure App Service Authentication](https://docs.microsoft.com/en-us/azure/app-service/overview-authentication-authorization) for authentication and API protection

:man_cartwheeling: [NodeJS](https://nodejs.org/) for function runtime language

:left_right_arrow: [axios](https://github.com/axios/axios) for HTTP routing

:file_cabinet: [MongoDB](https://www.mongodb.com/) for NoSQL database storage

:file_folder: [Mongoose](https://mongoosejs.com/) for data modelling

## Contributing

This project was bootstrapped with [Vue Cli](https://github.com/vuejs/vue-cli). In the project directory, you can run:

### `yarn install`

Project setup

### `yarn serve`

Compiles and hot-reloads for development.<br>
Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
Compiles and minifies for production.

### `yarn lint`

Lints and fixes files

## Issues

If you find any issues with the app, please create an Issue in this repository and I will address it ASAP. 

## Contact

My name is Muhammad and you may contact me at abu.uzayr@builtforfifty.com

## Attributions

Scooter icon by <a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank">Freepik</a> via <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">Flaticon</a>
