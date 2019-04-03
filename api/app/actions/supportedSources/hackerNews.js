const { get } = require('axios');

module.exports = {
  name: 'Hacker News',
  working: true,
  imgName: 'hackerNews.png',
  getData: () =>
    get(
      'http://hn.algolia.com/api/v1/search?tags=front_page&numericFilters=created_at_i>86400',
    )
      .then(({ data }) => {
        let id = 0;

        return data.hits
          .reduce((acc, { title, url }) => {
            if (!url) {
              return acc;
            }

            // eslint-disable-next-line no-plusplus
            acc.push({ title, url, id: ++id });
            return acc;
          }, [])
          .slice(0, 10);
      })
      .catch(err => console.log(err)),
  // attributionLink: {
  //   text: 'Powered by News API',
  //   link: 'https://newsapi.org/',
  // },
};
