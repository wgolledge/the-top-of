const { get } = require('axios');

module.exports = {
  name: 'Hacker News',
  working: true,
  getData: () =>
    get(
      'http://hn.algolia.com/api/v1/search?tags=front_page&numericFilters=created_at_i>86400',
    )
      .then(({ data }) =>
        data.hits
          .reduce((acc, { title, url }) => {
            if (!url) {
              return acc;
            }
            acc.push({ title, url });
            return acc;
          }, [])
          .slice(0, 10),
      )
      .catch(err => console.log(err)),
  // attributionLink: {
  //   text: 'Powered by News API',
  //   link: 'https://newsapi.org/',
  // },
};
