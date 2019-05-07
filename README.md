Welcome! The Top Of is a news aggregator that lets you see the top (10) stories from your favourite sites without having to visit each one individually. No signups or logins, just trending content from the site(s) you choose. 🙂

## Running locally

### Installing

To get the site running locally for development you'll need to create the `.env` files and run both the `api` and `web` apps.

*api*
```
cd api && npm run start:dev
```

*web*
```
cd web && npm start
```

By default the web app runs on port `3000` & api runs on port `8080` unless a port is specified in env vars.

### Running the tests

The React app tests are written with [jest](https://github.com/facebook/jest) and [react-testing-library](https://github.com/kentcdodds/react-testing-library), with a goal to test the end-user experience rather than the implementation details.

```
cd web && npm run test
```

## Contributing

Contributions & feedback are both more than welcome. 🙂
