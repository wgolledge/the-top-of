Welcome! The Top Of is a news aggregator that lets you see the top (10) stories from your favourite sites without having to visit each one individually. No signups or logins, just trending content from the site(s) you choose. 🙂

The content is best viewed on a *mobile* device! Implemented as a PWA using service workers and Google workbox.

*Disclaimer*: By using this site you are in turn agreeing to be bound by each of the sources terms of service. The current list of sources is displayed on the homepage.

## Running locally

### Installing

To get the site running locally for development you'll need to create the `.env` files and run both the `api` and `web` apps.

*api*
```
cd api && npm i && npm run start:dev
```

*web*
```
cd web && npm i && npm start
```

### Running the tests

The React app tests are written with [jest](https://github.com/facebook/jest) and [react-testing-library](https://github.com/kentcdodds/react-testing-library), with a goal to test the end-user experience rather than the implementation details.

```
cd web && npm run test
```

## Contributing

Contributions & feedback are both more than welcome. 🙂
