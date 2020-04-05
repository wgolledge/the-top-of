const { get } = require('axios');

module.exports = {
  name: 'The Guardian',
  working: true,
  url: 'https://theguardian.com',
  priority: 20,
  banner: {
    text: 'The Guardian',
    byline: 'Powered by',
    color: '#0F3862',
  },
  getData: () =>
    get(
      `https://content.guardianapis.com/search?order-by=relevance&q=news&use-date=last-modified&lang=en&from-date=2019-04-04&page-size=50&show-fields=headline,thumbnail,lastModified,score&api-key=${
        process.env.API_KEY_GUARDIAN
      }`,
    )
      .then(({ data: { response: { results } } }) => {
        let id = 0;

        return results
          .sort(
            (a, b) =>
              new Date(b.fields.lastModified) - new Date(a.fields.lastModified),
          )
          .reduce((acc, { webTitle, webUrl, fields: { thumbnail } }) => {
            if (!webUrl) {
              return acc;
            }

            // eslint-disable-next-line no-plusplus
            acc.push({ id: id++, title: webTitle, url: webUrl, thumbnail });
            return acc;
          }, [])
          .slice(0, 10);
      })
      .catch(err => console.log(err)),
};
