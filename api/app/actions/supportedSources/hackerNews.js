const { get } = require('axios');

module.exports = {
  name: 'Hacker News',
  working: true,
  imgName: 'hackerNews.png',
  url: 'https://hn.algolia.com',
  priority: 100,
  getData: () =>
    get(
      'http://hn.algolia.com/api/v1/search?tags=front_page&numericFilters=created_at_i>86400',
    )
      .then(({ data: { hits } }) => {
        let id = 0;

        return hits
          .reduce((acc, { title, url }) => {
            if (!url) {
              return acc;
            }

            // eslint-disable-next-line no-plusplus
            acc.push({ id: id++, title, url });
            return acc;
          }, [])
          .slice(0, 10);
      })
      .catch(err => console.log(err)),
};
