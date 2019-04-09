const { get, post } = require('axios');
const queryString = require('query-string');

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: process.env.AUTHORIZATION_HEADER_REDDIT,
};

const data = queryString.stringify({
  grant_type: 'refresh_token',
  refresh_token: process.env.REDDIT_REFRESH_TOKEN,
});

module.exports = {
  name: 'The Top Of for Reddit',
  working: true,
  imgName: 'reddit.png',
  getData: () =>
    post('https://www.reddit.com/api/v1/access_token', data, {
      headers,
    })
      .then(({ data: { access_token: redditAccessToken } }) =>
        get('https://oauth.reddit.com/r/all/top?t=day&limit=10', {
          headers: { Authorization: `Bearer ${redditAccessToken}` },
        }),
      )
      .then(({ data: { data: { children } } }) => {
        let id = 0;

        return children.reduce((acc, { data: { title, url } }) => {
          if (!url) {
            return acc;
          }

          // eslint-disable-next-line no-plusplus
          acc.push({ title, url, id: ++id });
          return acc;
        }, []);
      })
      .catch(err => console.log(err)),
};