const { get } = require('axios');

module.exports = {
  name: 'The Guardian',
  working: true,
  imgName: 'theGuardian.png',
  url: 'https://theguardian.com',
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
          .reduce((acc, { webTitle, webUrl }) => {
            if (!webUrl) {
              return acc;
            }

            // eslint-disable-next-line no-plusplus
            acc.push({ title: webTitle, url: webUrl, id: ++id });
            return acc;
          }, [])
          .slice(0, 10);
      })
      .catch(err => console.log(err)),
};
