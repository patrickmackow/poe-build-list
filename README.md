# PoE Build List

PoE Build List is a React single page app that displays information scraped from the official Path of Exile forums.

A live version of the app can be found at [poebuildlist.com](https://poebuildlist.com)

## Usage

This app consists of an express backend that serves the api and a react app.

Copy the the .env.sample in the backend folder and rename it to .env filling it out with correct information.

For development a mongo installation is needed

```
cd backend/
npm run dev
```

docker-compose is used for hosting the app in production

```
docker-compose up
```

The react app must be served from the frontend/build folder using a static server

## Scripts

- generateTags.js - Scrape poedb.tw to generate a list of tags that will then be used when scraping the forum for builds
- scrapeUrls.js - Scrape the path of exile forums and store the information in a mongo db
- updateBuildTags.js - Regenerate tags for stored builds
